import {getRequest} from "./httpRequest.js";
import {POST_PAGES, CENTER} from "./config.js";
import {ContempMap} from "./ClassContempMap.js";
import {MAP_PAGES} from "./config.js";

export class IbnBattutaMap extends ContempMap {
    addMarkers() {
        var _thisRef = this;
        var allMarkers = {};
        if (this.clusters) this.contMap.removeLayer(this.clusters);
        this.clusters = L.markerClusterGroup({
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();
                return new L.DivIcon({
                    html: `<span>${childCount}</span>`,
                    className: 'marker-cluster', iconSize: new L.Point(30, 30)
                });
            },
            disableClusteringAtZoom: this.maxClusterLayer,
            maxZoom: this.maxClusterLayer,
        });
        this.pathCoords = [];
        this.placeNames = [];

        for (let i = 0; i < this.results.length; i++) {
            let result = this.results[i];
            let placeName = result[this.cont_place_name_field],
                lat = result[this.cont_lat_field],
                lng = result[this.cont_lng_field];
            if (!lat || !lng) continue;

            this.pathCoords.push([parseFloat(lat), parseFloat(lng)]);
            this.placeNames.push(placeName);

            if (!placeName) continue;

            // let placeName = result[this.cont_place_name_field] ? result[this.cont_place_name_field] : 'Unknown';
            let contId = result[this.cont_id_field];
            if (contId in allMarkers) {
                allMarkers[contId].markerResults.push(result);
            } else {
                var marker = POST_PAGES.includes(this.mapType) ? L.marker([lat, lng]).bindPopup(placeName, {autoClose: false})
                    : L.marker([lat, lng]).bindPopup(placeName);
                marker.markerResults = [result];
                allMarkers[contId] = marker;

                marker.on('click', function () {
                    _thisRef.contMap.setView(this.getLatLng(), _thisRef.contMap.getZoom(), {
                        animate: true,
                        duration: 0.5
                    });
                    let results = this.markerResults;
                    _thisRef.currentResults = results;
                    _thisRef.clickAction(results);
                    _thisRef.closeNotAvail();
                });
            }
            this.clusters.addLayer(marker);
        }
        this.contMap.addLayer(this.clusters);
        this.contMarkers = allMarkers;
        this.drawLine();
    }

    drawLine() {
        if (this.lines) this.contMap.removeLayer(this.lines);
        if (this.arrows) this.contMap.removeLayer(this.arrows);
        this.lines = L.polyline(this.pathCoords).addTo(this.contMap);
        this.arrows = L.polylineDecorator(this.pathCoords, {
            patterns: [
                {
                    offset: 25,
                    repeat: 200,
                    symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {fillOpacity: 1, weight: 0}})
                }
            ]
        }).addTo(this.contMap);
    }

    createAnimation() {
        var _thisRef = this;
        var duration = this.pathCoords.map(function (coord, index, pathCoords) {
            if (index < pathCoords.length - 1) {
                let nextCoord = pathCoords[index + 1];
                return 100 * Math.sqrt((nextCoord[0] - coord[0]) ** 2 + (nextCoord[1] - coord[1]) ** 2);
            } else return null;
        });
        this.movingMarker = L.Marker.movingMarker(this.pathCoords, this.placeNames, duration, {
            atStationAction: function (placeName) {
                _thisRef.movingMarker.bindPopup(placeName).openPopup();
            }
        }).bindPopup(this.placeNames[0]).addTo(this.contMap);

        this.movingMarker.openPopup();
        setTimeout(function () {
            _thisRef.movingMarker.start();
        }, 1000);

        for (let i = 1; i < this.results.length; i++) {
            if (this.results[i][this.cont_place_name_field]) this.movingMarker.addStation(i, 1000);
        }

        this.movingMarker.on('end', function () {
            this.bindPopup(_thisRef.placeNames.slice(-1)[0]).openPopup();
        })
    }


    createVisualizationButton() {
        var _thisRef = this;
        var option1 = document.createElement('option');
        option1.value = '1325–1332';
        option1.innerText = 'Itinerary 1325–1332';

        var option2 = document.createElement('option');
        option2.value = '1332–1347';
        option2.innerText = 'Itinerary 1332–1347';

        var option3 = document.createElement('option');
        option3.value = '1349–1354';
        option3.innerText = 'Itinerary 1349–1354';

        var selectDom = document.createElement('select');
        selectDom.className = 'vis-select';
        selectDom.append(option1, option2, option3);

        this.animationIcon = document.createElement('img');
        this.animationIcon.src = "Images/play-icon.png";

        var animationBtn = document.createElement('button');
        animationBtn.className = 'ani-play';
        animationBtn.appendChild(this.animationIcon);

        var container = document.createElement('div');
        container.className = 'vis-container';
        container.append(selectDom, animationBtn);

        selectDom.onchange = function () {
            let itinerary = selectDom.value;
            _thisRef.changeToVisual(null, itinerary);
        };

        this.animationMode = 0;
        animationBtn.onclick = function () {
            _thisRef.animationMode = 1 - _thisRef.animationMode;
            if (_thisRef.animationMode) {
                _thisRef.animationIcon.src = "Images/stop-icon.png";
                _thisRef.contMap.removeLayer(_thisRef.clusters);
                _thisRef.createAnimation();
            } else {
                _thisRef.animationIcon.src = "Images/play-icon.png";
                _thisRef.contMap.removeLayer(_thisRef.movingMarker);
                _thisRef.contMap.addLayer(_thisRef.clusters);
            }
        };
        document.getElementById(this.container).parentElement.appendChild(container);
    }

    changeToVisual(visual, itinerary) {
        if (visual == 'osm') {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: '',
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1Ijoia2hvaXZuIiwiYSI6ImNqdGloOHl4YzE0M3c0YmxoNDhyM29pZnoifQ.iRgQ4SBXHIhaIvbJ9pcV3w'
            }).addTo(this.contMap);
            if (MAP_PAGES.includes(this.mapType)) this.changeVisToContMap();
        } else if (visual == 'sat') {
            L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(this.contMap);
            if (MAP_PAGES.includes(this.mapType)) this.changeVisToContMap();
        } else if(itinerary){
            getRequest('controller/searchMap.php', {map: 'ibnt', itinerary: itinerary}, response => {
                if (this.movingMarker) this.contMap.removeLayer(this.movingMarker);
                this.animationIcon.src = 'Images/play-icon.png';
                this.animationMode = 0;
                this.reload(JSON.parse(response).results, null, null, itinerary);
            });
        }
    }

    changeVisToContMap(){

    }

    reload(results, cid, clicked, itinerary = '1325–1332') {
        this.results = results;
        this.addMarkers();
        if (cid) this.markerClick(cid, clicked);
        else this.contMap.setView(CENTER[this.mapType].initialCenter[itinerary], CENTER[this.mapType].initialLayer[itinerary]);
    }
}

