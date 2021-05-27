import {loadAllInfo} from "./loadResources.js";
import {tabLoading} from "./openTab.js";
import {getRequest, setParams} from "./httpRequest.js";
import {DOMAIN, FIELDS} from "./config.js";
import {Visualization} from "./ClassVisualization.js";
import {histMapPopup, histMapClear, contempMapClear} from "./mapFunctions.js";
import {FgmMap} from "./ClassFGM.js";
import * as THREE from "./three.js/build/three.module.js";
import {OrbitControls} from "./three.js/examples/jsm/controls/OrbitControls.js";
import {OBJLoader2} from "./three.js/examples/jsm/loaders/OBJLoader2.js";
import {Draggable} from "./ClassDraggable.js";

// function load3DObject(hist_id){
//     var canvas = object3DCanvas;
//
//     canvas.innerHTML = '';
//     draggable.container.style.display = 'block';
//
//     const renderer = new THREE.WebGLRenderer({canvas});
//
//     const fov = 20;
//     const aspect = 2;
//     const near = 0.1;
//     const far = 100;
//     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     camera.position.set(0, 10, 20);
//
//     const controls = new OrbitControls(camera, canvas);
//     controls.target.set(0, 2, 0);
//     controls.update();
//
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color('lightgrey');
//
//     {
//         const skyColor = 0xB1E1FF;  // light blue
//         const groundColor = 0xB97A20;  // brownish orange
//         const intensity = 1;
//         const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
//         scene.add(light);
//     }
//
//     {
//         const color = 0xFFFFFF;
//         const intensity = 1;
//         const light = new THREE.DirectionalLight(color, intensity);
//         light.position.set(0, 10, 0);
//         light.target.position.set(-5, 0, 0);
//         scene.add(light);
//         scene.add(light.target);
//     }
//
//     {
//         const objLoader = new OBJLoader2();
//         objLoader.load(`3D/FGM/${hist_id}.obj`, (root) => {
//             scene.add(root);
//         });
//     }
//
//     function resizeRendererToDisplaySize(renderer) {
//         const canvas = renderer.domElement;
//         const width = canvas.clientWidth;
//         const height = canvas.clientHeight;
//         const needResize = canvas.width !== width || canvas.height !== height;
//         if (needResize) {
//             renderer.setSize(width, height, false);
//         }
//         return needResize;
//     }
//
//     function render() {
//         if (resizeRendererToDisplaySize(renderer)) {
//             const canvas = renderer.domElement;
//             camera.aspect = canvas.clientWidth / canvas.clientHeight;
//             camera.updateProjectionMatrix();
//         }
//         renderer.render(scene, camera);
//         requestAnimationFrame(render);
//     }
//     requestAnimationFrame(render);
// }

function load3DObject(hist_id){
    draggable.show();
    draggable.body.innerHTML = `<div style="width: 100%; height: 100%"><iframe src="3D/FGM/?id=${hist_id}"></iframe></div>`;
}

function histMapClickAction(result) {
    loadAllInfo(MAP_TYPE, result, true);
    // if(result[hist_type_field] === 'drawing') load3DObject(result[hist_id_field]);
}


function contempMapClickAction(results) {
    setParams({hid: '', cid: results[0][cont_id_field]});
    histMapPopup(histMap, results);
    loadAllInfo(MAP_TYPE, results[0]);
}


function histMapSearchAction(results, key) {
}

// function contempMapSearchAction(results, key) {
//     setParams({hid: '', cid: '', hkey: '', ckey: key, cat: '', mode: 0});
//     histMapClear(histMap);
// }


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

function visClickAction(data) {
    if (data.hasOwnProperty('hist_id')) var results = [data['result']];
    else if (data.hasOwnProperty('cont_id')) results = data['children'].map(item => item['result']);
    else if (data.hasOwnProperty('country_id')) results = data['children'].map(cont_item => cont_item['children'].map(hist_item => hist_item['result'])).flat();
    else return;
    histMapPopup(histMap, results);
    loadAllInfo(MAP_TYPE, results[0]);
}

