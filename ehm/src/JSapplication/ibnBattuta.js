import {tabLoading} from "./openTab.js";
import {loadAllInfo, loadContempInfo, loadHistInfo} from "./loadResources.js";
import {getRequest, setParams} from "./httpRequest.js";
import {TextContent} from "./ClassTextContent.js";
import {FIELDS, CENTER} from "./config.js";
import {IbnBattutaMap} from "./ClassIbnBattutaMap.js";

// import {ContempMap} from "./ClassContempMap.js";

export function buildPostTemplate(MAP_TYPE) {
    const post_map_fields = FIELDS[MAP_TYPE],
        cont_map_fields = FIELDS.osm,
        post_id_field = post_map_fields.post_id,
        cont_id_field = cont_map_fields.cont_id;

    function closeAllPopups() {
        var allCloseBtns = $(".leaflet-popup-close-button");
        for (let i = 0; i < allCloseBtns.length; i++) allCloseBtns[i].click();
    }

    function contempMapPopup(results) {
        contempMap.currentResults = results;
        contempMap.centerMapOnResults(results);
    }

    function initialLoad(totalResults) {
        if (pid) {
            var results = totalResults.filter(result => result[post_id_field] == pid);
            var post_clicked = true;
            var cont_clicked = false;
        } else if (cid) {
            results = totalResults.filter(result => result[cont_id_field] == cid);
            post_clicked = false;
            cont_clicked = true;
        } else {
            results = [];
            post_clicked = false;
            cont_clicked = false;
        }
        textContent.initialLoad(results, post_clicked);
        contempMap.initialLoad(results, mode, cont_clicked);
    }

    function reloadMaps(results) {
        contempMap.searchResults = results;
        contempMap.reload(results, cid);
        textContent.reload(results);
    }

    function contempMapClickAction(results) {
        setParams({pid: '', cid: results[0][cont_id_field]});
        // textContent.reload(results);
        // textContent.setIntro(results[0][cont_place_name_field]);
        loadContempInfo(MAP_TYPE, results[0])
        // reloadMaps(results)
    }

    function contempMapSearchAction(results) {
        closeAllPopups();
        reloadMaps(results);
    }

    function changeModeAction() {
        closeAllPopups();
    }

    function postClickAction(postResult) {
        var post_id = postResult[post_id_field];
        setParams({pid: post_id, cid: ''});
        closeAllPopups();
        loadHistInfo(MAP_TYPE, postResult);
        loadContempInfo(MAP_TYPE, postResult);
    }

    function backClickAction() {
        setParams({pid: '', cid: ''});
    }

    // function pageHandle(totalResults) {
    //     contempMap.totalResults = totalResults;
    //     textContent.totalResults = totalResults;
    //     initialLoad(totalResults);
    // }

    var contempMap, textContent;

    const urlParams = new URLSearchParams(window.location.search);
    const ckey = urlParams.get('ckey');
    const pid = urlParams.get('pid');
    const cid = urlParams.get('cid');
    const mode = urlParams.get('mode');
    const vis = urlParams.get('vis');

    var mapType = CENTER.hasOwnProperty(MAP_TYPE) ? MAP_TYPE : 'default';
    var defaultItinerary = '1325–1332';
    var initialCenter = CENTER[mapType].initialCenter[defaultItinerary],
        initialLayer = CENTER[mapType].initialLayer[defaultItinerary],
        maxClusterLayer = CENTER[mapType].maxClusterLayer[defaultItinerary];
    contempMap = new IbnBattutaMap('cont_map_container', MAP_TYPE, [], contempMapClickAction,
        contempMapSearchAction, maxClusterLayer, initialLayer, initialCenter, vis);
    contempMap.setSearchBox(ckey);

    textContent = new TextContent('text_content_container', MAP_TYPE, postClickAction, backClickAction);

    if (!pid && !cid) loadAllInfo(MAP_TYPE);
    else if (pid) {
        setTimeout(function () {
            textContent.loadFullPost(pid, MAP_TYPE)
        }, 1000);
    } else if (cid) {
        loadHistInfo(MAP_TYPE);
    }
    tabLoading();

    getRequest('controller/searchMap.php', {map: 'ibnt'}, response => {
        var totalResults = contempMap.totalResults = JSON.parse(response).results;
        var results = [];
        if (cid) {
            results = totalResults.filter(result => result[cont_id_field] == cid);
            var cont_clicked = true;
        }
        contempMap.initialLoad(results, 0, cont_clicked);
    });
}

