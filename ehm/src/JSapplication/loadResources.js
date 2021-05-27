import {
    EHM, WIKIPEDIA, EXTERNAL_RESOURCES, POST_PAGES, NOTIDENTIFIED, MAP_NAME, POST_FOOTER, FIELDS, KEYWORDS, BING
} from "./config.js";
import {getRequest} from "./httpRequest.js";
import {ResourcesMashup} from "./ClassResourcesMashup.js";
import {TextPopup} from "./ClassTextPopup.js";
import {Citation} from "./ClassCitation.js";
import {allApps} from "./config.js";

var page_name,
    mashup,
    citation,

    cont_map_fields = FIELDS.osm,
    fields,

    cont_background_field = cont_map_fields.cont_background,
    cont_place_name_field = cont_map_fields.cont_place_name,
    cont_place_name_split_field = cont_map_fields.cont_place_name_split,
    cont_post_id_field = cont_map_fields.cont_post_id,
    cont_resources_field = cont_map_fields.cont_resources,
    cont_wiki_url_field = cont_map_fields.cont_wiki_url,

    hist_categories_field,
    hist_id_field,
    hist_place_name_field,
    hist_cartouche_title_field,
    hist_cartouche_eng_field,
    hist_folio_field,
    hist_type_field,

    hist_post_id_field,
    hist_cartouche_origin_11_field,
    hist_cartouche_man_11_field,
    hist_cartouche_eng_06_field,
    hist_note_06_field,
    hist_note_man_06_field,
    hist_other_note_field,

    hist_cartouche_origin_field,
    hist_cartouche_it_field,
    hist_wiki_url_field,
    hist_keyword_field,
    hist_p_comment_field,
    hist_d_comment_field,
    hist_h_comment_field,
    hist_comment_field,
    hist_caption_field,
    hist_content_field,
    hist_citation_field,
    hist_done_by_field,
    hist_reference_field,
    hist_text_en_field,
    hist_text_cn_field,
    hist_text_cn_ori_field,
    hist_footnote_field,

    post_id_field,
    post_title_field,
    post_urls_field,
    post_type_field,
    post_credit_field,
    post_credit_extra_info_field,
    post_wiki_url_field
;

function assignFields(map_type) {
    fields = FIELDS[map_type];
    hist_categories_field = fields.hist_categories;
    hist_id_field = fields.hist_id;
    hist_wiki_url_field = fields.hist_wiki_url;
    hist_cartouche_title_field = fields.hist_cartouche_title;

    if (map_type === 'fm') {
        hist_post_id_field = fields.hist_post_id;
        hist_place_name_field = fields.hist_place_name;
        hist_cartouche_origin_11_field = fields.hist_cartouche_origin_11;
        hist_cartouche_man_11_field = fields.hist_cartouche_man_11;
        hist_cartouche_eng_06_field = fields.hist_cartouche_eng_06;
        hist_note_06_field = fields.hist_note_06;
        hist_other_note_field = fields.hist_other_note;
        hist_note_man_06_field = fields.hist_note_man_06;
    } else if (map_type === 'gm') {
        hist_place_name_field = fields.hist_place_name;
        hist_cartouche_origin_field = fields.hist_cartouche_origin;
        hist_cartouche_it_field = fields.hist_cartouche_it;
    } else if (map_type === 'fgm') {
        hist_place_name_field = fields.hist_name;
        hist_cartouche_origin_field = fields.hist_text_ori;
        hist_cartouche_eng_field = fields.hist_text_en;
        hist_folio_field = fields.hist_folio;
        hist_type_field = fields.hist_type;
    } else if (map_type === 'imola') {
        hist_place_name_field = fields.hist_name;
        hist_caption_field = fields.hist_caption;
        hist_content_field = fields.hist_content;
        hist_folio_field = fields.hist_folio;
        hist_type_field = fields.hist_type;
    } else if (map_type.includes('sinai')) {
        hist_id_field = fields.hist_id;
        hist_place_name_field = fields.hist_name;
        hist_cartouche_origin_field = fields.hist_transcript_ori;
        hist_cartouche_eng_field = fields.hist_transcript_en;
        hist_type_field = fields.hist_layer;
        hist_keyword_field = fields.hist_keyword;
        // hist_d_keyword_field = fields.hist_d_keyword;
        hist_p_comment_field = fields.hist_p_comment;
        hist_comment_field = fields.hist_comment;
        hist_d_comment_field = fields.hist_d_comment;
        hist_h_comment_field = fields.hist_h_comment;
    } else if (map_type === 'aem') {
        hist_post_id_field = fields.hist_post_id;
        hist_place_name_field = fields.hist_place_name;
        hist_cartouche_origin_11_field = fields.hist_cartouche_origin_11;
        hist_cartouche_eng_06_field = fields.hist_cartouche_eng_06;
        hist_note_06_field = fields.hist_note_06;
        hist_other_note_field = fields.hist_other_note;

        // var hist_place_name1_field = hist_map_fields.hist_place_name;
        hist_cartouche_origin_field = fields.hist_cartouche_origin;
        hist_cartouche_it_field = fields.hist_cartouche_it;
    } else if (map_type === 'bosch') {
        hist_place_name_field = fields.hist_place_name;
        hist_citation_field = fields.hist_citation;
        hist_done_by_field = fields.hist_done_by;
        hist_reference_field = fields.hist_reference;
        hist_keyword_field = fields.hist_keyword;
    } else if (map_type === 'maokun') {
        hist_place_name_field = fields.hist_place_name;
        hist_text_en_field = fields.hist_text_en;
        hist_text_cn_field = fields.hist_text_cn;
        hist_text_cn_ori_field = fields.hist_text_cn_ori;
        hist_footnote_field = fields.hist_footnote;
        hist_comment_field = fields.hist_comment;

        hist_categories_field = fields.hist_categories;
    } else {
        post_id_field = fields.post_id;
        post_title_field = fields.post_title;
        post_urls_field = fields.post_urls;
        post_type_field = fields.post_type;
        post_credit_field = fields.post_credit;
        post_credit_extra_info_field = fields.post_credit_extra_info;
        post_wiki_url_field = fields.post_wiki_url;
    }
}

