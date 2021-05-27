// import {HistMap} from "./ClassHistMap.js";
import {ContempMap} from "./ClassContempMap.js";
import {MultiSpectral} from "./ClassMultiSpectral.js";
import {SuggestModal} from "./SuggestModal.js";
import {tabLoading} from "./openTab.js";
import {getRequest, setParams} from "./httpRequest.js";
import {DOMAIN, FIELDS} from "./config.js";
import {Visualization} from "./ClassVisualization.js";
import {histMapPopup, contempMapPopup, histMapClear, contempMapClear, setShipTurnaround} from "./mapFunctions.js";
import {loadContempInfo, loadHistInfo, loadAllInfo} from "./loadResources.js";
import {Draggable} from "./ClassDraggable.js";
import {FraMauroMap} from "./ClassFraMauroMap.js";

function histMapClickAction(result) {
    setParams({hid: result[hist_id_field], cid: ''});
    var shipImageId = parseInt(result[hist_id_field]);
    var categories = result[hist_categories_field];
    var category_list = categories ? categories.split("|") : [];
    if (category_list.includes('ship') && category_list.includes('animation')) {
        draggable.container.style.display = 'block';
        setShipTurnaround(shipImageId, draggable, multiSpectralDraggable);
    } else draggable.container.style.display = 'none';

    var identified = contempMapPopup(result, contempMap, suggestModal, hist_id_field, cont_id_field);
    visualization.popup(result);
    loadAllInfo(MAP_TYPE, result, identified);
}

function contempMapClickAction(results) {
    setParams({hid: '', cid: results[0][cont_id_field]});
    document.getElementById('multiSpectralCont').style.display = 'none';
    multiSpectralStatus = 0;
    histMapPopup(histMap, results);
    loadAllInfo(MAP_TYPE, results[0]);
}


function histMapSearchAction(results, key) {
    setParams({hid: '', cid: '', hkey: key, ckey: '', cat: '', mode: 0});
    contempMap.currentResults = [];
    contempMap.searchResults = results;
    contempMap.setSearchBox();
    contempMap.reload(contempMap.totalResults);
    contempMap.centerMapOnResults(results)
}

function contempMapSearchAction(results, key) {
    setParams({hid: '', cid: '', hkey: '', ckey: key, cat: '', mode: 0});
    histMapClear(histMap);
    // reloadMaps(results);
    histMap.reload(histMap.totalResults);
    histMap.centerMapOnResults(results);
}


function histMapFilterAction(results, cat) {
    setParams({hid: '', cid: '', hkey: '', ckey: '', cat: cat, mode: 0});
    contempMapClear(contempMap);
    reloadMaps(results);
}


function changeDisplayAction(dis) {
    setParams({dis: dis});
}

