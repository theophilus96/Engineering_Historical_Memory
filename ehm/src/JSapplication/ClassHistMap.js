import {FIELDS} from "./config.js";
// import {openTab} from "./openTab.js";
import {Popup} from "./ClassPopup.js";
import {createBtnWithTooltip, CLOSE_ICON} from "./createBtn.js";

const TWO_DISPLAY_MAPS = ['fgm', 'imola', 'cadastral', 'sinai'];
const FILTER_BY_NAME_MAPS = ['imola', 'cadastral', 'sinai', 'bosch', 'maokun'];
const MAX_LAYERS = {
    gm: 4,
    sinai: 3,
    bosch: 1,
}

const INITIAL_CENTERS = {
    sinai: [0.5, 0],
    maokun: [1, 0],
    default: [0.5, -0.5]
}

export class HistMap {
    constructor(container, zoomifyUrl, totalResults, clickAction, searchAction, filterAction, changeDisplayAction,
                imgDim, fieldType, currentDisplay) {
        const map_fields = this.map_fields = FIELDS[fieldType];
        this.hist_id_field = map_fields.hist_id;
        this.hist_place_name_field = map_fields.hist_place_name;
        this.hist_coords_field = map_fields.hist_coords;
        this.hist_xzoom_field = map_fields.hist_xzoom;
        this.hist_yzoom_field = map_fields.hist_yzoom;
        this.hist_categories_field = map_fields.hist_categories;
        this.hist_cartouche_title_field = map_fields.hist_cartouche_title;

        this.container = container;
        this.clickAction = clickAction;
        this.searchAction = searchAction;
        this.filterAction = filterAction;
        this.changeDisplayAction = changeDisplayAction;
        this.searchBox = this.filterBox = this.histMarkers = this.notAvailBtn = undefined;
        this.results = [];
        this.currentResults = [];
        this.searchResults = totalResults;
        this.totalResults = totalResults;
        this.currentDisplay = currentDisplay || 0;
        this.clickPopupNumber = 1;
        this.maxLayer = MAX_LAYERS[fieldType] || 4;
        this.minLayer = 1;
        [this.imgWidth, this.imgHeight] = imgDim;
        this.fieldType = fieldType;
        this.zoomifyUrl = zoomifyUrl;
        this.distance = 100;

        const initialCenters = INITIAL_CENTERS.hasOwnProperty(fieldType) ? INITIAL_CENTERS[fieldType] : INITIAL_CENTERS.default;
        this.initialCenter = [initialCenters[0] * this.imgWidth, initialCenters[1] * this.imgHeight];
        this.noDisplayModes = 3;

        this.histMap = this.initMap();
        this.createChangeDisplayButton();
        this.createSearchBar();
        this.createCategoryFilter();
        this.createFullScreenBtn();
        this.createSuggestBar();
        this.clickPopups = this.createClickPopups();
        this.movePopup = this.createMovePopup();
    }

    getFeatureFromPixel(evt) {
        return this.histMap.forEachFeatureAtPixel(evt.pixel, ft => ft);
    }

    initMap() {
        var _thisRef = this;
        var layer = new ol.layer.Tile({
            source: new ol.source.Zoomify({
                url: this.zoomifyUrl,
                size: [this.imgWidth, this.imgHeight],
            })
        });

        var histMap = new ol.Map({
            layers: [layer],
            target: this.container,

            view: new ol.View({
                projection: new ol.proj.Projection({
                    code: 'ZOOMIFY',
                    units: 'pixels',
                    extent: [0, -this.imgHeight, this.imgWidth, 0]
                }),
                center: this.initialCenter,
                zoom: this.minLayer,
                extent: [0, -this.imgHeight, this.imgWidth, 0]
            })
        });

        histMap.on('click', function (evt) {
            _thisRef.clickHandle(evt);
        });

        histMap.on('pointermove', function (evt) {
            _thisRef.moveHandle(evt);
        });

        histMap.on('moveend', (function () {
            if (!_thisRef.clusters) return;
            var distance = _thisRef.clusters.getSource().getDistance();
            if (histMap.getView().getZoom() >= _thisRef.maxLayer && distance > 0) _thisRef.clusters.getSource().setDistance(0);
            else if (histMap.getView().getZoom() < _thisRef.maxLayer && distance === 0) _thisRef.clusters.getSource().setDistance(_thisRef.distance);
        }));
        return histMap;
    }