export function loadAllInfo(map_type, result, identified = true) {
    loadHistInfo(map_type, result);
    loadContempInfo(map_type, result, identified);
}

export function loadHistInfo(map_type, result, creditCont) {
    assignFields(map_type);
    loadCredit(map_type, result, creditCont);
    loadEHMInfo(map_type, result);
}

export function loadCredit(map_type, result, cont) {
    if (!cont) cont = document.getElementById('cartouche_info');
    cont.scrollTop = 0;
    if (hist_id_field) hist_id_field = isString(hist_id_field) ? hist_id_field : hist_id_field.fm;
    var hid = result ? result[hist_id_field] || result[post_id_field] : null;
    var cont_title = result ? result[cont_place_name_field] : null;
    var credit, hist_title;

    if (map_type === 'fm') [credit, hist_title] = loadFMCartouche(map_type, result);
    else if (map_type === 'gm') [credit, hist_title] = loadGMCartouche(map_type, result);
    else if (map_type === 'fgm') [credit, hist_title] = loadFGMCartouche(map_type, result);
    else if (map_type === 'imola') [credit, hist_title] = loadImolaCartouche(map_type, result);
    else if (map_type === 'bosch') [credit, hist_title] = loadBoschCartouche(map_type, result);
    else if (map_type.includes('sinai')) [credit, hist_title] = loadSinaiCartouche(map_type, result);
    else if (map_type === 'maokun') [credit, hist_title] = loadMaoKunCartouche(map_type, result);
    else if (map_type === 'aem') {
        if (hid) hid = isString(hid) ? hid : hid.fm
        if (result) {
            let [fm_credit, fm_title] = loadFMCartouche(map_type, result),
                [gm_credit, _] = loadGMCartouche(map_type, result);
            fm_credit = fm_credit ? `<div><div class="cartouche-map">Fra Mauro's World Map (1460 CE):</div>${fm_credit}</div>` : "";
            gm_credit = gm_credit ? `<div><div class="cartouche-map">Genoese World Map (1457 CE):</div>${gm_credit}</div>` : "";
            credit = (fm_credit && gm_credit) ? fm_credit + "<hr>" + gm_credit : (fm_credit || gm_credit);
            hist_title = fm_title;
        }
    } else if (POST_PAGES.includes(map_type)) [credit, hist_title] = loadPostCartouche(map_type, result);
    else if (map_type === 'collab') {
        let keyword = encodeURI(result ? result[post_title_field] : KEYWORDS.collab);
        credit = `<iframe src='${BING.search(keyword.toLowerCase())}'></iframe>`;
    }

    if (!credit) {
        changeCartoucheToMap(map_type);
        getRequest(`controller/getCredit.php`, {name: map_type}, res => {
            res = JSON.parse(res);
            cont.innerHTML = `<p style='text-align: center;font-size: large;font-weight: bold'>${res.title}</p>${res.content}`;
            new TextPopup(cont);
            if (allApps.find(a => a.code == res.name_short)) {
                let title = res.title.replace(/<[^>]*>?/gm, '');
                document.getElementById('pageTitle').innerHTML = document.title = page_name = title;
            }
            if (map_type.includes("_")) {
                hist_title = res.title;
                createCitation(true);
            } else createCitation(false);
        });
    } else {
        changeMapToCartouche();
        cont.innerHTML = credit;
        new TextPopup(cont);
        if (!page_name) {
            getRequest(`controller/getCredit.php`, {name: map_type}, res => {
                res = JSON.parse(res);
                if (res) {
                    if (allApps.find(a => a.code == res.name_short)) {
                        let title = res.title.replace(/<[^>]*>?/gm, '');
                        document.getElementById('pageTitle').innerHTML = document.title = page_name = title;
                    }
                }

                createCitation(true);
            });
        } else createCitation(true);
    }


    function createCitation(isItem) {
        if (map_type === 'collab') return;
        if (!citation) citation = new Citation(cont, page_name);
        citation.reload(map_type, hist_title, cont_title, isItem);
    }
}

