import {HistMap} from "./ClassHistMap.js";
import {loadAllInfo, loadContempInfo, loadHistInfo, loadResourcesMashup, loadWikipediaInfo} from "./loadResources.js";
import {getRequest, setParams} from "./httpRequest.js";
import {contempMapPopup, histMapPopup} from "./mapFunctions.js";
import {BoschMap} from "./ClassBoschMap.js";
import {tabLoading} from "./openTab.js";
import {FIELDS} from "./config.js";
import {Visualization} from "./ClassVisualization.js";
import {ContempMap} from "./ClassContempMap.js";

function histMapClickAction(result) {
    setParams({hid: result[hist_id_field], kid: ''});
    if(visualization) visualization.popup(result);
    loadAllInfo(MAP_TYPE, result);
}

function histMapSearchAction() {

}

function histMapFilterAction(results) {
    histMap.reload(results, results[0][hist_id_field], true);
    histMap.searchResults = results;

}

// function reloadMaps(results) {
//     // contempMap.reload(results, cid);
//     // contempMap.searchResults = results;
// }

function changeDisplayAction() {

}

function visClickAction(data) {
    if (!data) return;
    var results;
    if (data.hasOwnProperty('keyword_id')) {
        setParams({hid: '', kid: data.keyword_id});
        results = data.results;
        loadHistInfo(MAP_TYPE, results[0]);
        loadWikipediaInfo(MAP_TYPE, data.wikipedia, data.name + " renaissance");
        loadResourcesMashup(MAP_TYPE, data.name);
    } else if (data.hasOwnProperty('hist_id')) {
        results = [data.result];
        setParams({kid: '', hid: data.hist_id});
        loadHistInfo(MAP_TYPE, data.result)
    }
    histMapPopup(histMap, results);
}

function visResetAction() {

}

function initialLoad(results) {
    if (hid) {
        results = results.filter(result => result[hist_id_field] == hid);
        var hist_clicked = true;
        var cont_clicked = false;
    } else if (kid) {

    } else {
        results = [];
        hist_clicked = false;
        cont_clicked = false;
    }
    histMap.initialLoad(results, mode, hist_clicked);

    loadAllInfo(MAP_TYPE, results[0]);
}

function pageHandle(totalResults) {
    histMap = new HistMap('hist_map_container', 'Zoomify/Bosch/', totalResults, histMapClickAction,
        histMapSearchAction, histMapFilterAction, changeDisplayAction, [24762, 17844], MAP_TYPE, dis);
    // histMap.totalResults = totalResults;

    initialLoad(totalResults);
    getRequest('controller/searchMap.php', {map: MAP_KEYWORD}, response => {
        var bosch_keywords = JSON.parse(response).results;
        visualization = new Visualization('visualization_container', MAP_TYPE, totalResults, visClickAction, visResetAction, bosch_keywords)
    });
}

const urlParams = new URLSearchParams(window.location.search),
    cat = urlParams.get('cat'),
    hkey = urlParams.get('hkey'),
    ckey = urlParams.get('ckey'),
    hid = urlParams.get('hid'),
    kid = urlParams.get('kid'),
    coun_id = urlParams.get('coun_id'),
    dis = urlParams.get('dis'),
    mode = urlParams.get('mode'),
    vis = urlParams.get('vis');

const MAP_TYPE = 'bosch', MAP_KEYWORD = 'bosch_keyword',
    hist_map_fields = FIELDS[MAP_TYPE],
    cont_map_fields = FIELDS.osm,
    cont_place_name_field = cont_map_fields.cont_place_name,
    cont_place_name_split_field = cont_map_fields.cont_place_name_split,
    cont_country_field = cont_map_fields.cont_country,
    hist_id_field = hist_map_fields.hist_id;

tabLoading();

document.getElementById('cont_map_container').style.display = 'none';
document.getElementById('visualization_container').style.display = 'block';

var histMap, visualization;

// ContempMap.createVisualizationButton('visualization_container', MAP_TYPE);


getRequest('controller/searchMap.php', {map: MAP_TYPE}, response => pageHandle(JSON.parse(response).results));

