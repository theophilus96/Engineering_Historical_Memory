import {ContempMap} from "./ClassContempMap.js";
import {SuggestModal} from "./SuggestModal.js";
import {loadAllInfo} from "./loadResources.js";
import {tabLoading} from "./openTab.js";
import {getRequest, setParams} from "./httpRequest.js";
import {FIELDS, CENTER} from "./config.js";
import {histMapPopup, contempMapPopup, histMapClear, contempMapClear} from "./mapFunctions.js";
import {SinaiMap} from "./ClassSinaiMap.js";
import {Visualization} from "./ClassVisualization.js";
import {Draggable} from "./ClassDraggable.js";

function histMapVideoAction() {
    setParams({video: 1});
    videoCont.style.display = 'block';
    histMapCont.style.display = 'none';
    loadAllInfo(MAP_TYPE + '_v')
}

function createVideoBtn() {
    var icon = document.createElement('img');
    icon.src = `Images/icons/return.png`;
    var btn = document.createElement('button');
    btn.id = 'videoBtn';
    btn.appendChild(icon);

    btn.addEventListener('click', function () {
        setParams({video: 0});
        videoCont.style.display = 'none';
        histMapCont.style.display = 'block';
        if (histMap.mode === 0) loadAllInfo(MAP_TYPE + '_d');
        else loadAllInfo(MAP_TYPE + '_h');
    });
    var element = document.createElement('div');
    element.className = 'video-btn tooltip';
    element.append(btn);
    return element;
}

function histMapClickAction(result) {
    var hist_id = result[hist_id_field];
    setParams({hid: hist_id, cid: ''});
    if (histMap.mode === 0 || histMap.verso === 1) {
        visualization.popup(result);
        loadAllInfo(MAP_TYPE, result);
    } else {
        var identified = contempMapPopup(result, contempMap, suggestModal, hist_id_field, cont_id_field);
        loadAllInfo(MAP_TYPE + "_h", result, identified);
    }
    if (hist_id == '82') load3DObject(hist_id);
    else draggable.hide();
}

function load3DObject(hist_id) {
    draggable.show();
    draggable.body.innerHTML = `<div style="width: 100%; height: 100%"><iframe src="3D/Sinai/"></iframe></div>`;
}

function contempMapClickAction(results) {
    setParams({hid: '', cid: results[0][cont_id_field]});
    histMapPopup(histMap, results);
    loadAllInfo(MAP_TYPE, results[0]);
}


function visClickAction(hids) {
    if (!hids) return;
    setParams({hid: hids[0], cid: ''});
    var results = allFrontBackResults.filter(r => hids.includes(r[hist_id_field]));
    var resultsInCurrentSide = results.filter(r => r[hist_front_back_field] == histMap.verso);
    if (resultsInCurrentSide.length) {
        histMapPopup(histMap, resultsInCurrentSide);
        loadAllInfo(MAP_TYPE, resultsInCurrentSide[0]);
    } else {
        histMap.flipBtn.click();
        resultsInCurrentSide = results.filter(r => r[hist_front_back_field] == histMap.verso);
        histMapPopup(histMap, resultsInCurrentSide);
        loadAllInfo(MAP_TYPE, resultsInCurrentSide[0]);
    }
}

function visResetAction() {
    histMap.reload(histMap.totalResults);
}


function histMapSearchAction(results, key) {
    setParams({hid: '', cid: '', hkey: key, ckey: '', cat: '', mode: 0});
}

function histMapFilterAction(results, cat) {
    setParams({hid: '', cid: '', hkey: '', ckey: '', cat: cat, mode: 0});
    histMap.reload(results);
}

function histMapModeAction(mode) {
    setParams({mode: mode});
    if (mode === 1) {
        let results = allFrontBackResults.filter(r => r[hist_front_back_field] == histMap.verso && r[hist_mode_field] == 1);
        visCont.style.display = 'none';
        contmapCont.style.display = 'block';
        document.getElementsByClassName('vis-container')[0].style.display = 'block';

        histMap.totalResults = results;
        histMap.reload(results);
        loadAllInfo(MAP_TYPE + "_h");
    } else {
        let results = allFrontBackResults.filter(r => r[hist_front_back_field] == histMap.verso);
        histMap.totalResults = results;
        histMap.reload(results);
        contmapCont.style.display = 'none';
        visCont.style.display = 'block';
        document.getElementsByClassName('vis-container')[0].style.display = 'none';
        loadAllInfo(MAP_TYPE + "_d");
    }
}

