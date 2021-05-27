import {FIELDS, POST_PAGES} from "./config.js";
import {ContPopup} from "./ClassContempMap.js";
import {postRequestForm} from "./httpRequest.js";

export class GlobeMap {
    constructor(container, mapType, totalResults, clickAction, searchAction, changeModeAction, currentMode,
                maxClusterLayer, initialLayer, initialCenter, currentVis, visSelect) {
        const map_fields = FIELDS.osm;
        this.cont_id_field = map_fields.cont_id;
        this.cont_place_name_field = map_fields.cont_place_name;
        this.cont_lat_field = map_fields.cont_lat;
        this.cont_lng_field = map_fields.cont_lng;
        this.container = container;
        this.mapType = mapType;
        this.clickAction = clickAction;
        this.searchAction = searchAction;
        this.results = [];
        this.searchResults = totalResults;
        this.totalResults = totalResults;
        this.currentResults = [];
        this.maxClusterLayer = maxClusterLayer ? maxClusterLayer : 8;
        this.initialLayer = initialLayer ? initialLayer : 3;
        this.initialCenter = initialCenter ? initialCenter : [32.527922, 54.577028];
        this.currentVis = currentVis;
        this.contMarkers = {};
        this.contMap = this.searchBox = this.notAvailBtn = undefined;
        this.visSelect = visSelect;
        this.initMap();
    }

    initMap() {
        this.contMap = new WE.map(this.container);
        this.visSelect.addEventListener('change', () => {
            this.changeToVis(this.visSelect.value)
        });
        this.changeToVis(this.currentVis);
        this.contMap.setView(this.initialCenter, this.initialLayer);
        this.addMarkers();
    }

