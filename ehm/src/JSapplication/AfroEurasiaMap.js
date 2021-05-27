import {HistMap} from "./ClassHistMap.js";
import {ContempMap} from "./ClassContempMap.js";
import {SuggestModal} from "./SuggestModal.js";
import {tabLoading} from "./openTab.js";
import {getRequest, setParams} from "./httpRequest.js";
import {FIELDS} from "./config.js";
import {Visualization} from "./ClassVisualization.js";
import {loadHistInfo, loadContempInfo, loadAllInfo} from "./loadResources.js";
import {Draggable} from "./ClassDraggable.js";
import {setShipTurnaround} from "./mapFunctions.js";


function histMapPopup(histMap, results) {
    histMap.currentResults = results;
    histMap.hideAllClickPopup();
    histMap.centerMapOnResults(results);
}

function contempMapPopup(result, mapType) {
    var hist_id_field = mapType === 'fm' ? fm_id_field : gm_id_field;

    suggestModal.setHistId(result[hist_id_field], mapType);

    contempMap.currentResults = [result];
    contempMap.closeNotAvail();
    var marker = contempMap.contMarkers[result[cont_id_field]];

    contempMap.centerMapOnMarker(marker, true);
    if (contempMap.globeMap) contempMap.globeMap.centerMapOnResults([result]);

    if (!marker) var identified = false;
    else identified = true;
    return identified;
}

function histMapClear(histMap) {
    histMap.currentResults = [];
    histMap.setSearchBox();
    histMap.setFilter();
}

function contempMapClear() {
    contempMap.currentResults = [];
    contempMap.setSearchBox();
}

function contempMapClickAction(results) {
    setParams({fid: '', gid: '', cid: results[0][cont_id_field]});

    contempMap.closeNotAvail();

    histMapPopup(fmMap, results);
    histMapPopup(gmMap, results);

    loadAllInfo(MAP_TYPE, results[0]);
}


function fmMapClickAction(result) {
    setParams({fid: result[fm_id_field], gid: '', cid: ''});
    var categories = result[fm_categories_field];
    var category_list = categories ? categories.split("|") : [];
    if (category_list.includes('ship') && category_list.includes('animation')) {
        draggable.container.style.display = 'block';
        setShipTurnaround(result[fm_id_field], draggable, multiSpectralDraggable);
    } else draggable.container.style.display = 'none';
    histMapPopup(gmMap, [result]);
    var identified = contempMapPopup(result, 'fm');
    visualization.popup(result);
    loadAllInfo(MAP_TYPE, result, identified);
}

function gmMapClickAction(result) {
    setParams({fid: '', gid: result[gm_id_field], cid: ''});
    histMapPopup(fmMap, [result]);
    var identified = contempMapPopup(result, 'gm');
    visualization.popup(result);
    loadAllInfo(MAP_TYPE, result, identified);
}

function fmMapSearchAction(results, key) {
    setParams({fid: '', gid: '', cid: '', fkey: key, gkey: '', ckey: '', fcat: '', gcat: '', mode: 0});
    histMapClear(gmMap);
    contempMapClear();
    contempMap.searchResults = results;
    contempMap.reload(contempMap.totalResults);
    contempMap.centerMapOnResults(results);

    gmMap.reload(gmMap.totalResults);
    gmMap.centerMapOnResults(results);
}

function gmMapSearchAction(results, key) {
    setParams({fid: '', gid: '', cid: '', fkey: '', gkey: key, ckey: '', fcat: '', gcat: '', mode: 0});
    histMapClear(fmMap);
    contempMapClear();
    contempMap.searchResults = results;
    contempMap.reload(contempMap.totalResults);
    contempMap.centerMapOnResults(results);

    fmMap.reload(fmMap.totalResults);
    fmMap.centerMapOnResults(results);
}

function fmMapFilterAction(results, cat) {
    setParams({fid: '', gid: '', cid: '', fkey: '', gkey: '', ckey: '', fcat: cat, gcat: '', mode: 0});
    histMapClear(gmMap);
    contempMapClear();
    reloadMaps(results);
}

function gmMapFilterAction(results, cat) {
    setParams({fid: '', gid: '', cid: '', fkey: '', gkey: '', ckey: '', fcat: '', gcat: cat, mode: 0});
    histMapClear(fmMap);
    contempMapClear();
    reloadMaps(results);
}

function contempMapSearchAction(results, key) {
    setParams({fid: '', gid: '', cid: '', fkey: '', gkey: '', ckey: key, fcat: '', gcat: '', mode: 0});
    histMapClear(fmMap);
    histMapClear(gmMap);
    reloadMaps(results);
}

function changeDisplayAction(dis) {
    setParams({dis: dis});
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
    histMapPopup(fmMap, results);
    histMapPopup(gmMap, results);
    loadHistInfo(MAP_TYPE, results[0]);
}