export function loadContempInfo(map_type, result = null, identified = true) {
    if (map_type === 'collab') {
        var place_name_encoded = result ? result[post_title_field] : null;
        var place_name_split = result ? result[post_title_field] : null;
    } else if (map_type.includes('sinai')) {
        place_name_encoded = result ? result[hist_keyword_field] : null;
        place_name_split = result ? result[hist_keyword_field] : null;
    } else if (map_type === 'bosch') {
        place_name_encoded = result ? result[hist_place_name_field] : null;
        place_name_split = result ? result[hist_keyword_field] : null;
    } else {
        place_name_encoded = result ? (result[cont_place_name_field] ? encodeURI(result[cont_place_name_field]) : result[post_title_field]) : null;
        place_name_split = result ? (result[cont_place_name_split_field] ? result[cont_place_name_split_field] : (result[post_title_field] ? result[post_title_field] : result[hist_place_name_field])) : null;
    }
    var wiki_url = result ? result[hist_wiki_url_field] ? result[hist_wiki_url_field] : result[post_wiki_url_field] ? result[post_wiki_url_field] : result[cont_wiki_url_field] : null;
    loadWikipediaInfo(map_type, wiki_url, place_name_encoded, identified);
    loadResourcesMashup(map_type, place_name_split);
    // loadExternalInfo(map_type, place_name_encoded, identified);
    // loadPlaceNameFooter(map_type, place_name_encoded);
}


export function loadExternalInfo(map_type, place_name_encoded, identified = true) {
    for (let i = 0; i < EXTERNAL_RESOURCES.length; i++) {
        let resource = EXTERNAL_RESOURCES[i];
        if (place_name_encoded) var url = resource.search(place_name_encoded);
        else if (identified) url = KEYWORDS.hasOwnProperty(map_type) ? resource.search(KEYWORDS[map_type]) : resource.default;
        else url = resource.hasOwnProperty(map_type) ? resource[map_type] : resource.default;
        document.getElementById(resource.container).href = url;
    }
}

function changeCartoucheToMap(map_type) {
    var cartoucheBtn = document.getElementById('cartouche_btn');
    if (cartoucheBtn) cartoucheBtn.innerText = MAP_NAME[map_type];
}

function changeMapToCartouche() {
    var cartoucheBtn = document.getElementById('cartouche_btn');
    if (cartoucheBtn) cartoucheBtn.innerText = 'Selected item';
}

function isString(value) {
    return (value instanceof String || typeof value === 'string')
}

