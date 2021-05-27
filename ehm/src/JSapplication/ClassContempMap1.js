import {FIELDS, POST_PAGES, MAP_PAGES} from "./config.js";
import {GlobeMap} from "./ClassGlobeMap1.js";
import {setParams} from "./httpRequest.js";
import {openTab} from "./openTab.js";
import {Popup} from "./ClassPopup.js";
import {createBtnWithTooltip, CLOSE_ICON} from "./createBtn.js";
import {Visualization} from "./ClassVisualization1.js";

export class ContempMap {
    constructor(contContainer, mapType, totalResults = [], clickAction,
                searchAction, maxClusterLayer, initialLayer, initialCenter, currentVis,
                globeContainer, visContainer, fullMap = true, visClickAction, visResetAction) {
        const map_fields = FIELDS.osm;
        this.cont_id_field = map_fields.cont_id;
        this.cont_place_name_field = map_fields.cont_place_name;
        this.cont_lat_field = map_fields.cont_lat;
        this.cont_lng_field = map_fields.cont_lng;
        this.cont_country_field = map_fields.cont_country;

        this.mapContainer = contContainer;
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
        this.currentVis = currentVis ? currentVis : 'sat';

        this.globeContainer = globeContainer;
        this.visContainer = visContainer;
        this.visClickAction = visClickAction;
        this.visResetAction = visResetAction;
        this.fullMap = fullMap;

        this.contMarkers = {};
        this.contMap = this.searchBox = this.notAvailBtn = undefined;
        this.initMap();
    }

