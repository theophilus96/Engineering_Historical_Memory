import {tabLoading} from "./openTab.js";
import {ContempMap} from "./ClassContempMap.js";
import {loadAllInfo, loadContempInfo, loadHistInfo} from "./loadResources.js";
import {getRequest, setParams} from "./httpRequest.js";
import {TextContent} from "./ClassTextContent.js";
import {FIELDS, CENTER} from "./config.js";
import {Visualization} from "./ClassVisualization.js";
import {histMapPopup} from "./mapFunctions.js";

export function buildPostTemplate(MAP_TYPE) {

    function closeAllPopups() {
        var allCloseBtns = $(".leaflet-popup-close-button");
        for (let i = 0; i < allCloseBtns.length; i++) allCloseBtns[i].click();
    }

    async function contempMapPopup(results) {
        contempMap.currentResults = results;
        if (contempMap.globeMap) contempMap.globeMap.centerMapOnResults(results);

        return await contempMap.centerMapOnResults(results);
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
        contempMap.initialLoad(results, mode, cont_clicked);
    }

    function reloadMaps(results) {
        contempMap.searchResults = results;
        contempMap.reload(results, cid);
        textContent.reload(results);
    }

    function contempMapClickAction(results) {
        var cont_id = results[0][cont_id_field];
        var place_name = results[0][cont_place_name_field];
        setParams({pid: '', cid: cont_id});
        loadContempInfo(MAP_TYPE, results[0]);
        textContent.showSearchResults({cid: cont_id}, place_name);
    }

    function contempMapSearchAction(results) {
        closeAllPopups();
        reloadMaps(results);
    }

    function changeModeAction() {
        closeAllPopups();
    }

    async function postClickAction(postResult, isPostClicked) {
        var post_id = postResult[post_id_field];
        setParams({pid: post_id, cid: ''});
        closeAllPopups();
        var contResults = contempMap.totalResults.filter(contResult => contResult.post_ids.split("|").includes(post_id));
        var popupResult = await contempMapPopup(contResults);
        loadHistInfo(MAP_TYPE, postResult);
        // if(!isPostClicked) return;
        if (popupResult && MAP_TYPE !== 'collab') loadContempInfo(MAP_TYPE, popupResult);
        else loadContempInfo(MAP_TYPE, postResult);
        visualization.popup(contResults[0]);
    }

    function backClickAction() {
        setParams({pid: '', cid: ''});
    }

    function visClickAction(data, fullNodes = null) {
        if (!data) return;
        if (data.hasOwnProperty('hist_id')) {
            var results = [data.result];
            loadContempInfo(MAP_TYPE, results[0]);
            setParams({coun_id: '', cid: '', hid: data.hist_id});
            textContent.showSearchResults({pid: data.hist_id}, data.name);
        } else if (data.hasOwnProperty('cont_id')) {
            if (fullNodes) results = fullNodes.filter(node => node.result && node.result[cont_id_field] === data.cont_id).map(node => node.result);
            else {
                if (!data.hasOwnProperty('children')) return;
                results = data.children.map(item => item.result);
            }
            loadContempInfo(MAP_TYPE, results[0]);
            setParams({coun_id: '', cid: data.cont_id, hid: ''});
            textContent.showSearchResults({cid: data.cont_id}, data.name);
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
            textContent.showSearchResults({tcat: 'country', tkey: data.country_id}, data.name);
        } else return;
        // histMapPopup(histMap, results);
        // loadHistInfo(MAP_TYPE, results[0]);
    }

    function visResetAction() {
        histMap.reload(histMap.totalResults);
    }

    const post_map_fields = FIELDS[MAP_TYPE],
        cont_map_fields = FIELDS.osm,
        post_id_field = post_map_fields.post_id,
        cont_id_field = cont_map_fields.cont_id,
        cont_place_name_field = cont_map_fields.cont_place_name,
        cont_place_name_split_field = cont_map_fields.cont_place_name_split,
        cont_country_field = cont_map_fields.cont_country;

    const urlParams = new URLSearchParams(window.location.search),
        ckey = urlParams.get('ckey'),
        pid = urlParams.get('pid'),
        cid = urlParams.get('cid'),
        mode = urlParams.get('mode'),
        vis = urlParams.get('vis'),
        fieldType = CENTER.hasOwnProperty(MAP_TYPE) ? MAP_TYPE : 'default',
        initialCenter = CENTER[fieldType].initialCenter,
        initialLayer = CENTER[fieldType].initialLayer,
        maxClusterLayer = CENTER[fieldType].maxClusterLayer;
    var visualization;

    var contempMap = new ContempMap('cont_map_container', MAP_TYPE, [], contempMapClickAction,
        contempMapSearchAction, maxClusterLayer, initialLayer, initialCenter, vis);
    contempMap.setSearchBox(ckey);

    var textContent = new TextContent('text_content_container', MAP_TYPE, postClickAction, backClickAction);

    loadAllInfo(MAP_TYPE);
    if (pid) {
        setTimeout(function () {
            textContent.loadFullPost(pid, MAP_TYPE)
        }, 1000);
    }
    tabLoading();

    getRequest('controller/searchMap.php', {map: "cont|" + MAP_TYPE}, response => {
        response = JSON.parse(response);
        contempMap.totalResults = response.results;
        initialLoad(response.results);
        visualization = new Visualization('visualization_container', MAP_TYPE, response.results, visClickAction, visResetAction);
    });
}