function loadFMCartouche(map_type, result) {
    if (!result) return [null, null];
    var fm_place_name_field = isString(hist_place_name_field) ? hist_place_name_field : hist_place_name_field.fm,
        fm_cartouche_title_field = isString(hist_cartouche_title_field) ? hist_cartouche_title_field : hist_cartouche_title_field.fm,
        html = "",
        hist_place_name = result ? (result[fm_cartouche_title_field] ? result[fm_cartouche_title_field] : result[fm_place_name_field]) : null,
        cartouche_origin_11 = result ? result[hist_cartouche_origin_11_field] : null,
        cartouche_man_11 = result ? result[hist_cartouche_man_11_field] : null,
        cartouche_eng_06 = result ? result[hist_cartouche_eng_06_field] : null,
        note_06 = result ? result[hist_note_06_field] : null,
        note_man_06 = result ? result[hist_note_man_06_field] : null,
        other_note = result ? result[hist_other_note_field] : null,
        categories = result ? result[hist_categories_field] : null,
        category_list = categories ? categories.split("|") : [],
        isShip = category_list.includes('ship') && category_list.includes('animation');

    // if(!(hist_place_name || cartouche_origin_11 || cartouche_eng_06 || note_06)) return "";

    if (hist_place_name) html += `<p style="text-align: center; font-size: large"><b>${hist_place_name}</b></p>`;
    if (isShip) html += "<p>This ship belongs to the following group of the eight groups in which Mauro Bondioli has tentatively classified the fifty three ships depicted on the Fra Mauro’s <i>mappa mundi</i>. These eight naval groups constitute a collection of considerable historical value. In fact, Fra Mauro succeeded in making an atlas that, although of modest absolute dimension (fifty three ships), perhaps, represents for its time an absolute primacy in naval iconography. The idea of a naval atlas was indeed taken up by the historians only several centuries later. This merit has to be added to the Fra Mauro’s map.</p>";

    if (hist_place_name || cartouche_origin_11 || cartouche_eng_06 || note_06) {
        if ((cartouche_origin_11 || hist_place_name) && cartouche_eng_06) {
            let cartouche_origin = cartouche_origin_11 ? cartouche_origin_11 : hist_place_name;
            let cartouche_origin_html = cartouche_origin ? `<i>" ${cartouche_origin} "</i>` : "";
            let cartouche_eng_html = cartouche_eng_06 ? "<br><br>" + cartouche_eng_06 : "";
            let cartouche_man_html = cartouche_man_11 ? "<br><br>" + cartouche_man_11 : "";
            html += `<p><b>Cartouche (Falchetta 2011):</b><br>${cartouche_origin_html}${cartouche_eng_html}${cartouche_man_html}</p>`;
        }
    }
    if (note_06) {
        let note_intro = isShip ? "Note (Bondioli 2019):" : "Note (Falchetta 2006):";
        let note_man_html = note_man_06 ? "<br><br>" + note_man_06 : "";
        html += `<p><b>${note_intro}</b><br>${note_06}${note_man_html}</p>`;
    }
    if (other_note) html += `<p><b>Other notes:</b><br>${other_note}</p>`;
    html += POST_FOOTER(isShip ? 'ship' : 'fm');
    changeMapToCartouche();

    return [html, hist_place_name];
}


function loadGMCartouche(map_type, result) {
    var gm_place_name_field = isString(hist_place_name_field) ? hist_place_name_field : hist_place_name_field.gm;

    var hist_place_name = result ? result[gm_place_name_field] : null,
        cartouche_origin = result ? result[hist_cartouche_origin_field] : null,
        cartouche_it = result ? result[hist_cartouche_it_field] : null;
    var html = "";
    if (hist_place_name || cartouche_origin || cartouche_it) {
        if (hist_place_name) html += `<p style="text-align: center; font-size: large"><b>${hist_place_name}</b></p>`;


        if (cartouche_origin || cartouche_it) {
            html += "<p><div><b>Cartouche:</b></div>";
            if (cartouche_origin) html += `<div><i>" ${cartouche_origin} "</i></div><br>`;
            if (cartouche_it) html += `<div>${cartouche_it}</div>`;
            html += "</p>";
        }
        html += `<br>${POST_FOOTER('gm')}`;
        changeMapToCartouche();
    }
    return [html, hist_place_name];
}

