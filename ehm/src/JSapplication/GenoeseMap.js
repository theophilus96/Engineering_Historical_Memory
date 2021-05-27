import {HistMap} from "./ClassHistMap.js";
import {ContempMap} from "./ClassContempMap.js";
import {GlobeMap} from "./ClassGlobeMap.js";
import {SuggestModal} from "./SuggestModal.js";
import {loadAllInfo, loadHistInfo, loadContempInfo} from "./loadResources.js";
import {tabLoading} from "./openTab.js";
import {getRequest, setParams} from "./httpRequest.js";
import {FIELDS} from "./config.js";
import {Visualization} from "./ClassVisualization.js";
import {histMapPopup, contempMapPopup, histMapClear, contempMapClear} from "./mapFunctions.js";

function histMapClickAction(result) {
    setParams({hid: result[hist_id_field], cid: ''});
    var identified = contempMapPopup(result, contempMap, suggestModal, hist_id_field, cont_id_field);

    visualization.popup(result);
    loadAllInfo(MAP_TYPE, result, identified);
}


function contempMapClickAction(results) {
    setParams({hid: '', cid: results[0][cont_id_field]});
    histMapPopup(histMap, results);
    loadAllInfo(MAP_TYPE, results[0]);
}


function histMapSearchAction(results, key) {
    setParams({hid: '', cid: '', hkey: key, ckey: '', cat: '', mode: 0});
    contempMap.currentResults = [];
    contempMap.setSearchBox();
    // histMap.searchResults = results;
    contempMap.searchResults = results;
    contempMap.reload(contempMap.totalResults);
    contempMap.centerMapOnResults(results);
}

function histMapFilterAction(results, cat) {
    setParams({hid: '', cid: '', hkey: '', ckey: '', cat: cat, mode: 0});
    contempMapClear(contempMap);
    reloadMaps(results);
}

function contempMapSearchAction(results, key) {
    setParams({hid: '', cid: '', hkey: '', ckey: key, cat: '', mode: 0});
    histMapClear(histMap);
    // reloadMaps(results);
    histMap.reload(histMap.totalResults);
    histMap.centerMapOnResults(results);
}

function changeDisplayAction(dis) {
    setParams({dis: dis});
}

function changeModeAction(mode) {
    setParams({mode: mode});

    if (mode == 1 && histMap.currentResults.length) {
        histMap.reload(histMap.currentResults, histMap.currentResults[0][hist_id_field]);
    } else if (mode == 0) {
        if (histMap.currentResults.length) histMap.reload(histMap.searchResults, histMap.currentResults[0][hist_id_field]);
        else histMap.reload(histMap.searchResults);
    }
}

function visClickAction(data, fullNodes = null) {
    if (!data) return;
    if (data.hasOwnProperty('hist_id')) {
        var results = [data.result];
        loadContempInfo(MAP_TYPE, results[0]);
        setParams({coun_id: '', cid: '', hid: data.hist_id});
    } else if (data.hasOwnProperty('cont_id')) {
        if (fullNodes) results = fullNodes.filter(node => node.result && node.result[cont_id_field] === data.cont_id).map(node => node.result);
        else {
            if (!data.hasOwnProperty('children')) return;
            results = data.children.map(item => item.result);
        }
        loadContempInfo(MAP_TYPE, results[0]);
        setParams({coun_id: '', cid: data.cont_id, hid: ''});
    } else if (data.hasOwnProperty('country_id')) {
        if (fullNodes) results = fullNodes.filter(node => node.result && node.result[cont_country_field] === data.country_id).map(node => node.result);
        else {
            if (!data.hasOwnProperty('children')) return;
            var cont_ids = data.children.map(cont_item => cont_item.cont_id);
            results = visualization.totalResults.filter(r => cont_ids.includes(r[cont_id_field]));
        }
        var country_result = {[cont_place_name_field]: data.name, [cont_place_name_split_field]: data.name};
        loadContempInfo(MAP_TYPE, country_result);
        setParams({coun_id: data.country_id, cid: '', hid: ''});
    } else return;
    histMapPopup(histMap, results);
    loadHistInfo(MAP_TYPE, results[0]);
}

function visResetAction() {
    histMap.reload(histMap.totalResults);
}

function reloadMaps(results) {
    histMap.reload(results, hid);
    contempMap.reload(results, cid);
    histMap.searchResults = results;
    contempMap.searchResults = results;
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
    } else if (coun_id) {
        results = results.filter(result => result[cont_country_field] == coun_id);
        hist_clicked = false;
        cont_clicked = true;
    } else {
        results = [];
        hist_clicked = false;
        cont_clicked = false;
    }
    histMap.initialLoad(results, mode, hist_clicked);
    contempMap.initialLoad(results, mode, cont_clicked);
    if (cont_clicked) visualization.popup(results[0]);
    if (coun_id) histMapPopup(histMap, results);
    loadAllInfo(MAP_TYPE, results[0]);
}

function pageHandle(totalResults) {
    histMap.totalResults = totalResults;
    contempMap.totalResults = totalResults;
    visualization = new Visualization('visualization_container', MAP_TYPE, totalResults, visClickAction, visResetAction);
    initialLoad(totalResults);
}

const MAP_TYPE = "gm",
    hist_map_fields = FIELDS[MAP_TYPE],
    cont_map_fields = FIELDS.osm,
    cont_id_field = cont_map_fields.cont_id,
    cont_place_name_field = cont_map_fields.cont_place_name,
    cont_place_name_split_field = cont_map_fields.cont_place_name_split,
    cont_country_field = cont_map_fields.cont_country,
    hist_id_field = hist_map_fields.hist_id;

var histMap, contempMap, globeMap, suggestModal, visualization;

const urlParams = new URLSearchParams(window.location.search),
    cat = urlParams.get('cat'),
    hkey = urlParams.get('hkey'),
    ckey = urlParams.get('ckey'),
    hid = urlParams.get('hid'),
    cid = urlParams.get('cid'),
    coun_id = urlParams.get('coun_id'),
    dis = urlParams.get('dis'),
    mode = urlParams.get('mode'),
    vis = urlParams.get('vis');

histMap = new HistMap('hist_map_container', 'Zoomify/Genoese_Map_Zoomify/', [], histMapClickAction,
    histMapSearchAction, histMapFilterAction, changeDisplayAction, [4460, 2592], MAP_TYPE, dis);
histMap.setSearchBox(hkey);
histMap.setFilter(cat);

contempMap = new ContempMap('cont_map_container', MAP_TYPE, [], contempMapClickAction,
    contempMapSearchAction, null, null, null, vis);
contempMap.setSearchBox(ckey);

globeMap = contempMap.globeMap;

suggestModal = new SuggestModal(MAP_TYPE, 'suggestModal', 'modalBody', 'modalClose');

tabLoading();

getRequest('controller/searchMap.php', {map: MAP_TYPE}, response => pageHandle(JSON.parse(response).results));