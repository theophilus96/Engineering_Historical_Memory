import {ContempMapCluster} from "./ClassContempMap.js";
import {loadContempInfo} from "./loadResources.js";
import {tabLoading} from "./openTab.js";
import {getRequest, getURI} from "./httpRequest.js";

const MAP_TYPE = 'osm';
var contempMap, mapURI = getURI();


function setParams(paramList) {
    for (let key in paramList) {
        if (!paramList.hasOwnProperty(key)) continue;
        let value = paramList[key];
        urlParams.set(key, value);
    }

    history.replaceState({}, null, `${mapURI}?${urlParams}`);
}

function contempMapClickAction(results) {
    setParams({cid: results[0]['cont_id']});
    loadContempInfo(MAP_TYPE, results[0]);
}

function reloadMaps(results) {
    contempMap.reload(results, cid);
    contempMap.totalResults = results;
}

function initialLoad(results) {
    if (cid) {
        results = results.filter(result => result['cont_id'] == cid);
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
    contempMap = new ContempMapCluster('cont_map_container', MAP_TYPE, results, contempMapClickAction,
        contempMapSearchAction, changeModeAction, mode);
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