function loadFGMCartouche(map_type, result) {
    var page = new URLSearchParams(window.location.search).get('page') || 1;
    var title = result ? result[hist_place_name_field] : null,
        text_ori = result ? result[hist_cartouche_origin_field] : null,
        text_en = result ? result[hist_cartouche_eng_field] : null,
        folio = result ? result[hist_folio_field] : null,
        type = result ? result[hist_type_field] : null;
    var html = "";
    if (title || text_ori || text_en) {
        if (title) html += `<p style="text-align: center; font-size: large"><b>${title}</b></p>`;
        if (text_ori || text_en) {
            let text_ori_html = text_ori ? `<p><i>${text_ori}</i></p>` : "";
            let text_en_html = text_en ? `<p>${text_en}</p>` : "";

            html += `<p>${text_ori_html}<br>${text_en_html}</p>`;
        }
        html += `<br>${POST_FOOTER('fgm', null, page, folio, type)}`;
        changeMapToCartouche();
    }
    return [html, title];
}

function loadBoschCartouche(map_type, result) {
    if (!result) return [];
    var title = result ? result[hist_place_name_field] : null,
        references = result ? result[hist_reference_field].split("|") : null,
        citations = result ? result[hist_citation_field].split("|") : null,
        done_bys = result ? result[hist_done_by_field].split("|") : null;
    var html = "";
    if (title || references || citations || done_bys) {
        if (title) html += `<p style="text-align: center; font-size: large"><b>${title}</b></p>`;
        for (let i = 0; i < citations.length; i++) {
            let citation = citations[i],
                reference = references[i],
                done_by = done_bys[i];
            let donebyHtml = done_by ? `<p><b>Interpretation by:</b> ${done_by}</p>` : "";
            let citationHtml = citation ? `<p>Citation:<br>${citation}</p>` : "";
            let referenceHtml = reference ? `<p>References provided by the author of this interpretation:<br>${reference}</p>` : "";
            html += `<div>${donebyHtml}${citationHtml}${referenceHtml}</div><br>`;
        }
    }
    html += `<br>${POST_FOOTER(map_type)}`;
    changeMapToCartouche();

    return [html, title];
}

function loadImolaCartouche(map_type, result) {
    var title = result ? result[hist_place_name_field] : null,
        caption = result ? result[hist_caption_field] : null,
        content = result ? result[hist_content_field] : null;
    var html = "";
    if (title || caption || content) {
        if (title) html += `<p style="text-align: center; font-size: large"><b>${title}</b></p>`;
        if (caption) html += `<p>${caption}</p>`;
        if (content) html += `<br><p><b>Andrea Ferri's Bibliography (1999):</b></p><p>${content}</p>`;
        html += `<br>${POST_FOOTER(map_type)}`;
        changeMapToCartouche();
    }
    return [html, title];
}

function loadSinaiCartouche(map_type, result) {
    var title = result ? result[hist_place_name_field] : null,
        transcript_ori = result ? result[hist_cartouche_origin_field] : null,
        transcript_en = result ? result[hist_cartouche_eng_field] : null,
        p_comment = hist_p_comment_field ? result ? result[hist_p_comment_field] : null : null,
        d_comment = result ? result[hist_d_comment_field] : null,
        h_comment = result ? result[hist_h_comment_field] : null,
        hist_id = result ? result[hist_id_field] : null;
    var html = "";
    if (title || transcript_ori || transcript_en) {
        if (title) html += `<p style="text-align: center; font-size: large"><b>${title}</b></p>`;
        if (transcript_ori) html += `<p><b>Edition:</b></p><p>${transcript_ori}</p><br>`;
        if (transcript_en) html += `<p><b>English translation:</b></p><p>${transcript_en}</p><br>`;
        if (p_comment) html += `<p><b>Commentary - Palaeography:</b></p><p>${p_comment}</p><br>`;
        if (h_comment) html += `<p><b>Commentary - History:</b></p><p>${h_comment}</p><br>`;
        if (d_comment) html += `<p><b>Commentary - Diplomatics:</b></p><p>${d_comment}</p><br>`;

        html += `<br>${POST_FOOTER(map_type, null, null, null, null, hist_id)}`;
        changeMapToCartouche();
    }
    return [html, title];
}

