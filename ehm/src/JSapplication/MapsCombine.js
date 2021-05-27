import {HistMap} from "./ClassHistMap.js";
import {ContempMap} from "./ClassContempMap.js";
import {SuggestModal} from "./SuggestModal.js";
import {loadContempInfo} from "./loadResources.js";
import {tabLoading} from "./openTab.js";
import {getRequest, setParams} from "./httpRequest.js";
import {FIELDS} from "./config.js";

const MAP_TYPE = "comb",
    fm_map_fields = FIELDS.fm,
    gm_map_fields = FIELDS.gm,
    cont_map_fields = FIELDS.osm,
    cont_id_field = cont_map_fields['cont_id'],
    fm_id_field = fm_map_fields['hist_id'],
    fm_xzoom_field = fm_map_fields['hist_xzoom'],
    fm_yzoom_field = fm_map_fields['hist_yzoom'],
    fm_place_name_field = fm_map_fields['hist_place_name'],
    gm_id_field = gm_map_fields['hist_id'],
    gm_xzoom_field = gm_map_fields['hist_xzoom'],
    gm_yzoom_field = gm_map_fields['hist_yzoom'],
    gm_place_name_field = gm_map_fields['hist_place_name_06'];

var fmMap, gmMap, contempMap, suggestModal;


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

    contempMap.centerMapOnMarker(marker);
    if (!marker) {
        // contempMap.openSuggestBar();
        var identified = false;
    } else {
        // contempMap.closeNotAvail();
        identified = true;
    }
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

    loadContempInfo(MAP_TYPE, results[0]);
}


function fmMapClickAction(result) {
    setParams({fid: result[fm_id_field], gid: '', cid: ''});
    histMapPopup(gmMap, [result]);
    var identified = contempMapPopup(result, 'fm');
    loadContempInfo(MAP_TYPE, result, identified);
}

function gmMapClickAction(result) {
    setParams({fid: '', gid: result[gm_id_field], cid: ''});
    histMapPopup(fmMap, [result]);
    var identified = contempMapPopup(result, 'gm');
    loadContempInfo(MAP_TYPE, result, identified);
}

function fmMapSearchAction(results, key) {
    setParams({fid: '', gid: '', cid: '', fkey: key, gkey: '', ckey: '', fcat: '', gcat: '', mode: 0});
    histMapClear(gmMap);
    contempMapClear();
    reloadMaps(results);
}

function gmMapSearchAction(results, key) {
    setParams({fid: '', gid: '', cid: '', fkey: '', gkey: key, ckey: '', fcat: '', gcat: '', mode: 0});
    histMapClear(fmMap);
    contempMapClear();
    reloadMaps(results);
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
    fmMap.totalResults = results;
    contempMap.totalResults = results;
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
    } else {
        results = [];
        fm_clicked = false;
        gm_clicked = false;
        cont_clicked = false;
    }
    fmMap.initialLoad(results, mode, fm_clicked);
    gmMap.initialLoad(results, mode, gm_clicked);
    contempMap.initialLoad(results, mode, cont_clicked);
}

function pageHandle(results) {
    fmMap = new HistMap('fm_map_container', 'Zoomify/Fra_Mauro_Map_Zoomify/', results, fmMapClickAction,
        fmMapSearchAction, fmMapFilterAction, changeDisplayAction, [22110, 22110], 'fm', dis);
    fmMap.setSearchBox(fkey);
    fmMap.setFilter(fcat);

    gmMap = new HistMap('gm_map_container', 'Zoomify/Genoese_Map_Zoomify/', results, gmMapClickAction,
        gmMapSearchAction, gmMapFilterAction, changeDisplayAction, [4460, 2592], 'gm', dis);
    gmMap.setSearchBox(gkey);
    gmMap.setFilter(gcat);

    contempMap = new ContempMap('cont_map_container', MAP_TYPE, results, contempMapClickAction,
        contempMapSearchAction);
    contempMap.setSearchBox(ckey);

    suggestModal = new SuggestModal(MAP_TYPE, 'suggestModal', 'modalBody', 'modalClose');

    initialLoad(results);
    if (!fid && !gid && !cid) loadContempInfo(MAP_TYPE);
    tabLoading();
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

getRequest('controller/searchMap.php', {map: MAP_TYPE, fcat: fcat, gcat: gcat, fkey: fkey, gkey: gkey, ckey: ckey},
    response => pageHandle(JSON.parse(response)));