function histMapChangePageAction(page) {
    setParams({page: page});
    // document.getElementById('cont_map_container').innerHTML = `<div style="width: 100%; height: 100%"><iframe src="3D/FGM/?id=${page}"></iframe></div>`;
    getRequest(`${DOMAIN}/controller/searchMap.php`, {
        map: MAP_TYPE,
        p: page
    }, response => {
        var results = JSON.parse(response).results;
        var new_results = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i],
                pages = result[hist_page_field];

            if (pages.includes("|")) {
                let page_list = pages.split("|"),
                    coords_list = result[hist_coords_field].split("|"),
                    xzoom_list = result[hist_xzoom_field].split("|"),
                    yzoom_list = result[hist_yzoom_field].split("|");
                for (let j = 0; j < page_list.length; j++) {
                    if (page_list[j] != page) continue;
                    let new_result = Object.assign({}, result);
                    new_result[hist_page_field] = page_list[j];
                    new_result[hist_coords_field] = coords_list[j];
                    new_result[hist_xzoom_field] = xzoom_list[j];
                    new_result[hist_yzoom_field] = yzoom_list[j];
                    new_results.push(new_result);
                }
            } else new_results.push(result);
        }
        results = new_results;
        histMap.totalResults = results;
        histMap.initialLoad(results, 0);
    });
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
    } else {
        results = [];
        hist_clicked = false;
        cont_clicked = false;
    }
    histMap.initialLoad(results, mode, hist_clicked);
    contempMap.initialLoad(results, mode, cont_clicked);
}

function pageHandle(totalResults) {
    histMap.totalResults = totalResults;
    contempMap.totalResults = totalResults;
    visualization = new Visualization('visualization_container', MAP_TYPE, totalResults, visClickAction);
    initialLoad(totalResults);
}

const MAP_TYPE = "fgm",
    hist_map_fields = FIELDS[MAP_TYPE],
    cont_map_fields = FIELDS.osm,
    hist_id_field = hist_map_fields.hist_id,
    hist_type_field = hist_map_fields.hist_type,
    hist_categories_field = hist_map_fields.hist_categories,
    hist_page_field = hist_map_fields.hist_page,
    hist_coords_field = hist_map_fields.hist_coords,
    hist_xzoom_field = hist_map_fields.hist_xzoom,
    hist_yzoom_field = hist_map_fields.hist_yzoom,
    cont_id_field = cont_map_fields.cont_id;


const urlParams = new URLSearchParams(window.location.search),
    cat = urlParams.get('cat'),
    hkey = urlParams.get('hkey'),
    ckey = urlParams.get('ckey'),
    hid = urlParams.get('hid'),
    cid = urlParams.get('cid'),
    dis = urlParams.get('dis'),
    mode = urlParams.get('mode'),
    page = urlParams.get('page') || 1;

var contempMap, visualization;
// object3DCont = document.createElement('div');


var histMap = new FgmMap('hist_map_container', `${DOMAIN}/Zoomify/FGM_Zoomify/${page}/`, [],
    histMapClickAction, histMapSearchAction, histMapFilterAction, changeDisplayAction,
    [5985, 3990], MAP_TYPE, dis);
histMap.distance = 0;
histMap.setSearchBox(hkey);
histMap.setFilter(cat);
histMap.fgm_int(histMapChangePageAction);
histMapChangePageAction(page);

var draggable = new Draggable(document.getElementById('draggable'));
// draggable.body.appendChild(object3DCont);

if (!hid && !cid) loadAllInfo(MAP_TYPE);
tabLoading();

document.getElementById('cont_map_container').innerHTML = `<iframe src="https://www.bing.com/images/search?q=Francesco%20di%20Giorgio%20Martini&qs=n&form=QBIR&sp=-1&pq=francesco%20digiorgio%20martini&sc=5-27&sk=&cvid=5A725A50403542808A7CA1698EDF422D"></iframe>`;