    changeToVis(vis) {
        if (vis == 'glo-sat') {
            WE.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(this.contMap);
        } else if (vis == 'glo-osm') {
            WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.contMap);
        }
    }

    addMarkers() {
        var allMarkers = this.contMarkers = {};
        var results = this.totalResults.length ? this.totalResults : this.results;
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (!(result[this.cont_lat_field] && result[this.cont_lng_field])) continue;
            let placeName = result[this.cont_place_name_field] ? result[this.cont_place_name_field] : 'Unknown';
            let contId = result[this.cont_id_field];
            if (contId in allMarkers) allMarkers[contId].markerResults.push(result);
            else {
                let coords = [result[this.cont_lat_field], result[this.cont_lng_field]];
                let marker = WE.marker(coords, 'Images/icons/marker.png', 13, 21).addTo(this.contMap);


                marker.bindPopup(`<div>
                    <div class="popup-nav">
                    <span class="tooltip">
                    <button id="globe-close-${contId}"><i class="fa fa-close" aria-hidden="true"></i></button>
                    <span id="globe-close-tooltip-${contId}" class="tooltiptext tooltip-right tooltip-bottom">Close</span>
                    </span>
                    <span class="tooltip">
                    <button id="globe-cite-${contId}"><i class="fa fa-quote-right" aria-hidden="true"></i></button>
                    <span id="globe-cite-tooltip-${contId}" class="tooltiptext tooltip-right tooltip-bottom">Cite this item</span>
                    </span>
                    <span class="tooltip">
                    <button id="globe-save-${contId}"><i class="fa fa-book" aria-hidden="true"></i></button>
                    <span id="globe-save-tooltip-${contId}" class="tooltiptext tooltip-right tooltip-bottom">Save to Notebook</span>
                    </span>
                    </div>
                    <div class="popup-content"><div class="popup-title">${placeName}</div>
                    <div></div><div class="popup-trove">
                    <table style="width: 100%;">
                    <tr style="cursor: pointer;"><th colspan="3" class="popup-trove-resources">Open EHM Search</th></tr>
                    <tr><td class="popup-trove-resources"><div class="click-popup-pub"></div>publications</td>
                    <td class="popup-trove-resources"><div class="click-popup-image"></div>images</td>
                    <td class="popup-trove-resources"><div class="click-popup-video"></div>videos</td></tr></table></div></div></div>`, 160, false);

                document.getElementById(`globe-close-${contId}`).onclick = () => marker.closePopup();
                document.getElementById(`globe-save-${contId}`).onclick = () => {
                    const currentUrl = window.location.pathname.split("/").pop() + window.location.search;
                    postRequestForm("controller/saveSearch.php", {}, {
                        title: placeName,
                        url: currentUrl,
                        map: this.mapType
                    }, response => {
                        let tooltip = document.getElementById(`globe-save-tooltip-${contId}`);
                        tooltip.innerText = response;
                        setTimeout(() => {
                            tooltip.innerText = 'Save to Notebook'
                        }, 3000);
                    })
                }
                document.getElementById(`globe-cite-${contId}`).onclick = () => {
                    var temp = document.createElement('input');
                    var body = document.getElementsByTagName('body')[0];
                    var tooltip = document.getElementById(`globe-cite-tooltip-${contId}`);
                    body.append(temp);
                    temp.type = 'text';
                    temp.value = document.getElementById('citeTextapa').innerText;
                    temp.select();
                    document.execCommand("copy");
                    body.removeChild(temp);

                    tooltip.innerText = 'Copied';
                    setTimeout(() => {
                        tooltip.innerText = 'Cite this item'
                    }, 3000);
                }


                marker.on('click', () => {
                    this.contMap.panTo(coords, {duration: 1});
                    let results = allMarkers[contId].markerResults;
                    this.currentResults = results;
                    if(this.clickAction) this.clickAction(results);
                    this.closeAllPopups(marker);
                });
                marker.markerResults = [result];
                allMarkers[contId] = marker;
            }
        }
    }


    reload(results, cid, clicked) {
        this.results = results;
        this.addMarkers();
        this.contMap.setView(this.initialCenter, this.initialLayer);
    }

    createFullScreenBtn() {
        var _thisRef = this;
        var control = WE.Control.extend({
            options: {
                position: 'bottomright'
            },

            onAdd: function (map) {
                var fullScreenIcon = document.createElement('img');
                fullScreenIcon.src = "Images/fullscreenblack.png";

                var fullscreenBtn = document.createElement('a');
                fullscreenBtn.appendChild(fullScreenIcon);

                fullscreenBtn.onclick = function () {
                    if (document.fullscreenElement) closeFullscreen();
                    else openFullscreen(document.getElementById(_thisRef.container));
                };

                document.addEventListener("fullscreenchange", function (event) {
                    if (document.fullscreenElement) {
                        fullScreenIcon.src = "Images/collapseblack.png";
                        elementTooltip.innerText = 'Exit full screen';
                    } else {
                        fullScreenIcon.src = "Images/fullscreenblack.png";
                        elementTooltip.innerText = 'Full screen';
                    }
                });

                var elementTooltip = document.createElement('span');
                elementTooltip.className = 'tooltiptext tooltip-right tooltip-bottom';
                elementTooltip.innerText = 'Full screen';

                var element = document.createElement('div');
                element.className = 'tooltip leaflet-bar leaflet-control leaflet-control-zoom fullscreen-cont';
                element.append(fullscreenBtn, elementTooltip);

                function openFullscreen(elem) {
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.mozRequestFullScreen) { /* Firefox */
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                        elem.webkitRequestFullscreen();
                    } else if (elem.msRequestFullscreen) { /* IE/Edge */
                        elem.msRequestFullscreen();
                    }
                }

                function closeFullscreen() {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) { /* Firefox */
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) { /* IE/Edge */
                        document.msExitFullscreen();
                    }
                }

                return element;
            }
        });
        this.contMap.addControl(new control());
    }

    async centerMapOnResults(results) {
        var popupResult, popupMarker;
        var popupLatlng;
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (!this.contMarkers.hasOwnProperty(result[this.cont_id_field])) continue;
            let marker = this.contMarkers[result[this.cont_id_field]];
            let latlng = [result[this.cont_lat_field], result[this.cont_lng_field]];
            if (latlng) {
                popupLatlng = latlng;
                popupMarker = marker;
                popupResult = result;
            } else marker.openPopup();
        }
        await this.centerMapOnCoor(popupMarker, popupLatlng, true);
        return popupResult;
    }

    async centerMapOnCoor(marker, coor, popup = false) {
        if (coor) {
            this.closeNotAvail();
            var zoom = this.maxClusterLayer;
        } else {
            this.openNotAvail();
            for (var contId in this.contMarkers) this.contMarkers[contId].closePopup();
            coor = this.initialCenter;
            zoom = this.initialLayer;
        }
        this.contMap.panTo(coor, {duration: 1});
        this.closeAllPopups(marker);
        if (popup) {
            setTimeout(function () {
                if (marker) marker.openPopup();
            }, 1200);
        }
    }

    closeAllPopups(markerExcept) {
        Object.values(this.contMarkers).forEach(m => {
            if (m !== markerExcept) m.closePopup()
        });
    }

    openNotAvail() {

    }

    closeNotAvail() {

    }

}