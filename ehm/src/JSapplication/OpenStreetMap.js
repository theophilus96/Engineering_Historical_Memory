import {ContempMap} from "./ClassContempMap.js";
import {loadContempInfo} from "./loadResources.js";
import {tabLoading} from "./openTab.js";
import {getRequest, setParams} from "./httpRequest.js";
import {FIELDS} from "./config.js";

const MAP_TYPE = 'osm',
    cont_map_fields = FIELDS.osm,
    cont_id_field = cont_map_fields.cont_id;

var contempMap;


function contempMapClickAction(results) {
    setParams({cid: results[0][cont_id_field]});
    loadContempInfo(MAP_TYPE, results[0]);
}

function reloadMaps(results) {
    contempMap.totalResults = results;
    contempMap.reload(results, cid);
}

function initialLoad(results) {
    if (cid) {
        results = results.filter(result => result[cont_id_field] == cid);
        var cont_clicked = true;
    } else {
        results = [];
        cont_clicked = false;
    }
    contempMap.initialLoad(results, mode, cont_clicked);
}

function contempMapSearchAction(results, key) {
    setParams({cid: '', ckey: key});
    reloadMaps(results);
}

function changeModeAction(mode) {
    setParams({mode: mode});
}


function pageHandle(results) {
    contempMap = new ContempMap('cont_map_container', MAP_TYPE, results, contempMapClickAction,
        contempMapSearchAction);
    contempMap.setSearchBox(ckey);

    initialLoad(results);
    if (!cid) loadContempInfo(MAP_TYPE);
    tabLoading();
}

const urlParams = new URLSearchParams(window.location.search);
const ckey = urlParams.get('ckey');
const cid = urlParams.get('cid');
const mode = urlParams.get('mode');


getRequest('controller/searchMap.php', {map: MAP_TYPE, ckey: ckey},
    response => pageHandle(JSON.parse(response)));
