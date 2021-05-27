import {HistMap} from "./ClassHistMap.js";
import {ContempMap} from "./ClassContempMap.js";
import {SuggestModal} from "./SuggestModal.js";
import {tabLoading} from "./openTab.js";
import {getRequest, setParams} from "./httpRequest.js";
import {DOMAIN, FIELDS, CENTER} from "./config.js";
// import {Visualization} from "./ClassVisualization.js";
import {histMapPopup, contempMapPopup, histMapClear, contempMapClear} from "./mapFunctions.js";
import {loadAllInfo, loadHistInfo} from "./loadResources.js";
import {ImolaMap} from "./ClassImolaMap.js";

function histMap1ClickAction(result) {
    setParams({hid: result[hist_id_field], cid: ''});
    histMapPopup(histMap2, [result]);
    var identified = contempMapPopup(result, contempMap, suggestModal, hist_id_field, cont_id_field);
    loadAllInfo(MAP_TYPE, result, identified);
}

function histMap2ClickAction(result) {
    setParams({hid: result[hist_id_field], cid: ''});
    if (histMap1.verso) {
        histMap1.flipBtn.click();
    }
    histMapPopup(histMap1, [result]);
    var identified = contempMapPopup(result, contempMap, suggestModal, hist_id_field, cont_id_field);
    loadAllInfo(MAP_TYPE, result, identified);

}

function contempMapClickAction(results) {
    setParams({hid: '', cid: results[0][cont_id_field]});
    if (histMap1.verso) {
        histMap1.flipBtn.click();
    }
    histMapPopup(histMap1, results);
    histMapPopup(histMap2, results);
    loadAllInfo(MAP_TYPE, results[0]);
}


function histMap1SearchAction(results, key) {
    setParams({hid: '', cid: '', hkey: key, ckey: '', cat: '', mode: 0});
    contempMap.currentResults = [];
    contempMap.setSearchBox();
    contempMap.reload(contempMap.totalResults);
    contempMap.centerMapOnResults(results);
    histMap2.reload(histMap2.totalResults);
    histMap2.centerMapOnResults(results);
}

function histMap2SearchAction(results, key) {
    setParams({hid: '', cid: '', hkey: key, ckey: '', cat: '', mode: 0});
    contempMap.currentResults = [];
    contempMap.setSearchBox();
    contempMap.reload(contempMap.totalResults);
    contempMap.centerMapOnResults(results);
    histMap1.reload(histMap1.totalResults);
    histMap1.centerMapOnResults(results);
}

function contempMapSearchAction(results, key) {
    setParams({hid: '', cid: '', hkey: '', ckey: key, cat: '', mode: 0});
    histMapClear(histMap1);
    histMapClear(histMap2);
    // reloadMaps(results);
}


function histMap1FilterAction(results, cat) {
    setParams({hid: '', cid: '', hkey: '', ckey: '', cat: cat, mode: 0});
    contempMapClear(contempMap);
    histMapClear(histMap2);
    reloadMaps(results);
}

function histMap2FilterAction(results, cat) {
    setParams({hid: '', cid: '', hkey: '', ckey: '', cat: cat, mode: 0});
    contempMapClear(contempMap);
    histMapClear(histMap1);
    reloadMaps(results);
}


function changeDisplayAction1(dis) {
    setParams({dis: dis});
    histMap2.changeToNextDisplay();
}

function changeDisplayAction2(dis) {
    setParams({dis: dis});
    histMap1.changeToNextDisplay();
}

function changeModeAction(mode) {
    setParams({mode: mode});
    if (mode == 1 && histMap1.currentResults.length) histMap1.reload(histMap1.currentResults, histMap1.currentResults[0][hist_id_field]);
    else if (mode == 0) {
        if (histMap1.currentResults.length) histMap1.reload(histMap1.searchResults, histMap1.currentResults[0][hist_id_field]);
        else histMap1.reload(histMap1.searchResults);
    }
}

function changePeriodAction() {
    if (this.currentPeriod === 0) loadHistInfo(MAP_TYPE);
    else if (this.currentPeriod === 1) loadHistInfo('cappelle');

}