function changeModeAction(mode) {
    setParams({mode: mode});
    if (mode == 1 && histMap.currentResults.length) histMap.reload(histMap.currentResults, histMap.currentResults[0][hist_id_field]);
    else if (mode == 0) {
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
    document.getElementById('multiSpectralCont').style.display = 'none';
    multiSpectralStatus = 0;
}

function visResetAction() {
    histMap.reload(histMap.totalResults);
}

function reloadMaps(results) {
    histMap.searchResults = results;
    contempMap.searchResults = results;
    histMap.reload(results, hid);
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
    if (video) histMap.videoBtn.click();
}

function multiSpectralChooseMapAction(zoomifyPath) {
    // draggable.body.innerHTML = '';
    // while (draggable.body.childNodes.length > 1) draggable.body.removeChild(draggable.body.lastChild);
    multiSpectralDraggable.innerHTML = '';

    draggable.container.style.display = 'block';
    var layer = new ol.layer.Tile({
        source: new ol.source.Zoomify({
            url: zoomifyPath,
            size: [7300, 7087],
        })
    });

    var histMap = new ol.Map({
        layers: [layer],
        target: 'multispectralDraggable',
        view: new ol.View({
            projection: new ol.proj.Projection({
                code: 'ZOOMIFY',
                units: 'pixels',
                extent: [0, -7087, 7300, 0]
            }),
            center: [7300 / 2, -7087 / 2],
            zoom: 0,
            extent: [0, -7087, 7300, 0]
        })
    });

}

function videoAction() {
    setParams({video: 1});
    document.getElementById('hist_map_container').style.display = 'none';
    document.getElementById('videoCont').style.display = 'block';
    loadAllInfo(MAP_TYPE + '_v')
}

function createVideoBtn() {
    var icon = document.createElement('img');
    icon.src = `Images/icons/return.png`;
    var btn = document.createElement('button');
    btn.appendChild(icon);

    btn.addEventListener('click', function () {
        setParams({video: 0});
        document.getElementById('videoCont').style.display = 'none';
        document.getElementById('hist_map_container').style.display = 'block';
        if (histMap.mode === 0) loadAllInfo(MAP_TYPE + '_d');
        else loadAllInfo(MAP_TYPE);
    });
    var element = document.createElement('div');
    element.className = 'video-btn tooltip';
    element.append(btn);
    return element;
}

function multiSpectralAction() {
    if (multiSpectralStatus) {
        document.getElementById('multiSpectralCont').style.display = 'none';
        loadAllInfo(MAP_TYPE);
    } else {
        document.getElementById('multiSpectralCont').style.display = 'block';
        loadAllInfo('fm_spec');
    }
    multiSpectralStatus = 1 - multiSpectralStatus;

    if (multiSpectral) return;
    multiSpectral = new MultiSpectral('multiSpectral', 'Visible.jpg', 'Infrared.jpg',
        'Tangential.jpg', 'Ultraviolet.jpg', multiSpectralChooseMapAction);
    document.getElementById('multiSpectralCont').appendChild(createMultiSpectralBtn('Back to map explorer', 'return.png'));
}


function createMultiSpectralBtn(text, img) {
    var icon = document.createElement('img');
    icon.src = `Images/icons/${img}`;
    var btn = document.createElement('button');
    btn.appendChild(icon);
    btn.addEventListener('click', function () {
        multiSpectralAction();
    });
    var elementTooltip = document.createElement('span');
    elementTooltip.className = 'tooltiptext tooltip-left tooltip-bottom';
    elementTooltip.innerText = text;
    var element = document.createElement('div');
    element.className = 'ol-control tooltip';
    element.style.bottom = 'calc(2% + 80px)';
    element.style.left = '2%';
    element.append(btn, elementTooltip);
    return element;
}

const MAP_TYPE = "fm",
    hist_map_fields = FIELDS[MAP_TYPE],
    cont_map_fields = FIELDS.osm,
    hist_id_field = hist_map_fields.hist_id,
    hist_categories_field = hist_map_fields.hist_categories,
    cont_id_field = cont_map_fields.cont_id,
    cont_place_name_field = cont_map_fields.cont_place_name,
    cont_place_name_split_field = cont_map_fields.cont_place_name_split,
    cont_country_field = cont_map_fields.cont_country;

const urlParams = new URLSearchParams(window.location.search);
const cat = urlParams.get('cat');
const hkey = urlParams.get('hkey');
const ckey = urlParams.get('ckey');
const hid = urlParams.get('hid');
const cid = urlParams.get('cid');
const dis = urlParams.get('dis');
const mode = urlParams.get('mode');
const video = urlParams.get('video') ? parseInt(urlParams.get('video')) : 0;
const vis = urlParams.get('vis');
const coun_id = urlParams.get('coun_id');


var visualization, multiSpectral, multiSpectralStatus = 0, multiSpectralDraggable = document.createElement('div');

var histMap = new FraMauroMap('hist_map_container', `${DOMAIN}/Zoomify/Fra_Mauro_Map_Zoomify/`, [], histMapClickAction,
    histMapSearchAction, histMapFilterAction, changeDisplayAction, [22110, 22110], MAP_TYPE, dis);
histMap.setSearchBox(hkey);
histMap.setFilter(cat);
histMap.fm_init(videoAction, multiSpectralAction);

var contempMap = new ContempMap('cont_map_container', MAP_TYPE, [], contempMapClickAction,
    contempMapSearchAction, null, null, null, vis);
contempMap.setSearchBox(ckey);

var suggestModal = new SuggestModal(MAP_TYPE, 'suggestModal', 'modalBody', 'modalClose');

var draggable = new Draggable(document.getElementById('draggable'));
draggable.body.appendChild(multiSpectralDraggable)
multiSpectralDraggable.id = 'multispectralDraggable';

const videoCont = document.getElementById('videoCont');

videoCont.innerHTML = '<video width="100%" style="position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);" id="videoId" poster="Images/fra_mauro/fra-mauro-video.png" controls><source src="FraMauro.mp4" type="video/mp4"></video>'
videoCont.appendChild(createVideoBtn());
videoCont.style.display = 'none';

// loadAllInfo(MAP_TYPE);
tabLoading();

getRequest(`${DOMAIN}/controller/searchMap.php`, {map: MAP_TYPE}, response => pageHandle(JSON.parse(response).results));