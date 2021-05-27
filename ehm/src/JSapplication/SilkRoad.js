import {CENTER, FIELDS} from "./config.js";
import {getRequest, setParams} from "./httpRequest.js";
import {loadAllInfo, loadContempInfo, loadHistInfo, loadResourcesMashup, loadWikipediaInfo} from "./loadResources.js";
import {ContempMap} from "./ClassContempMap.js";
import {tabLoading} from "./openTab.js";
import {VisPracticeTextContent} from "./ClassPracticeTextContent.js";


function postClickAction(postResult, isClicked) {
    var post_id = postResult[post_id_field];
    if (isClicked) {
        setParams({pid: post_id, cid: ''});
        loadAllInfo(MAP_TYPE, postResult)
    }
}

function loadCredit(prac) {
    var cont = document.getElementById('cartouche_info');
    cont.style.textAlign = 'unset';
    cont.scrollTop = 0;
    cont.innerHTML = '';

    var pracTitle = document.createElement('div');
    pracTitle.style = "text-align: center; font-size: large; font-weight:bold";
    pracTitle.innerHTML = prac.name;
    var pracDesc = document.createElement('div');
    pracDesc.innerHTML = prac.desc;
    cont.append(pracTitle, pracDesc);

    prac.pics.split("|").forEach(pic => {
        var pracImg = document.createElement('img');
        pracImg.src = pic;
        cont.append(pracImg);
    })

    if(pracUrl){
        var pracUrl = document.createElement('div');
        pracUrl.innerHTML = prac.url ? `<br><b>Link to website:</b> <a target="_blank" href="${prac.url}">${prac.url}</a>` : "";
        cont.append(pracUrl);
    }
}

async function contempMapPopup(results) {
    contempMap.currentResults = results;
    if (contempMap.globeMap) contempMap.globeMap.centerMapOnResults(results);

    return await contempMap.centerMapOnResults(results);
}

function pracClickAction(prac) {
    setParams({cid: '', prac_id: prac.id});

    loadCredit(prac);
    var contResults = contempMap.totalResults.filter(contResult => contResult.practice_ids.split("|").includes(prac.id));
    contempMapPopup(contResults);

    var cont_wikipedia = contResults[0] ? contResults[0][cont_wiki_url_field] : null;
    var wiki_url = prac.wikipedia || cont_wikipedia;
    loadWikipediaInfo(MAP_TYPE, wiki_url, prac.name);
    loadResourcesMashup(MAP_TYPE, prac.name);
}

function backClickAction() {
    setParams({pid: '', cid: ''});
    textContent.navigator.filterBtn1.selectedIndex = 0;
    textContent.navigator.resetFilter2();
}

function contempMapClickAction(results) {
    var cont_id = results[0][cont_id_field];
    var place_name = results[0][cont_place_name_field];
    var practice_ids = results[0] ? results[0].practice_ids.split("|") : [];
    var cont_wikipedia = results[0] ? results[0][cont_wiki_url_field] : null;
    setParams({pid: '', cid: cont_id});

    textContent.showSearchResults({cid: cont_id}, place_name);
    var prac = textContent.practices.find(p => practice_ids.includes(p.id));

    var wiki_url = prac.wikipedia || cont_wikipedia;

    loadCredit(prac);
    loadWikipediaInfo(MAP_TYPE, wiki_url, prac.name);
    loadResourcesMashup(MAP_TYPE, prac.name);

    setTimeout(function () {
        let pracEle = document.getElementById(`prac-${practice_ids[0]}`);
        if (pracEle) pracEle.scrollIntoView();
    }, 4000)
}

function contempMapSearchAction(results) {
    closeAllPopups();
    reloadMaps(results);
}

function loadBing(keyword) {
    document.getElementById('cont_map_container').innerHTML = `<iframe src='https://www.bing.com/images/search?q=%22${keyword}%22'></iframe>`;
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

const MAP_TYPE = 'sr',
    post_map_fields = FIELDS[MAP_TYPE],
    post_id_field = post_map_fields.post_id,
    post_title_field = post_map_fields.post_title,

    cont_map_fields = FIELDS.osm,
    cont_id_field = cont_map_fields.cont_id,
    cont_place_name_field = cont_map_fields.cont_place_name,
    cont_wiki_url_field = cont_map_fields.cont_wiki_url,
    cont_place_name_split_field = cont_map_fields.cont_place_name_split,
    cont_country_field = cont_map_fields.cont_country,

    fieldType = CENTER.hasOwnProperty(MAP_TYPE) ? MAP_TYPE : 'default',
    initialCenter = CENTER[fieldType].initialCenter,
    initialLayer = CENTER[fieldType].initialLayer,
    maxClusterLayer = CENTER[fieldType].maxClusterLayer;

const urlParams = new URLSearchParams(window.location.search),
    pid = urlParams.get('pid'),
    prac_id = urlParams.get('prac_id'),
    cid = urlParams.get('cid'),
    ckey = urlParams.get('ckey'),
    mode = urlParams.get('mode'),
    vis = urlParams.get('vis');

var practices;

var contempMap = new ContempMap('cont_map_container', MAP_TYPE, [], contempMapClickAction,
    contempMapSearchAction, maxClusterLayer, initialLayer, initialCenter, vis);
contempMap.setSearchBox(ckey);
tabLoading();

var textContent = new VisPracticeTextContent('text_content_container', MAP_TYPE, postClickAction, backClickAction);
loadAllInfo(MAP_TYPE);
if (pid) setTimeout(() => textContent.loadFullPost(pid, MAP_TYPE, null,prac_id), 1000);


getRequest("controller/getWebPractices.php", {type: MAP_TYPE}, (response) => {
    response = JSON.parse(response);
    practices = response;
    textContent.vis_init(practices, pracClickAction);
})

getRequest('controller/searchMap.php', {map: "cont|" + MAP_TYPE}, response => {
    response = JSON.parse(response);
    contempMap.totalResults = response.results;
    initialLoad(response.results);
    // visualization = new Visualization('visualization_container', MAP_TYPE, response.results, visClickAction, visResetAction);
});