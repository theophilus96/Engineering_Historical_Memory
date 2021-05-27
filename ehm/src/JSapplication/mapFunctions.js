import {setParams} from "./httpRequest.js";
import {loadAllInfo} from "./loadResources.js";

export function histMapPopup(histMap, results) {
    histMap.currentResults = results;
    histMap.hideAllClickPopup();
    histMap.centerMapOnResults(results);
}

export function contempMapPopup(result, contempMap, suggestModal, hist_id_field, cont_id_field) {
    if(!contempMap) return false;
    suggestModal.setHistId(result[hist_id_field]);

    contempMap.currentResults = [result];
    contempMap.closeNotAvail();
    var marker = contempMap.contMarkers[result[cont_id_field]];

    contempMap.centerMapOnMarker(marker, true);
    if (contempMap.globeMap) contempMap.globeMap.centerMapOnResults([result]);

    if (!marker) var identified = false;
    else identified = true;

    return identified;
}


export function histMapClear(histMap) {
    histMap.currentResults = [];
    histMap.setSearchBox();
    histMap.setFilter();
}

export function contempMapClear(contempMap) {
    if(!contempMap) return;
    contempMap.currentResults = [];
    contempMap.setSearchBox();
}


export function histMapClickAction(result, MAP_TYPE, contempMap, hist_id_field, hist_categories_field) {
    setParams({hid: result[hist_id_field], cid: ''});

    var categories = result[hist_categories_field];
    var category_list = categories ? categories.split("|") : [];
    if (category_list.includes('ship') && category_list.includes('animation')) {
        contempMap.setShipTurnaround(result[cont_id_field]);
    } else {
        contempMap.setShipTurnaround();
    }
    var identified = contempMapPopup(result);
    loadAllInfo(MAP_TYPE, result, identified);
}


export function contempMapClickAction(results, MAP_TYPE, histMap, cont_id_field) {
    setParams({hid: '', cid: results[0][cont_id_field]});
    histMapPopup(histMap, results);
    loadAllInfo(MAP_TYPE, results[0]);
}

export function histMapSearchAction(results, contempMap, key) {
    contempMap.currentResults = [];
    setParams({hid: '', cid: '', hkey: key, ckey: '', cat: '', mode: 0});
    reloadMaps(results);
    contempMap.setSearchBox();
}

export function histMapFilterAction(results, contempMap, cat) {
    setParams({hid: '', cid: '', hkey: '', ckey: '', cat: cat, mode: 0});
    contempMapClear(contempMap);
    reloadMaps(results);
}


export function contempMapSearchAction(results, histMap, key) {
    setParams({hid: '', cid: '', hkey: '', ckey: key, cat: '', mode: 0});
    histMapClear(histMap);
    reloadMaps(results);
}

export function changeDisplayAction(dis) {
    setParams({dis: dis});
}

export function changeModeAction(mode, histMap) {
    setParams({mode: mode});

    if (mode == 1 && histMap.currentResults.length) {
        histMap.reload(histMap.currentResults, histMap.currentResults[0][hist_id_field]);
    } else if (mode == 0) {
        if (histMap.currentResults.length) histMap.reload(histMap.searchResults, histMap.currentResults[0][hist_id_field]);
        else histMap.reload(histMap.searchResults);
    }
}

export function visClickAction(data, histMap, MAP_TYPE) {
    if (data.hasOwnProperty('hist_id')) {
        let result = data['result'];
        histMapPopup(histMap, [result]);
        loadAllInfo(MAP_TYPE, result);
    }
}

export function reloadMaps(results, histMap, contempMap) {
    histMap.searchResults = results;
    contempMap.searchResults = results;
    histMap.reload(results, hid);
    contempMap.reload(results, cid);
}

export function initialLoad(results, histMap, contempMap, hid, cid, hist_id_field, cont_id_field) {
    if (hid) {
        results = results.filter(result => result[hist_id_field] == hid);
        var hist_clicked = true;
        var cont_clicked = false;
    } else if (cid) {
        results = results.filter(result => result[cont_id_field] == cid);
        hist_clicked = false;
        cont_clicked = true;
    } else {
        results = [];
        hist_clicked = false;
        cont_clicked = false;
    }
    histMap.initialLoad(results, mode, hist_clicked);
    contempMap.initialLoad(results, mode, cont_clicked);
}

export function setShipTurnaround(id, draggable, container) {
    container.innerHTML = '';
    // var jsgif = document.getElementsByClassName("jsgif")[0];
    // if (jsgif) shipDivEle.removeChild(jsgif);

    var shipImgEle = document.createElement('img');
    shipImgEle.src = `Images/ship/${id}.gif`;
    shipImgEle.id = "shipImg";

    container.appendChild(shipImgEle);
    draggable.container.style.display = 'block';
    createGifControl(shipImgEle);

    function createGifControl(element) {
        var supergif = new SuperGif({
            gif: element,
            progressbar_height: 0,
            auto_play: true
        });
        var controlElement = document.createElement("div");
        controlElement.className = "gifcontrol";
        supergif.load(function (controlElement) {
            var playing = true;
            controlElement.addEventListener("click", function () {
                if (playing) {
                    this.pause();
                    playing = false;
                } else {
                    this.play();
                    playing = true;
                }
            }.bind(this, controlElement));
        }.bind(supergif)(controlElement));
        var canvas = supergif.get_canvas();
        controlElement.style.width = canvas.width + "px";
        controlElement.style.height = canvas.height + "px";
        controlElement.style.left = canvas.offsetLeft + "px";
        var containerElement = canvas.parentNode;
        containerElement.appendChild(controlElement);
    }
}