// function visClickAction(data, fullNodes = null) {
//     if (!data) return;
//     if (data.hasOwnProperty('hist_id')) {
//         var results = [data.result];
//         loadContempInfo(MAP_TYPE, results[0]);
//     } else if (data.hasOwnProperty('cont_id')) {
//         if (fullNodes) results = fullNodes.filter(node => node.result && node.result[cont_id_field] === data.cont_id).map(node => node.result);
//         else {
//             if (!data.hasOwnProperty('children')) return;
//             results = data.children.map(item => item.result);
//         }
//         loadContempInfo(MAP_TYPE, results[0]);
//     } else if (data.hasOwnProperty('country_id')) {
//         if (fullNodes) results = fullNodes.filter(node => node.result && node.result[cont_country_field] === data.country_id).map(node => node.result);
//         else {
//             if (!data.hasOwnProperty('children')) return;
//             var cont_ids = data.children.map(cont_item => cont_item.cont_id);
//             results = visualization.totalResults.filter(r => cont_ids.includes(r[cont_id_field]));
//         }
//         var country_result = {[cont_place_name_field]: data.name, [cont_place_name_split_field]: data.name};
//         loadContempInfo(MAP_TYPE, country_result);
//     } else return;
//     histMapPopup(histMap1, results);
//     loadHistInfo(MAP_TYPE, results[0]);
// }

function reloadMaps(results) {
    histMap1.searchResults = histMap2.searchResults = contempMap.searchResults = results;
    histMap1.reload(results, hid);
    histMap2.reload(results, hid);
    contempMap.reload(results, cid);
}

function initialLoad(results) {
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
    histMap1.initialLoad(results, mode, hist_clicked);
    histMap2.initialLoad(results, mode, hist_clicked);
    contempMap.initialLoad(results, mode, cont_clicked);
}

function flipAction(verso) {
    if (!verso) {
        histMap1.totalResults = allFrontBackResults;
        histMap1.initialLoad(allFrontBackResults);
    }

}

function pageHandle(totalResults) {
    var cappelleResults = totalResults.filter(r => r[hist_id_field] >= 1000);
    allFrontBackResults = totalResults = totalResults.filter(r => r[hist_id_field] < 1000);
    histMap1 = new ImolaMap('imola_map_container', `${DOMAIN}/Zoomify/Imola_Map/`, totalResults, histMap1ClickAction,
        histMap1SearchAction, histMap1FilterAction, changeDisplayAction1, [7720, 5761], 'imola', dis);
    histMap1.imola_init(cappelleResults, changePeriodAction, flipAction);

    histMap1.distance = 0;
    histMap1.setSearchBox(hkey);
    histMap1.setFilter(cat);

    histMap2 = new HistMap('cadastral_map_container', `${DOMAIN}/Zoomify/Cadastral_Map/`, totalResults, histMap2ClickAction,
        histMap2SearchAction, histMap2FilterAction, changeDisplayAction2, [4096, 2629], 'cadastral', dis);
    histMap2.distance = 0;
    histMap2.setSearchBox(hkey);
    histMap2.setFilter(cat);

    // histMap.totalResults = totalResults;
    contempMap.totalResults = totalResults;
    // visualization = new Visualization('visualization_container', MAP_TYPE, totalResults, visClickAction);
    initialLoad(totalResults);
}

const MAP_TYPE = "imola",
    hist_map_fields = FIELDS[MAP_TYPE],
    cont_map_fields = FIELDS.osm,
    hist_id_field = hist_map_fields.hist_id,
    hist_categories_field = hist_map_fields.hist_categories,
    cont_id_field = cont_map_fields.cont_id,
    cont_place_name_field = cont_map_fields.cont_place_name,
    cont_place_name_split_field = cont_map_fields.cont_place_name_split,
    cont_country_field = cont_map_fields.cont_country;
var histMap1, histMap2;

const urlParams = new URLSearchParams(window.location.search),
    cat = urlParams.get('cat'),
    hkey = urlParams.get('hkey'),
    ckey = urlParams.get('ckey'),
    hid = urlParams.get('hid'),
    cid = urlParams.get('cid'),
    dis = urlParams.get('dis'),
    mode = urlParams.get('mode'),
    vis = urlParams.get('vis');


const initialCenter = CENTER[MAP_TYPE].initialCenter,
    initialLayer = CENTER[MAP_TYPE].initialLayer,
    maxClusterLayer = CENTER[MAP_TYPE].maxClusterLayer;

var allFrontBackResults;

document.getElementById('hist_map_container').innerHTML = "<div id='imola_map_container' class='mini-map mini-map-1'></div>" +
    "<div id='cadastral_map_container' class='mini-map mini-map-2'></div>";


var contempMap = new ContempMap('cont_map_container', MAP_TYPE, [], contempMapClickAction,
    contempMapSearchAction, maxClusterLayer, initialLayer, initialCenter, vis);
contempMap.setSearchBox(ckey);

var suggestModal = new SuggestModal(MAP_TYPE, 'suggestModal', 'modalBody', 'modalClose');

if (!hid && !cid) loadAllInfo(MAP_TYPE);
tabLoading();

getRequest(`${DOMAIN}/controller/searchMap.php`, {map: MAP_TYPE}, response => pageHandle(JSON.parse(response).results));