    initMap() {
        this.contMap = L.map(this.mapContainer.id, {preferCanvas: true}).setView(this.initialCenter, this.initialLayer);
        this.changeToVisual('sat');
        this.createSearchBar();
        this.createVisualizationButton();
        this.createNotAvail();
        // this.createShipTurnaround();
        this.createFullScreenBtn();
        this.contMap.zoomControl.setPosition('bottomright');
    }

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
            disableClusteringAtZoom: this.maxClusterLayer
        });

        for (let i = 0; i < this.results.length; i++) {
            let result = this.results[i];
            if (!(result[this.cont_lat_field] && result[this.cont_lng_field])) continue;
            let placeName = result[this.cont_place_name_field] ? result[this.cont_place_name_field] : 'Unknown';
            let contId = result[this.cont_id_field];
            if (contId in allMarkers) {
                allMarkers[contId].markerResults.push(result);
            } else {
                var marker = L.marker([result[this.cont_lat_field], result[this.cont_lng_field]]);
                // var customMarker = `<div class="cont-popup-title">${placeName}</div><div class="cont-popup-img"></div>`
                // var popup = this.createPopup(placeName);
                var popup = new ContPopup(this.mapType, this.contMap);
                popup.setTitle(placeName);

                if (POST_PAGES.includes(this.mapType)) marker.bindPopup(popup.container, {
                    autoClose: false,
                    closeButton: false
                });
                else marker.bindPopup(popup.container, {closeButton: false});
                // var marker = POST_PAGES.includes(this.mapType) ? L.marker([result[this.cont_lat_field], result[this.cont_lng_field]]).bindPopup(placeName, {autoClose: false})
                //     : L.marker([result[this.cont_lat_field], result[this.cont_lng_field]]).bindPopup(placeName);
                marker.on('click', function () {
                    _thisRef.contMap.setView(this.getLatLng(), _thisRef.contMap.getZoom(), {
                        animate: true,
                        duration: 0.5
                    });
                    let results = this.markerResults;
                    _thisRef.currentResults = results;
                    if (_thisRef.clickAction) _thisRef.clickAction(results);
                    _thisRef.closeNotAvail();
                });
                marker.markerResults = [result];
                allMarkers[contId] = marker;
            }
            this.clusters.addLayer(marker);
        }
        this.contMap.addLayer(this.clusters);
        this.contMarkers = allMarkers;
    }

    createSearchBar() {
        var _thisRef = this;
        var resultNumber = 8;
        var focusing = -1;
        var searchBarControl = L.Control.extend({
            options: {
                position: 'topleft'
            },
            onAdd: function (map) {
                var searchBox = document.createElement('input');
                _thisRef.searchBox = searchBox;
                searchBox.className = 'search-box';
                searchBox.setAttribute("type", "text");
                searchBox.setAttribute("placeholder", "Search..");

                var searchIcon = document.createElement("i");
                searchIcon.className = "fa fa-search";

                var searchButton = document.createElement('button');
                searchButton.setAttribute('type', 'submit');
                searchButton.className = "search-button";
                searchButton.appendChild(searchIcon);
                _thisRef.searchBtn = searchButton;


                var searchDiv = document.createElement('div');
                searchDiv.append(searchBox, searchButton);
                searchDiv.style.height = '28px';

                var searchBar = document.createElement('div');
                searchBar.className = 'cont-search-bar';
                searchBar.appendChild(searchDiv);

                searchButton.onclick = function searchContMap() {
                    var keyword = searchBox.value;
                    var searchResults = findResults(keyword);
                    searchResults = searchResults.map(r => r.result);
                    _thisRef.searchResults = searchResults;
                    _thisRef.currentResults = [];
                    let firstResult = searchResults[0];
                    _thisRef.reload(_thisRef.totalResults);
                    if (firstResult) _thisRef.markerClick(firstResult[_thisRef.cont_id_field], true);
                };

                searchBox.addEventListener('input', function () {
                    focusing = -1;
                    removeAllSuggestions();
                    var keyword = this.value;
                    var matchingResults = findResults(keyword);
                    matchingResults.slice(0, resultNumber).map(function (matching) {
                        var keywordStart = matching.start;
                        var keywordStop = keywordStart + keyword.length;
                        var result = matching.result;
                        var country = result[_thisRef.cont_country_field];
                        var placeNamePlain = result[_thisRef.cont_place_name_field];
                        var placeName = placeNamePlain.slice(0, keywordStart) + '<strong>' + placeNamePlain.slice(keywordStart, keywordStop) + '</strong>' + placeNamePlain.slice(keywordStop);

                        var suggestion = createSuggestionHtml(placeName, country);
                        searchBar.appendChild(suggestion);

                        suggestion.onclick = function () {
                            searchBox.value = placeNamePlain;
                            searchButton.click();
                        }
                    });
                });

                searchBox.addEventListener("keydown", function (e) {
                    if (e.keyCode == 40) {
                        e.preventDefault();
                        if (focusing === resultNumber - 1) return;
                        focusing++;
                        suggestionFocus(focusing);
                    } else if (e.keyCode == 38) {
                        e.preventDefault();
                        if (focusing === -1) return;
                        focusing--;
                        suggestionFocus(focusing);
                    } else if (e.keyCode == 13) {
                        e.preventDefault();
                        if (focusing > -1) searchBar.getElementsByClassName("cont-suggest")[focusing].click();
                        else searchButton.click();
                    }
                });
                document.addEventListener("click", function (e) {
                    if (e.target === searchBox) return;
                    removeAllSuggestions();
                });

                function createSuggestionHtml(placeName, country) {
                    var suggestion = document.createElement('div');
                    suggestion.className = 'cont-suggest';

                    var placeNameHtml = document.createElement('span');
                    placeNameHtml.innerHTML = placeName;
                    placeNameHtml.className = 'cont-search-place-name';
                    var countryHtml = document.createElement('span');
                    countryHtml.innerHTML = country;
                    countryHtml.className = 'cont-search-country';

                    suggestion.append(placeNameHtml, countryHtml);
                    return suggestion;
                }

                function findResults(keyword) {
                    if (!keyword) return;
                    keyword = keyword.toLowerCase();
                    var matchingResults = {};
                    for (let i = 0; i < _thisRef.totalResults.length; i++) {
                        let check = false;
                        let result = _thisRef.totalResults[i];
                        let placeName = result[_thisRef.cont_place_name_field] || "";
                        let placeNameLower = placeName.toLowerCase();
                        let country = result[_thisRef.cont_country_field] || "";
                        let countryLower = country.toLowerCase();

                        if (placeNameLower.includes(keyword)) check = true;
                        else if (countryLower.includes(keyword)) check = true;

                        if (matchingResults.hasOwnProperty(placeNameLower)) continue;
                        if (check) matchingResults[placeNameLower] = {
                            placeNameLower: placeNameLower,
                            start: placeNameLower.indexOf(keyword),
                            result: result,
                        };
                    }
                    matchingResults = Object.values(matchingResults);
                    matchingResults.sort((a, b) => a.start > b.start ? 1 : (a.start === b.start) ? (a.placeNameLower > b.placeNameLower) ? 1 : -1 : -1);
                    return matchingResults;
                }

                function suggestionFocus(focusing) {
                    var suggestions = searchBar.getElementsByClassName("cont-suggest");
                    for (let i = 0; i < suggestions.length; i++) suggestions[i].classList.remove('cont-suggest-active');
                    if (focusing > -1) suggestions[focusing].classList.add('cont-suggest-active');
                }

                function removeAllSuggestions() {
                    var suggestions = searchBar.getElementsByClassName("cont-suggest");
                    while (suggestions[0]) searchBar.removeChild(suggestions[0]);
                }

                return searchBar;
            }
        });
        this.contMap.addControl(new searchBarControl());
    }

    createVisualizationButton() {
        var _thisRef = this;

        var selectDom = this.visSelect = document.createElement('select');
        // selectDom.id = 'visualizationSelect';
        selectDom.className = 'vis-select';

        if (this.mapType === 'collab') {
            let option1 = document.createElement('option');
            option1.value = 'osm';
            option1.innerText = 'OpenStreetMap';
            selectDom.append(option1);
        } else {
            let option1 = document.createElement('option');
            option1.value = 'sat';
            option1.innerText = 'Satellite View';
            let option2 = document.createElement('option');
            option2.value = 'osm';
            option2.innerText = 'OpenStreetMap';
            let option3 = document.createElement('option');
            option3.value = 'glo-sat';
            option3.innerText = 'WebGL Satellite View';
            let option4 = document.createElement('option');
            option4.value = 'glo-osm';
            option4.innerText = 'WebGL Street View';
            selectDom.append(option1, option2, option3, option4);
        }

        if (MAP_PAGES.includes(this.mapType) && this.fullMap) {
            let option1 = document.createElement('option');
            option1.value = 'rad';
            option1.innerText = 'Radial tree';
            let option2 = document.createElement('option');
            option2.value = 'tmp';
            option2.innerText = 'Treemapping';
            let option3 = document.createElement('option');
            option3.value = 'fdg';
            option3.innerText = 'Force-Directed Graph';
            selectDom.append(option1, option2, option3);
        }

        var container = document.createElement('div');
        container.className = 'vis-container';
        container.appendChild(selectDom);
        this.visSelectBtn = container;

        selectDom.addEventListener('change', function () {
            let vis = selectDom.value;
            _thisRef.changeToVisual(vis);
            // setParams({vis: vis, cid: '', hid: '', coun_id: ''});
            setParams({vis: vis});
        });
        this.mapContainer.parentElement.appendChild(container);
    }

    changeToVisual(vis) {
        if (vis == 'sat' && this.mapType !== 'collab') {
            L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(this.contMap);
            this.changeMapToCont();
        } else if (vis == 'osm' || this.mapType === 'collab') {
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.contMap);
            // L.tileLayer('https://api.tiles.d.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            //     attribution: '',
            //     id: 'mapbox.streets',
            //     accessToken: 'pk.eyJ1Ijoia2hvaXZuIiwiYSI6ImNqdGloOHl4YzE0M3c0YmxoNDhyM29pZnoifQ.iRgQ4SBXHIhaIvbJ9pcV3w'
            // }).addTo(this.contMap);
            this.changeMapToCont();
        } else if (vis == 'glo-sat' || vis == 'glo-osm') this.changeMapToGlobe(vis);
        else this.changeMapToVis();
    }

    changeMapToVis() {
        this.mapContainer.style.display = 'none';
        if (this.globeContainer) this.globeContainer.style.display = 'none';
        if (this.visContainer) this.visContainer.style.display = 'block';

        if (!this.visualization) this.visualization = new Visualization(this.visContainer, this.mapType,
            this.totalResults, this.visClickAction, this.visResetAction, null, this.visSelect);
    }

    changeMapToGlobe(vis) {
        this.mapContainer.style.display = 'none';
        if (this.globeContainer) this.globeContainer.style.display = 'block';
        if (this.visContainer) this.visContainer.style.display = 'none';
        if (!this.globeMap) this.globeMap = new GlobeMap(this.globeContainer.id,
            this.mapType, [], this.clickAction, null, null, null, null,
            this.initialLayer, this.initialCenter, vis, this.visSelect);
        this.globeMap.reload(this.results);
    }

    changeMapToCont() {
        this.mapContainer.style.display = 'block';
        if (this.globeContainer) this.globeContainer.style.display = 'none';
        if (this.visContainer) this.visContainer.style.display = 'none';
    }

    createNotAvail() {
        var _thisRef = this;
        var suggestBarControl = L.Control.extend({
            options: {
                position: 'bottomleft'
            },

            onAdd: function (map) {
                var notAvailBtn = document.createElement('button');
                _thisRef.notAvailBtn = notAvailBtn;
                notAvailBtn.id = "suggestBtn";
                notAvailBtn.innerText = "Not linked to a geographical item";
                notAvailBtn.style.display = "none";
                notAvailBtn.onclick = () => document.getElementById("suggestModal").style.display = "block";

                var notAvailDiv = document.createElement('div');
                notAvailDiv.className = "suggest-div";
                notAvailDiv.appendChild(notAvailBtn);

                return notAvailDiv;
            }
        });

        this.contMap.addControl(new suggestBarControl());
    }

    openNotAvail() {
        this.notAvailBtn.style.display = "block";
    }

    closeNotAvail() {
        this.notAvailBtn.style.display = "none";
    }

    setSearchBox(value) {
        this.searchBox.value = value ? value : '';
    }

    createFullScreenBtn() {
        var _thisRef = this;
        var control = L.Control.extend({
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
                    else openFullscreen(_thisRef.mapContainer);
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
                _thisRef.fullscreenBtn = element;

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

    async centerMapOnMarker(marker, popup = false) {
        var _thisRef = this;
        if (marker) {
            this.closeNotAvail();
            var center = marker.getLatLng(),
                zoom = this.maxClusterLayer;
        } else {
            _thisRef.openNotAvail();
            for (var contId in this.contMarkers) this.contMarkers[contId].closePopup();
            center = this.initialCenter;
            zoom = this.initialLayer;
        }
        this.contMap.flyTo(center, zoom, {
            animate: true,
            duration: 1,
        });
        if (popup) {
            await this.delay(1200);
            if (marker) marker.openPopup();
        }
    }

    async centerMapOnResults(results, popup = true) {
        var popupMarker, popupResult;
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (!this.contMarkers.hasOwnProperty(result[this.cont_id_field])) continue;
            let marker = this.contMarkers[result[this.cont_id_field]];
            let latlng = marker.getLatLng();
            if (latlng) {
                popupMarker = marker;
                popupResult = result
            } else marker.openPopup();
        }
        await this.centerMapOnMarker(popupMarker, popup);
        return popupResult;
    }

    initialLoad(results, mode, clicked) {
        this.currentResults = results;
        if (mode == 1 && this.currentResults.length) this.reload(this.currentResults, this.currentResults[0][this.cont_id_field], clicked);
        else if (this.currentResults.length) this.reload(this.totalResults, this.currentResults[0][this.cont_id_field], clicked);
        else this.reload(this.totalResults, null, clicked);

        if (this.visSelect) {
            this.visSelect.value = this.currentVis;
            this.visSelect.dispatchEvent(new Event('change'));
        }
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    async markerClick(cid, clicked) {
        this.centerMapOnMarker(this.contMarkers[cid], !clicked);
        if (clicked) {
            await this.delay(1200);
            this.contMarkers[cid].fire('click');
        }
    }

    reload(results, cid, clicked) {
        this.results = results;
        this.addMarkers();
        if (cid) this.markerClick(cid, clicked);
        else this.contMap.setView(this.initialCenter, this.initialLayer);
    }
}


export class ContPopup extends Popup {
    constructor(map_type, contMap) {
        super();
        this.map_type = map_type;
        this.contMap = contMap;
        this.init();
        this.closeBtn.onclick = () => {
            this.contMap.closePopup()
        }
    }
}