function loadPostCartouche(map_type, result) {
    var html = "";
    var title = result ? result[post_title_field] : null;
    if (result) {
        html += `<p style="text-align: center; font-size: large"><b>${title}</b></p>`;
        if (result[post_credit_field]) html += result[post_credit_field];
        if (map_type === 'vis') html += result[post_urls_field];
        else if (result[post_urls_field]) {
            result[post_urls_field].split("|").forEach(url => {
                if (url.match(/\.(jpeg|jpg|gif|png)$/)) html += `<img src="${url}" alt=""/>`;
                else if (url) html += `<iframe src="${url}"></iframe>`;
            });
        }
        if (map_type === 'ae') map_type = result[post_type_field].replace("gen|", "");
        html += POST_FOOTER(map_type, result[post_credit_extra_info_field]);
    }
    return [html, title];
}

function loadMaoKunCartouche(map_type, result) {
    var html = "";
    var title = result ? result[hist_place_name_field] : null;
    if (result) {
        html += `<p style="text-align: center; font-size: large"><b>${title}</b></p>`;
        if (result[hist_text_cn_ori_field]) {
            html += `<p><b>Text-Wǔbèi Zhì</b></p><p>${result[hist_text_cn_ori_field]}</p>`;
        }
        if (result[hist_text_cn_field]) {
            html += `<p><b>Text-Simplified Chinese</b></p><p>${result[hist_text_cn_field]}</p>`;
        }
        if (result[hist_text_en_field]) {
            html += `<p><b>Text-EN-Mills 1970</b></p><p>${result[hist_text_en_field]}</p>`;
        }
        if (result[hist_footnote_field]) {
            html += `<p><b>Footnotes-Mills 1970</b></p><p>${result[hist_footnote_field]}</p>`;
        }
        if (result[hist_comment_field]) {
            html += `<p><b>Other comments</b></p><p>${result[hist_comment_field]}</p>`;
        }
        html += POST_FOOTER(map_type, result[hist_text_en_field]);
    }
    return [html, title];
}


function loadEHMInfo(map_type, result) {
    let hist_post_id = result ? result[hist_post_id_field] : null;
    if (hist_post_id) {
        var post_id_list = hist_post_id ? hist_post_id.split(";") : [];
        // var cont_post_id_list = cont_post_id ? cont_post_id.split(";") : [];
        // var post_id_list = cont_post_id_list.concat(hist_post_id_list);
        if (post_id_list.length > 1) {
            var post_ids = post_id_list.join(";");
            var url = EHM.ids(post_ids);
        } else url = EHM.id(post_id_list[0]);
    } else url = EHM.default;
    var ehmInfo = document.getElementById("ehm_info")
    if (ehmInfo) ehmInfo.innerHTML = url ? `<iframe src="${url}"></iframe>` : "Not available";
}


export function loadWikipediaInfo(map_type, wiki_url = null, place_name_encoded = null, identified = true) {
    if (wiki_url) {
        if (!wiki_url.includes(".m.wikipedia")) wiki_url = wiki_url.replace('.wikipedia', '.m.wikipedia');
    } else {
        if (place_name_encoded) wiki_url = WIKIPEDIA.search(place_name_encoded);
        else if (!identified) wiki_url = NOTIDENTIFIED;
        else if (WIKIPEDIA.hasOwnProperty(map_type)) wiki_url = WIKIPEDIA[map_type];
        else wiki_url = WIKIPEDIA.default;
    }
    document.getElementById(WIKIPEDIA.container).innerHTML = `<iframe src='${wiki_url}'></iframe>`;
}


export function loadPlaceNameFooter(map_type, place_name_encoded) {
    let place_name = place_name_encoded ? decodeURI(place_name_encoded) : MAP_NAME[map_type];
    if (!place_name) var footerText = "The <i><b>EHM aggregation app</b></i> brings together the EHM database and a mashup of the following resources:";
    else footerText = `For further information on <i><b>${place_name}</b></i>, browse the below databases that cannot be integrated in the Multimodal Resources Mashup, yet:`;
    document.getElementById("place_name_footer").innerHTML = footerText;
}


export function loadResourcesMashup(map_type, place_name_split) {
    if (!mashup) mashup = new ResourcesMashup('mashup', map_type, place_name_split);
    else mashup.reload(map_type, place_name_split);
}