function changeModeAction(mode) {
    setParams({mode: mode});

    if (mode == 1) {
        if (fmMap.currentResults.length) fmMap.reload(fmMap.currentResults, fmMap.currentResults[0][fm_id_field]);
        if (gmMap.currentResults.length) gmMap.reload(gmMap.currentResults, gmMap.currentResults[0][gm_id_field]);
    } else if (mode == 0) {
        if (fmMap.currentResults.length) fmMap.reload(fmMap.totalResults, fmMap.currentResults[0][fm_id_field]);
        else fmMap.reload(fmMap.totalResults);

        if (gmMap.currentResults.length) gmMap.reload(gmMap.totalResults, gmMap.currentResults[0][gm_id_field]);
        else gmMap.reload(gmMap.totalResults);
    }
}

function reloadMaps(results) {
    fmMap.reload(results, fid);
    gmMap.reload(results, fid);
    contempMap.reload(results, cid);
    fmMap.searchResults = results;
    gmMap.searchResults = results;
    contempMap.searchResults = results;
}

function initialLoad(results) {
    if (fid) {
        results = results.filter(result => result[fm_id_field] == fid);
        var fm_clicked = true;
        var gm_clicked = false;
        var cont_clicked = false;
    } else if (gid) {
        results = results.filter(result => result[gm_id_field] == gid);
        fm_clicked = false;
        gm_clicked = true;
        cont_clicked = false;
    } else if (cid) {
        results = results.filter(result => result[cont_id_field] == cid);
        fm_clicked = false;
        gm_clicked = false;
        cont_clicked = true;
    } else if (coun_id) {
        results = results.filter(result => result[cont_country_field] == coun_id);
        fm_clicked = false;
        gm_clicked = true;
        cont_clicked = true;
    } else {
        results = [];
        fm_clicked = false;
        gm_clicked = false;
        cont_clicked = false;
    }
    fmMap.initialLoad(results, mode, fm_clicked);
    gmMap.initialLoad(results, mode, gm_clicked);
    contempMap.initialLoad(results, mode, cont_clicked);
    if (cont_clicked) visualization.popup(results[0]);
    if (coun_id) {
        histMapPopup(fmMap, results);
        histMapPopup(gmMap, results);
    }
    loadAllInfo(MAP_TYPE, results[0]);
}


function pageHandle(totalResults) {
    fmMap.totalResults = totalResults;
    gmMap.totalResults = totalResults;
    contempMap.totalResults = totalResults;
    visualization = new Visualization('visualization_container', MAP_TYPE, totalResults, visClickAction);
    initialLoad(totalResults);
}

const urlParams = new URLSearchParams(window.location.search);
const fcat = urlParams.get('fcat');
const gcat = urlParams.get('gcat');
const fkey = urlParams.get('fkey');
const gkey = urlParams.get('gkey');
const ckey = urlParams.get('ckey');
const fid = urlParams.get('fid');
const gid = urlParams.get('gid');
const cid = urlParams.get('cid');
const dis = urlParams.get('dis');
const mode = urlParams.get('mode');
const vis = urlParams.get('vis');
const coun_id = urlParams.get('coun_id');


const MAP_TYPE = "aem",
    fm_map_fields = FIELDS.fm,
    gm_map_fields = FIELDS.gm,
    cont_map_fields = FIELDS.osm,
    cont_id_field = cont_map_fields.cont_id,
    cont_place_name_field = cont_map_fields.cont_place_name,
    cont_place_name_split_field = cont_map_fields.cont_place_name_split,
    cont_country_field = cont_map_fields.cont_country,
    fm_id_field = fm_map_fields.hist_id,
    fm_categories_field = fm_map_fields.hist_categories,
    gm_id_field = gm_map_fields.hist_id,
    gm_categories_field = gm_map_fields.hist_categories;


var fmMap, gmMap, contempMap, suggestModal, visualization, multiSpectralDraggable = document.createElement('div')

document.getElementById('hist_map_container').innerHTML = "<div id='fm_map_container' class='mini-map mini-map-1'></div>" +
    "<div id='gm_map_container' class='mini-map mini-map-2'></div>";


fmMap = new HistMap('fm_map_container', 'Zoomify/Fra_Mauro_Map_Zoomify/', [], fmMapClickAction,
    fmMapSearchAction, fmMapFilterAction, changeDisplayAction, [22110, 22110], 'fm', dis);
fmMap.setSearchBox(fkey);
fmMap.setFilter(fcat);

gmMap = new HistMap('gm_map_container', 'Zoomify/Genoese_Map_Zoomify/', [], gmMapClickAction,
    gmMapSearchAction, gmMapFilterAction, changeDisplayAction, [4460, 2592], 'gm', dis);
gmMap.setSearchBox(gkey);
gmMap.setFilter(gcat);

contempMap = new ContempMap('cont_map_container', MAP_TYPE, [], contempMapClickAction,
    contempMapSearchAction, null, null, null, vis);
contempMap.setSearchBox(ckey);

suggestModal = new SuggestModal(MAP_TYPE, 'suggestModal', 'modalBody', 'modalClose');

var draggable = new Draggable(document.getElementById('draggable'));
draggable.body.appendChild(multiSpectralDraggable)
multiSpectralDraggable.id = 'multispectralDraggable';

loadAllInfo(MAP_TYPE);
tabLoading();

getRequest('controller/searchMap.php', {map: MAP_TYPE}, response => pageHandle(JSON.parse(response).results));