    createSearchBar() {
        var _thisRef = this;
        var focusing = -1;
        var resultNumber = 8;

        var searchBox = document.createElement('input');
        searchBox.className = 'hist-search-box';
        searchBox.id = 'histSearchBox';
        searchBox.setAttribute("type", "text");
        searchBox.setAttribute("placeholder", "Search..");

        this.searchBox = searchBox;

        var searchIcon = document.createElement("i");
        searchIcon.className = "fa fa-search";

        var searchButton = document.createElement('button');
        searchButton.setAttribute('type', 'submit');
        searchButton.className = "hist-search-button";
        searchButton.appendChild(searchIcon);

        var searchDiv = document.createElement('div');
        searchDiv.append(searchBox, searchButton);
        searchDiv.style.height = '28px';

        var searchBar = document.createElement('div');
        searchBar.className = 'ol-control hist-search-bar tooltip';
        searchBar.appendChild(searchDiv);

        var searchBarControl = new ol.control.Control({
            element: searchBar
        });
        this.histMap.addControl(searchBarControl);

        searchBox.addEventListener('input', function () {
            focusing = -1;
            removeAllSuggestions();
            var keyword = this.value.toLowerCase();
            if (!keyword) return;

            var matchingResults = findResults(keyword);
            matchingResults.slice(0, resultNumber).map(function (matching) {
                var keywordStart = matching.start;
                var keywordStop = keywordStart + keyword.length;
                var result = matching.result;
                var placeNamePlain = result[_thisRef.hist_cartouche_title_field] || result[_thisRef.hist_place_name_field];

                var placeName = placeNamePlain.slice(0, keywordStart) + '<strong>' + placeNamePlain.slice(keywordStart, keywordStop) + '</strong>' + placeNamePlain.slice(keywordStop);
                var suggestion = document.createElement('div');
                suggestion.className = 'hist-suggest';
                suggestion.innerHTML = placeName;
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
                if (focusing > -1) searchBar.getElementsByClassName("hist-suggest")[focusing].click();
                else searchButton.click();
            }
        });


        searchButton.onclick = function () {
            var keyword = searchBox.value;
            var searchResults = findResults(keyword);
            searchResults = searchResults.map(r => r.result);
            _thisRef.searchResults = searchResults;
            _thisRef.currentResults = [];
            _thisRef.setFilter();
            _thisRef.reload(_thisRef.totalResults);
            _thisRef.searchAction(searchResults, keyword);
            let firstResult = searchResults[0];
            if (firstResult) _thisRef.markerClick(firstResult[_thisRef.hist_id_field], true);
        };

        document.addEventListener("click", function (e) {
            if (e.target === searchBox) return;
            removeAllSuggestions();
        });

        function findResults(keyword) {
            if (!keyword) return;
            keyword = keyword.toLowerCase();
            var matchingResults = {};
            for (let i = 0; i < _thisRef.totalResults.length; i++) {
                let result = _thisRef.totalResults[i];
                let placeName = result[_thisRef.hist_cartouche_title_field] || result[_thisRef.hist_place_name_field];

                if (!placeName) continue;
                let placeNameLower = placeName.toLowerCase();
                if (!placeNameLower.includes(keyword)) continue;
                if (matchingResults.hasOwnProperty(placeNameLower)) continue;
                matchingResults[placeNameLower] = {
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
            var suggestions = searchBar.getElementsByClassName("hist-suggest");
            for (let i = 0; i < suggestions.length; i++) suggestions[i].classList.remove('hist-suggest-active');
            if (focusing > -1) suggestions[focusing].classList.add('hist-suggest-active');
        }

        function removeAllSuggestions() {
            var suggestions = searchBar.getElementsByClassName("hist-suggest");
            while (suggestions[0]) searchBar.removeChild(suggestions[0]);
        }
    }

    createBtn(icon, text, position) {
        var [btn, tooltip, container] = createBtnWithTooltip(icon, text, position);
        container.className += ' ol-control';

        var control = new ol.control.Control({element: container});
        this.histMap.addControl(control);

        return [btn, tooltip, container];
    }


    createChangeDisplayButton() {
        this.displayIcon = document.createElement('img');
        this.displayIcon.src = 'Images/display-icon-0.png';

        var [btn, tooltip, container] = this.createBtn(this.displayIcon, 'Change display mode', 'topright');

        container.className += ' change-display';

        btn.addEventListener('click', () => {
            this.changeToNextDisplay();
            this.changeDisplayAction(this.currentDisplay);
        });
    }

    changeToNextDisplay() {
        this.currentDisplay = (this.currentDisplay + 1) % this.noDisplayModes;
        // if (TWO_DISPLAY_MAPS.includes(this.fieldType) && this.currentDisplay === 2) this.displayIcon.src = '';
        // else this.displayIcon.src = `Images/display-icon-${this.currentDisplay}.png`;
        if (this.currentDisplay === 2) this.displayIcon.src = '';
        else this.displayIcon.src = `Images/display-icon-${this.currentDisplay}.png`;
        this.clusters.setStyle(source => this.getStyle(source.get('features'), null, this.chosenIds));
        this.frameClusters.setStyle(source => this.getStyle(source.get('features')));
    }

    getStyle(features, solid = false, chosenIds) {
        var size = features.length;
        var result = features[0].get('result');
        var isChosen = chosenIds ? chosenIds.includes(result[this.hist_id_field]) : false;
        var display = this.currentDisplay;
        const color = '#00f7ff',
            chosenColor = '#00008B';
        if (size === 1) {
            // const selectedCategory = this.filterBox.value;
            if (display == 0 && !solid) {
                if (TWO_DISPLAY_MAPS.includes(this.fieldType)) {
                    let coords = result[this.hist_coords_field];
                    let coords_list = coords.split(",");
                    let new_coords_list = [];
                    for (let j = 0; j < coords_list.length; j += 2) new_coords_list.push([+coords_list[j], -coords_list[j + 1]]);
                    new_coords_list.push(new_coords_list[0]);
                    return new ol.style.Style({
                        geometry: new ol.geom.Polygon([new_coords_list]),
                        stroke: new ol.style.Stroke({color: isChosen ? chosenColor + '70' : '#ffffff00', width: 1}),
                        fill: new ol.style.Fill({color: isChosen ? chosenColor + '20' : '#ffffff00'})
                    });
                } else return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: isChosen ? 12 : 6,
                        stroke: new ol.style.Stroke({color: isChosen ? chosenColor : color, width: 1}),
                        fill: new ol.style.Fill({color: isChosen ? chosenColor + '40' : color + '40'})
                    })
                });
            } else if (display == 1 || solid) {
                let coords = result[this.hist_coords_field];
                let coords_list = coords.split(",");
                let new_coords_list = [];
                for (let j = 0; j < coords_list.length; j += 2) new_coords_list.push([+coords_list[j], -coords_list[j + 1]]);
                if (TWO_DISPLAY_MAPS.includes(this.fieldType)) {
                    return new ol.style.Style({
                        geometry: new ol.geom.Polygon([new_coords_list]),
                        stroke: new ol.style.Stroke({color: isChosen ? chosenColor + '70' : color + '70', width: 1}),
                        fill: new ol.style.Fill({color: isChosen ? chosenColor + '20' : color + '10',}),
                    });
                } else return new ol.style.Style({
                    geometry: new ol.geom.Polygon([new_coords_list]),
                    stroke: new ol.style.Stroke({color: isChosen ? chosenColor : color, width: 1}),
                    fill: new ol.style.Fill({color: isChosen ? chosenColor + '20' : color + '20',}),
                });
            }
            // else if (display == 2) {
            // return;
            // if (TWO_DISPLAY_MAPS.includes(this.fieldType)) return;
            // if (selectedCategory === 'all') {
            //     let categories = result[this.hist_categories_field];
            //     let chosen_category = categories ? categories.split("|")[0] : 'other';
            //     return new ol.style.Style({
            //         image: new ol.style.Icon(({
            //             crossOrigin: 'anonymous',
            //             src: `Images/icons/icon_${chosen_category}.png`,
            //             scale: 1,
            //         }))
            //     });
            // } else {
            //     return new ol.style.Style({
            //         image: new ol.style.Icon(({
            //             crossOrigin: 'anonymous',
            //             src: `Images/icons/icon_${selectedCategory}.png`,
            //             scale: 1,
            //         }))
            //     });
            // }
            // }
        } else {
            if (display != 2) {
                let color = '#ECC54D';
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 15,
                        stroke: new ol.style.Stroke({color: color + '90', width: 8}),
                        fill: new ol.style.Fill({color: color})
                    }),
                    text: new ol.style.Text({
                        text: size.toString(),
                        fill: new ol.style.Fill({color: '#000'})
                    })
                });
            }
        }
    }


    createCategoryFilter() {
        if (this.fieldType === 'gm') var categoryList = ["All", "Cartouche", "City", "Desert", "Funeral monument", "Gulf", "Island", "Lake", "Mountain", "People", "Region", "River", "Sea", "Ship", "Other"];
        else if (FILTER_BY_NAME_MAPS.includes(this.fieldType)) {
            categoryList = this.totalResults.map(r => r[this.hist_categories_field].split("|")).flat();
            categoryList = [...new Set(categoryList)];

            if (this.fieldType !== 'sinai') categoryList.sort();
            if (this.fieldType === 'bosch') categoryList.unshift('Depicted Items');
            else if(this.fieldType === 'raj') categoryList.unshift('All Hill Forts');
            else categoryList.unshift('All');
        } else categoryList = ["All", "Bridge", "Cape", "Cartouche", "City", "Desert", "Funeral monument", "Gulf", "Island", "Lake", "Mountain", "People", "Region", "River", "Road", "Sea", "Ship", "Temple", "Other"];
        var filterSelect = this.filterBox = document.createElement('select');

        for (let i = 0; i < categoryList.length; i++) {
            let category = categoryList[i];
            let filterOption = document.createElement('option');
            filterOption.value = category.toLowerCase();
            filterOption.text = category;
            filterSelect.appendChild(filterOption);
        }

        filterSelect.onchange = () => {
            let selectedCategory = filterSelect.value;

            if (selectedCategory === 'all') var filterResults = this.totalResults;
            else filterResults = this.totalResults.filter(result => result[this.hist_categories_field].toLowerCase().split("|").includes(selectedCategory));
            let selectedCategoryEncoded = encodeURI(selectedCategory.toLowerCase());
            this.setSearchBox();
            this.searchResults = filterResults;
            this.currentResults = [];
            this.filterAction(filterResults, selectedCategoryEncoded);
        };

        var element = document.createElement('div');
        element.className = 'category-filter ol-unselectable ol-control';
        element.appendChild(filterSelect);

        var control = new ol.control.Control({element: element});
        this.histMap.addControl(control);
    }

    createFullScreenBtn() {
        var fullScreenIcon = document.createElement('img');
        fullScreenIcon.src = 'Images/fullscreen.ico';

        var [btn, tooltip, container] = this.createBtn(fullScreenIcon, 'Full screen', 'topleft');
        container.className += ' fullscreen';

        btn.onclick = () => {
            if (document.fullscreenElement) closeFullscreen();
            else openFullscreen(document.getElementById(this.container));
        };

        document.addEventListener("fullscreenchange", function () {
            if (document.fullscreenElement) {
                fullScreenIcon.src = "Images/collapse.png";
                tooltip.innerText = 'Exit full screen';
            } else {
                fullScreenIcon.src = "Images/fullscreen.ico";
                tooltip.innerText = 'Full screen';
            }
        });

        function openFullscreen(elem) {
            if (elem.requestFullscreen) elem.requestFullscreen();
            else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
            else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
            else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
        }

        function closeFullscreen() {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
    }

    createSuggestBar() {
        this.notAvailBtn = document.createElement('button');
        this.notAvailBtn.className = "hist-not-avail-btn";
        this.notAvailBtn.innerText = "Not available on this map";
        this.notAvailBtn.style.display = "none";

        this.notAvailBtn.onclick = function () {
            document.getElementById("suggestModal").style.display = "block";
        };

        var suggestDiv = document.createElement('div');
        suggestDiv.className = "hist-not-avail-div ol-unselectable ol-control";
        suggestDiv.appendChild(this.notAvailBtn);

        var control = new ol.control.Control({element: suggestDiv});
        this.histMap.addControl(control);
    }

    openNotAvail() {
        this.notAvailBtn.style.display = "block";
    }

    closeNotAvail() {
        this.notAvailBtn.style.display = "none";
    }


    addMarkers() {
        if (this.clusters) this.histMap.removeLayer(this.clusters);
        if (this.frameClusters) this.histMap.removeLayer(this.frameClusters);
        var _thisRef = this;
        var coordsCache = [];
        var markers = [], frameMarkers = [];

        for (let i = 0; i < this.results.length; i++) {
            let result = this.results[i],
                xzoom = parseFloat(result[this.hist_xzoom_field]),
                yzoom = parseFloat(result[this.hist_yzoom_field]),
                coord = [xzoom, -yzoom];
            if (!(xzoom && yzoom)) continue;
            let isDuplicate = coordsCache.some(value => value[0] === coord[0] && value[1] === coord[1]);
            if (isDuplicate) continue;

            coordsCache.push(coord);
            let histMarker = new ol.Feature({
                type: 'click',
                geometry: new ol.geom.Point(coord),
                result: result,
            });
            let id_int = parseInt(result[this.hist_id_field]);
            if (this.fieldType === 'fm' && id_int < 3179 && id_int > 3166) frameMarkers.push(histMarker);
            else markers.push(histMarker);
        }
        this.histMarkers = markers.concat(frameMarkers);

        this.clusters = new ol.layer.Vector({
            source: new ol.source.Cluster({
                distance: _thisRef.distance,
                source: new ol.source.Vector({features: markers})
            }),
            style: source => this.getStyle(source.get('features')),
        });

        this.frameClusters = new ol.layer.Vector({
            source: new ol.source.Cluster({
                distance: _thisRef.distance,
                source: new ol.source.Vector({features: frameMarkers})
            }),
            style: source => this.getStyle(source.get('features')),
        });

        this.histMap.addLayer(this.clusters);
        this.histMap.addLayer(this.frameClusters);

        if (TWO_DISPLAY_MAPS.includes(this.fieldType)) {
            // this.clickMarker = new ol.layer.Vector({
            //     source: new ol.source.Vector({features: undefined}),
            // });
            // this.histMap.addLayer(this.clickMarker);

            this.hoverMarker = new ol.layer.Vector({
                source: new ol.source.Vector({features: undefined}),
            });
            this.histMap.addLayer(this.hoverMarker);
        }
    }


    createClickPopups() {
        var clickPopups = [];
        for (let i = 0; i < this.clickPopupNumber; i++) clickPopups.push(new HistPopup(this.fieldType, this.histMap));
        return clickPopups;
    }

    createMovePopup() {
        return new MovePopup(this.fieldType, this.histMap);
    }


    hideAllClickPopup() {
        this.clickPopups.forEach(p => p.hide());
    }

    clickHandle(evt) {
        this.hideAllClickPopup();
        var feature = this.getFeatureFromPixel(evt);
        if (!feature) return;
        var coord = feature.getGeometry().getCoordinates();
        var view = this.histMap.getView();
        var markers = feature.get('features') || [feature.values_];
        if (!markers) return;
        if (markers.length > 1) {
            view.animate({
                center: coord,
                zoom: view.getZoom() + 1,
                duration: 500
            });
        } else {
            this.popupMarkerOnClick(markers[0]);
            // if (TWO_DISPLAY_MAPS.includes(this.fieldType)) {
            //     this.clickMarker.getSource().clear();
            //     this.clickMarker.getSource().addFeatures([feature]);
            //     this.clickMarker.setStyle(this.getStyle([feature], true));
            // }
        }
    }

    popupMarkerOnClick(marker) {
        if (!marker) return;
        this.closeNotAvail();
        var result = marker.result || marker.get('result'),
            chosenId = result[this.hist_id_field],
            xzoom = result[this.hist_xzoom_field],
            yzoom = result[this.hist_yzoom_field],
            coord = [xzoom, -yzoom];

        if (!this.chosenIds || !this.chosenIds.includes(chosenId)) this.chosenIds = [chosenId];
        this.currentResults = [result];
        this.histMap.getView().animate({center: coord, duration: 1000});
        this.popupMarker(result, 0, yzoom / this.imgHeight < 0.1);
        this.clusters.setStyle(source => this.getStyle(source.get('features'), null, this.chosenIds));
        this.clickAction(result);
    }

    popupMarker(result, clickPopupIndex = 0, bottom = false) {
        var coord = [result[this.hist_xzoom_field], -result[this.hist_yzoom_field]];
        var hist_place_name = result[this.hist_cartouche_title_field] || result[this.hist_place_name_field] || "Unknown";
        var categories = result[this.hist_categories_field] || "";
        var clickpopup = this.clickPopups[clickPopupIndex];
        try {
            clickpopup.setTitle(hist_place_name);
            clickpopup.setCategories(categories);
            clickpopup.setPubs('?');
            clickpopup.setImages('?');
            clickpopup.setVideos('?');

            clickpopup.setPosition(coord);
            if (bottom) clickpopup.setBottom();
            else clickpopup.setTop();
        } catch (e) {
        }
    }

    moveHandle(evt) {
        var features = this.histMap.getFeaturesAtPixel(evt.pixel);
        features = features.filter(feature => feature.get('features'));
        var results = features.map(feature => feature.get('features')[0].get('result'));
        var coords = results.map(r => r ? r[this.hist_coords_field] : "");
        var innerIndex = findMinCoorIndex(coords);
        var feature = features[innerIndex];

        if (feature) {
            this.histMap.getTargetElement().style.cursor = 'pointer';
            const markers = feature.get('features');
            if (!markers) return;
            if (markers.length === 1) {
                var result = markers[0].get('result');
                var xzoom = result[this.hist_xzoom_field], yzoom = result[this.hist_yzoom_field],
                    center = [xzoom, -yzoom];
                var markerNotClicked = true;
                for (var i = 0; i < this.clickPopups.length; i++) {
                    var clickPopupCenter = this.clickPopups[i].getPosition();
                    if (clickPopupCenter) {
                        if (center.every((value, index) => value === clickPopupCenter[index])) {
                            markerNotClicked = false;
                            break;
                        }
                    }
                }
                if (markerNotClicked) {
                    let placeName = result[this.hist_cartouche_title_field] || result[this.hist_place_name_field] || "Unknown";
                    let categories = result[this.hist_categories_field] || "";

                    this.movePopup.setTitle(placeName);
                    this.movePopup.setCategories(categories);
                    this.movePopup.setPosition(center);
                    this.movePopup.setClickAction(() => {
                        this.markerClick(result[this.hist_id_field], true);
                    });
                    if (yzoom / this.imgHeight < 0.1) this.movePopup.setBottom();
                    else this.movePopup.setTop();
                }
                if (TWO_DISPLAY_MAPS.includes(this.fieldType)) {
                    this.hoverMarker.getSource().clear();
                    this.hoverMarker.getSource().addFeatures(markers);
                    this.hoverMarker.setStyle(this.getStyle(markers, true));
                }
            }
        } else {
            this.histMap.getTargetElement().style.cursor = 'grabbing';
            this.movePopup.hide();
            if (TWO_DISPLAY_MAPS.includes(this.fieldType) && this.hoverMarker) this.hoverMarker.getSource().clear();
        }

        function findMinCoorIndex(coordList) {
            coordList = coordList.map(coor => coor.split(",").map(c => parseInt(c)));
            var coordListMax = coordList.map(coor => Math.max(...coor));
            return coordListMax.indexOf(Math.min(...coordListMax));
        }
    }

    centerMapToOrigin() {
        this.histMap.getView().animate({
            center: this.initialCenter,
            zoom: this.minLayer,
            duration: 1000,
        });
    }

    centerMapOnResults(results) {
        const calAver = list => list.reduce((prev, curr) => prev + curr) / list.length;

        if (!results) {
            this.centerMapToOrigin();
            return;
        }

        var firstResult = results.find(r => r[this.hist_xzoom_field] && r[this.hist_xzoom_field]);
        if (!firstResult) {
            this.centerMapToOrigin();
            this.openNotAvail();
            return;
        }

        // var x_mean = calAver(results.map(r => parseFloat(r[this.hist_xzoom_field]))),
        //     y_mean = calAver(results.map(r => parseFloat(r[this.hist_yzoom_field])));

        // for (let i = 0; i < results.length; i++) {
        //     var firstResult = results[i],
        //         xzoom = firstResult[this.hist_xzoom_field],
        //         yzoom = firstResult[this.hist_yzoom_field];
        //     if (xzoom && yzoom) {
        //         var firstCoord = [parseFloat(xzoom), -parseFloat(yzoom)];
        //         break;
        //     }
        // }
        var xzoom = parseFloat(firstResult[this.hist_xzoom_field]),
            yzoom = parseFloat(firstResult[this.hist_yzoom_field]);

        this.closeNotAvail();
        this.histMap.getView().animate({
            center: [xzoom, -yzoom],
            zoom: this.maxLayer,
            duration: 1000,
        });
        if (results.length === 1) this.popupMarker(firstResult, 0)

        this.chosenIds = results.map(r => r[this.hist_id_field]);
        this.clusters.setStyle(source => this.getStyle(source.get('features'), null, this.chosenIds));
        // for (let i = 0; i < results.length; i++) this.popupMarker(results[i], i);
    }

    initialLoad(chosenResults, mode, clicked) {
        this.currentResults = chosenResults;
        if (mode == 1 && this.currentResults.length) this.reload(this.currentResults, this.currentResults[0][this.hist_id_field], clicked);
        else if (this.currentResults.length) this.reload(this.totalResults, this.currentResults[0][this.hist_id_field], clicked);
        else this.reload(this.totalResults, null, clicked);
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    async markerClick(hid, clicked) {
        if (!clicked) return;
        await this.delay(1000);
        var chosenResult = this.totalResults.find(r => r[this.hist_id_field] === hid)
        this.popupMarker(chosenResult)
        this.centerMapOnResults([chosenResult]);
        this.clickAction(chosenResult);
    }

    reload(results, hid = null, clicked = null) {
        this.results = results;
        this.addMarkers();
        this.hideAllClickPopup();
        if (hid) this.markerClick(hid, clicked);
        else this.centerMapOnResults();
    }

    setFilter(value) {
        this.filterBox.value = value ? value : 'all';
    }

    setSearchBox(value) {
        this.searchBox.value = value ? value : '';
    }
}

class HistPopup extends Popup {
    constructor(map_type, histMap) {
        super();
        this.map_type = map_type;
        this.init();

        this.container.className = 'ol-popup';
        this.arrow = this.createArrow();
        this.container.append(this.arrow);

        this.overlay = new ol.Overlay({
            element: this.container,
            autoPan: true,
            autoPanAnimation: {duration: 250}
        });

        histMap.addOverlay(this.overlay);

        if (this.closeBtn) this.closeBtn.onclick = () => {
            this.overlay.setPosition(undefined);
        };
    }

    getPosition() {
        return this.overlay.getPosition();
    }

    setPosition(coord) {
        this.overlay.setPosition(coord);
    }

    hide() {
        this.setPosition(undefined);
    }

    createArrow() {
        var arrow = document.createElement('span');
        arrow.className = 'popup-arrow';
        return arrow;
    }

    setTop() {
        this.container.className = 'ol-popup';
        this.arrow.className = 'popup-arrow';
    }

    setBottom() {
        this.container.className = 'ol-popup-bottom';
        this.arrow.className = 'popup-arrow-bottom';
    }

}

class MovePopup extends HistPopup {
    init() {
        this.container = document.createElement('div');
        this.contentContainer = this.createContent();

        this.container.append(this.contentContainer);
    }

    createContent() {
        this.title = document.createElement('div');
        this.title.className = 'popup-title';
        this.categories = document.createElement('div');
        var trove = document.createElement('div');
        trove.innerText = 'Click to see more';
        trove.style = 'color: blue; margin-top: 20px';

        var contentContainer = document.createElement('div');
        contentContainer.className = "ol-popup-content";
        contentContainer.append(this.title, this.categories, trove);

        trove.onclick = () => this.clickAction();

        return contentContainer;
    }

    setClickAction(clickAction) {
        this.clickAction = clickAction;
    }
}