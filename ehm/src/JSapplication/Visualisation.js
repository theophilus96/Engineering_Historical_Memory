import {FIELDS, KEYWORDS} from "./config.js";
import {getRequest, setParams} from "./httpRequest.js";
import {loadAllInfo, loadContempInfo} from "./loadResources.js";
import {tabLoading} from "./openTab.js";
import {VisPracticeTextContent} from "./ClassPracticeTextContent.js";


function postClickAction(postResult) {
    var post_id = postResult[post_id_field];
    setParams({pid: post_id, cid: ''});
    loadBing(postResult[post_title_field]);
    loadContempInfo(MAP_TYPE, postResult);
}

function pracClickAction(prac) {
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

    if(prac.url){
        var pracUrl = document.createElement('div');
        pracUrl.innerHTML = `<br><b>Link to website:</b> <a target="_blank" href="${prac.url}">${prac.url}</a>`;
        cont.append(pracUrl);
    }
}

function backClickAction() {
    setParams({pid: '', cid: ''});
    textContent.navigator.filterBtn1.selectedIndex = 0;
    textContent.navigator.resetFilter2();
}

function loadBing(keyword) {
    document.getElementById('cont_map_container').innerHTML = `<iframe src='https://www.bing.com/images/search?q=%22${keyword}%22'></iframe>`;
}

const MAP_TYPE = 'vis',
    post_map_fields = FIELDS[MAP_TYPE],
    post_id_field = post_map_fields.post_id,
    post_title_field = post_map_fields.post_title;

const urlParams = new URLSearchParams(window.location.search),
    pid = urlParams.get('pid'),
    prac_id = urlParams.get('prac_id'),
    cid = urlParams.get('cid');

var practices;

var textContent = new VisPracticeTextContent('text_content_container', MAP_TYPE, postClickAction, backClickAction);

// if (!pid && !cid) loadAllInfo(MAP_TYPE);
// else if (pid) {
//     setTimeout(function () {
//         textContent.loadFullPost(pid, MAP_TYPE)
//     }, 1000);
// }

loadAllInfo(MAP_TYPE);
if (pid) setTimeout(() => textContent.loadFullPost(pid, MAP_TYPE, null, prac_id), 1000);


getRequest("controller/getWebPractices.php", {type: MAP_TYPE}, (response) => {
    response = JSON.parse(response);
    practices = response;
    textContent.vis_init(practices, pracClickAction);
})
tabLoading();
loadBing(KEYWORDS[MAP_TYPE]);