function histMapFlipAction(verso, mode) {
    setParams({verso: verso});
    // if (mode === 1) var results = allFrontBackResults.filter(r => r[hist_front_back_field] == verso && r[hist_mode_field] == 1);
    // else results = allFrontBackResults.filter(r => r[hist_front_back_field] == verso);
    if (verso == 1) {
        histMap.mode = 0;
        histMap.changeModeIcon();
        histMap.reloadFilterBtn();

        contmapCont.style.display = 'none';
        visCont.style.display = 'block';
        document.getElementsByClassName('vis-container')[0].style.display = 'none';
    }
    var results = allFrontBackResults.filter(r => r[hist_front_back_field] == verso);
    // var results = allFrontBackResults.filter(r => r[hist_front_back_field] == verso && (mode == 1 && verso == 0 ? r[hist_mode_field] == 1 : true));

    histMap.totalResults = results;
    histMap.initialLoad(results);
}

function contempMapSearchAction(results, key) {
    setParams({hid: '', cid: '', hkey: '', ckey: key, cat: '', mode: 0});
    histMapClear(histMap);
    histMap.reload(histMap.totalResults);
    histMap.centerMapOnResults(results);
}

function changeDisplayAction(dis) {
}

function changeModeAction(mode) {

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
    histMap.initialLoad(results, null, hist_clicked);
    contempMap.initialLoad(results, null, cont_clicked);
    if (results.length) loadAllInfo(MAP_TYPE + (mode == 0 ? "_d" : "_h"), results[0]);
}

function pageHandle(totalResults) {
    allFrontBackResults = totalResults;
    var results = allFrontBackResults.filter(r => r[hist_front_back_field] == verso && (mode == 1 && verso == 0 ? r[hist_mode_field] == 1 : true));

    contempMap = new ContempMap(contmapCont.id, MAP_TYPE, results, contempMapClickAction,
        contempMapSearchAction, maxClusterLayer, initialLayer, initialCenter, vis);
    contempMap.setSearchBox(ckey);

    histMap = new SinaiMap(histMapCont.id, 'Zoomify/Mount_Sinai/', results, histMapClickAction,
        histMapSearchAction, histMapFilterAction, changeDisplayAction, [3876, 4335], MAP_TYPE, dis);
    histMap.setSearchBox(hkey);
    // histMap.setFilter(mode);
    histMap.distance = 0;
    histMap.totalResults = results;
    histMap.sinai_init(histMapModeAction, histMapFlipAction, histMapVideoAction, mode, verso);
    // histMap.reload(hist_results);

    // contempMap.reload(hist_results);

    visualization = new Visualization(visCont.id, MAP_TYPE, [], visClickAction, visResetAction);

    if (mode == 0 || verso == 1) {
        visCont.style.display = 'block';
        contmapCont.style.display = 'none';
        document.getElementsByClassName('vis-container')[0].style.display = 'none';
    }
    initialLoad(results);
    if (video) histMap.videoBtn.click();
}

const MAP_TYPE = "sinai",
    hist_map_fields = FIELDS[MAP_TYPE],
    cont_map_fields = FIELDS.osm,
    cont_id_field = cont_map_fields.cont_id,
    hist_id_field = hist_map_fields.hist_id,
    hist_mode_field = hist_map_fields.hist_mode,
    hist_front_back_field = hist_map_fields.front_back,
    initialCenter = CENTER[MAP_TYPE].initialCenter,
    initialLayer = CENTER[MAP_TYPE].initialLayer,
    maxClusterLayer = CENTER[MAP_TYPE].maxClusterLayer,
    visCont = document.getElementById('visualization_container'),
    contmapCont = document.getElementById('cont_map_container');


var histMap, contempMap, suggestModal, visualization;

const urlParams = new URLSearchParams(window.location.search);
const cat = urlParams.get('cat');
const hkey = urlParams.get('hkey');
const ckey = urlParams.get('ckey');
const hid = urlParams.get('hid');
const cid = urlParams.get('cid');
const vis = urlParams.get('vis');

const dis = null;
const mode = urlParams.get('mode') ? parseInt(urlParams.get('mode')) : 1;
const verso = urlParams.get('verso') ? parseInt(urlParams.get('verso')) : 0;
const video = urlParams.get('video') ? parseInt(urlParams.get('video')) : 0;
const videoCont = document.getElementById('videoCont');
const histMapCont = document.getElementById('hist_map_container');
var allFrontBackResults;

videoCont.innerHTML = '<video width="100%" style="position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);" id="videoId" poster="Images/mount_sinai/mount-sinai-video.png" controls><source src="mount-sinai-video.mp4" type="video/mp4"></video>'
videoCont.appendChild(createVideoBtn());
videoCont.style.display = 'none';

suggestModal = new SuggestModal(MAP_TYPE, 'suggestModal', 'modalBody', 'modalClose');
var draggable = new Draggable(document.getElementById('draggable'));


loadAllInfo(MAP_TYPE)
tabLoading();

getRequest('controller/searchMap.php', {map: MAP_TYPE}, response => pageHandle(JSON.parse(response).results));