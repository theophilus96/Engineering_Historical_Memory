export const DOMAIN = window.location.hostname === 'localhost' ? `${window.location.origin}/PW` : window.location.origin;
export const NOTIDENTIFIED = 'meta/notIdentified.php';

/**
 * @return {string}
 */
export function POST_FOOTER(map, extra_info = null, page = null, folio = null, type = null, hid = null) {
    switch (map) {
        case 'fm':
            return "<p class='post-footer'><strong>Diplomatic transcription of the texts:</strong><br>© Piero Falchetta. Manuscript work. Venice, Biblioteca Nazionale Marciana, [2011].<br><br><strong>English translation of the texts</strong> by Jeremy Scott supervised by Piero Falchetta, and <strong>identification of the toponyms</strong> by Piero Falchetta, Fra Mauro's World Map. Turnhout: © Brepols Publishers, 2006, <i>ad vocem</i>.<br><br><strong>Translations from Vernacular Venetian into Mandarin:</strong> Li TinGyi, Fan Qing, Chen YuanYuan; revised by Daniele Beltrame.</p>";
        case 'gm':
            return "<p class='post-footer'><strong>Transcription of the Latin texts:</strong><br>© Angelo Cattaneo with some additions by Andrea Nanetti [2015-2017].<br><br><strong>Italian translation of the texts</strong> and <strong>identification of the toponyms</strong> by Angelo Cattaneo, Mappa Mundi 1457 (Biblioteca nazionale centrale di Firenze, Port. 1). Analisi, trascrizione e commentario. Rome: © Istituto dell’Enciclopedia Italiana, 2008, ad vocem.<br><br><strong>Translations from Italian into Mandarin:</strong> Li TinGyi, Fan Qing, Chen YuanYuan; revised by Daniele Beltrame on the base of the Latin text.<br><br><strong>Translations from Latin into English:</strong> …</p>";
        case 'gm_ni':
            return "<p class='post-footer'>Angelo Cattaneo</p>";
        case 'ship':
            return "<p class='post-footer'>Andrea Nanetti and Davide Benvenuti, Animation of two-dimensional pictorial works into multipurpose three-dimensional objects. The Atlas of the Ships of the Known World depicted in the 1460 Fra Mauro’s mappa mundi as a showcase, in «SCIRESit (SCIentific RESearch and Information Technology)», Vol. 9/2 (February 2020).</p>";
        case 'mc':
            return "<p class='post-footer'><b>Critical Edition:</b>Andrea Nanetti, <i>Il Codice Morosini: il mondo visto da Venezia (1094-1433)</i>. Edizione critica, introduzione, indice e altri apparati, 4 vols. Spoleto, © Fondazione Italiano di Studi sull’Alto Medioevo, 2010.<br><br><b>English translation of the texts:</b> The Morosini Codex, by John Melville-Jones and Michele Ghezzo. Padova: © UniPress, 1999-)</p>";
        case 'mp':
            return "<div class='post-footer'><b>Critical Edition:</b><br> Mauro Eusebi and Eugenio Burgio (eds.), Marco Polo. Le Devisement dou monde, Venezia: © Edizioni Ca’ Foscari, 2018.<br><br><b>Critical Translation into English and Commentary:</b>Marco Polo, Devisement dou Monde / The Description of the World, by Eugenio Burgio and Samuela Simion. Venezia: © Edizioni Ca’ Foscari, forthcoming<br><br>Legenda<br><table><tr><td>F</td><td>redazione francoveneta, 1298 ca.</td></tr><tr><td>Fr</td><td>redazione francese (in due varianti), 1310 ca.</td></tr><tr><td>Z</td><td>redazione latina del cod. toledano Zelada, ante 1330</td></tr><tr><td>P</td><td>redazione latina di Francesco Pipino OFP, ante 1320</td></tr><tr><td>R</td><td>Ramusio, Viaggi di messer Marco Polo, 1559</td></tr><tr><td>L</td><td>epitome latina, XIII sec.</td></tr><tr><td>V</td><td>redazione veneziana, XV sec.</td></tr><tr><td>VB</td><td>redazione veneziana, XV sec.</td></tr></table></div>";
        case 'cm':
            return "<p class='post-footer'><b>Texts and Images:</b><br>Andrea Nanetti, Atlante della Messenia Veneziana. Corone, Modone, Pilos e le loro isole/Atlas of Venetian Messenia. Coron, Modon, Pylos and their islands/Άτλας της Eνετικής Μεσσηνίας. Κορώνη, Μεθώνη, Πύλος και τα νησιά τους (1207-1500 & 1685-1715), © University of Bologna and Archivio di Stato di Venezia, Meduproject Editions and Editrice La Mandragora, Imola 2011 (Onde di Storia/Waves of History/Κύματα της Ιστορίας, 1).<br><br><b>GIS Field Work:</b> 2015-2017 Project Antica Messene (PI, Giandomenico Sergio).</p>";
        case 'gen':
            return "<p class='post-footer'><b>Critical Edition:</b>Andrea Nanetti, <i>Il Codice Morosini: il mondo visto da Venezia (1094-1433)</i>. Edizione critica, introduzione, indice e altri apparati, 4 vols. Spoleto, © Fondazione Italiano di Studi sull’Alto Medioevo, 2010.<br><br><b>English translation of the texts:</b> The Morosini Codex, by John Melville-Jones and Michele Ghezzo. Padova: © UniPress, 1999-)</p>";
        case 'ibn':
            let extra_info_html = extra_info ? `<br><br><b>Edited by ${extra_info}, supervised by Prof. Antonella Ghersetti and Dr Vicente Marti Tormo.</b>` : '';
            return `<p class='post-footer'><b>Critical Edition with French Translation:</b><br><i>Voyages d'Ibn Batoutah,</i> Texte arabe, accompagné d'une traduction, par C. Defrémery et le D<sup>r</sup> B. R. Sanguinetti, 4 vol., Paris, Imprimerie Impériale, 1853-1858, and 1859 (Index).<br><br><b>English Translation:</b><br><i>The Travels of Ibn Battuta, A.D. 1325-1354,</i> translated with revisions and notes from the Arabic text edited by C. Defrémery and B. R. Sanguinetti by H. A. R. Gibb., 5 vols. Cambridge: Published for the Hakluyt Society by the Cambridge University Press, 1958-1994, and 2000 (Index). © The Hakluyt Society.${extra_info_html}</p>`;
        case 'msl':
            return `<p class="post-footer"><b>English translation, commentary, indexes, and bibliography:</b><br>© 2005 Geoffrey Wade. National University of Singapore Press.<br><a target="_blank" href="http://epress.nus.edu.sg/msl/ming-shi-lu-source-study-southeast-asian-history">http://epress.nus.edu.sg/msl/ming-shi-lu-source-study-southeast-asian-history</a></p>`;
        case 'fgm':
            if (type === 'paragraph' || type === 'leonardo paragraph') {
                let edition = type === 'leonardo paragraph' ? "<b>1994 Massimo Mussini’s edition</b> of Ms. Regg. A.46.9.bis (Florence: © Giunti Barbéra, 1994)<br>" : "";
                return `<p class="post-footer"><b>Transcription by Andrea Nanetti based on the 1979 Pietro Marani’s edition</b> of Ms. Asch. 361 (Florence: © Giunti Barbéra, 1979)<br>${edition}<b>Open access commentary on the drawings</b> by Andrea Nanetti, Antonio Corso, and Stefano Bertocci<br><b>NPR 3D Animations</b> by Oen Weng Wah Nicholas and Clemens Tan Yu Chen supervised by Davide Benvenuti<br><b>Open access critical English translation</b> by Andrea Nanetti, John Melville-Jones, Antonio Corso, and Stefano Bertocci</p>`;
            } else if (type === 'drawing') {
                return `<p class="post-footer"><b>Original artefact:</b> ink and tempera on parchment (39.5x26.8cm) Martini BML, ${folio} - © Florence, Biblioteca Medicea Laurenziana, Ms. Ashb. 361. Published with permission (“su concessione del Ministero dei beni e delle attivit culturali e del turismo, MiBACT – BML - Prot. 2789/28.13.10.01/2.29”)<br><b>Online commentary on the drawings (2019-ongoing)</b> by Andrea Nanetti, Antonio Corso, and Stefano Bertocci</p>`;
            } else if (type === 'leonardo drawing') {
                return `<p class="post-footer"><b>Original artefact:</b> ink and tempera on parchment (39.5x26.8cm) Martini BCRE, ${folio} - © Reggio Emilia, Biblioteca Civica “Antonio Panizzi” di Reggio Emilia (Mss. Regg. A 46/9 bis). Published with permission</p>`;
            } else {
                return "";
            }
        case 'imola':
            return '';
        case 'sinai':
        case 'sinai_d':
        case 'sinai_h':
            if (hid > 74 && hid < 80) return '<p class="post-footer"><b>Edition and Commentary:</b><br>Nanetti, A. (2008). L’originale del privilegio Religiosam vitam di papa Gregorio X per il Monte Sinai (1274). Edizione e commento. In Canetti, L., Caroli, M., Morini, E., & Savigni, R. (Eds.), <i>Studi di storia del Cristianesimo. Per Alba Maria Orselli</i> (pp. 235-268 and 209-217 plates). Ravenna: © Longo Editore. Published with permission (email 15-06-2020).<br><br><b>English translation</b> by Nicolas Coureas and Andrea Nanetti, 2015. (CC) BY-NC-ND 4.0 Except where otherwise noted, content is licensed under <a target="_blank" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">Attribution-NonCommercial-NoDerivatives 4.0 International</a><br><br><b>Transcription, transliteration, and translation into English of the archival information in Arabic</b> by Antonella Ghersetti and Frédéric Bauden, 2020. (CC) BY-NC-ND 4.0 Except where otherwise noted, content is licensed under <a target="_blank" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">Attribution-NonCommercial-NoDerivatives 4.0 International</a></p>';
            else return '<p class="post-footer"><b>Edition and Commentary:</b><br>Nanetti, A. (2008). L’originale del privilegio Religiosam vitam di papa Gregorio X per il Monte Sinai (1274). Edizione e commento. In Canetti, L., Caroli, M., Morini, E., & Savigni, R. (Eds.), <i>Studi di storia del Cristianesimo. Per Alba Maria Orselli</i> (pp. 235-268 and 209-217 plates). Ravenna: © Longo Editore. Published with permission (email 15-06-2020).<br><br><b>English translation</b> by Nicolas Coureas and Andrea Nanetti, 2015. (CC) BY-NC-ND 4.0 Except where otherwise noted, content is licensed under <a target="_blank" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">Attribution-NonCommercial-NoDerivatives 4.0 International</a></p>';
        case 'ayu':
            return '<p class="post-footer"><b>Critical English Translation</b><br><em>The Royal Chronicles of Ayutthaya</em>. A Synoptic Translation by Richard D. Cushman, edited by David K. Wyatt. Bangkok: The Siam Society Under Royal Patronage, 2006<sup>2</sup>&nbsp;(first edition, 2000), pp. 1-25 (<em>Book One: Early Ayutthaya</em>).<u></u><u></u><br><br><b>Thai Texts</b><br>The Thai text of A and B have been retrieved online from WikiSource (A,&nbsp;<a href="https://th.wikisource.org/wiki/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%9E%E0%B8%87%E0%B8%A8%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%B2_%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%AB%E0%B8%A5%E0%B8%A7%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%AA%E0%B8%A3%E0%B8%B4%E0%B8%90_(2450)" target="_blank">Luang Prasoet</a>; and B,&nbsp;<a href="https://th.wikisource.org/wiki/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B8%9E%E0%B8%87%E0%B8%A8%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B8%B2%E0%B8%A3_%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%97%E0%B8%B5%E0%B9%88_%E0%B9%96%E0%B9%94" target="_blank">Phan Chanthanumat</a>) and edited by Christopher J. Baker before entering them into the EHM application. For the edition of Manuscript C refer to&nbsp;<a href="https://engineeringhistoricalmemory.com/bibliography/?id=145">Prachum phongsāwadān 82, 1994</a>.<br><br><b>Images of the Manuscript</b><br><em>Chronicle of the Kingdom of Ayutthaya: The British Museum version</em>&nbsp;(1999), preserved in the British library, with an Introduction by D. K. Wyatt. Tokyo: The Centre for East Asian Cultural Studies for Unesco, The Toyo Bunko.</p>';
        case 'russ':
            return `<p class="post-footer"><b>Manuscript</b><br>Saint Petersburg, The Scientific and Historical Archive of Saint-Petersburg Institute of History, Collection of the Archaeographic Commission, Ms. 240 (mid-15 th cent.), f. ${extra_info}.<br><br><b>Critical Edition</b><br>A.N. Nasonov (Gen. Ed.) and M.N. Tikhomirov (Ed.), Новгородская летопись’ старшего и младшего/Novgorodskaia letopis’ starshego i mladshego izvodov [The First Novgorod Chronicle in its Older and Younger Versions], Москва-Ленинград/Moskva-Leningrad: Изд-во Акад. Наук СССР/ USSR Academy of Sciences, 1950, pp. 465-477.<br><br><b>Romanised Place Names and Geolocations:</b><br>Dr Alexey Frolov (2018-2019).</p>`
        case 'bosch':
            return ``;
        case 'maokun':
            return `<div class="post-footer"><p><strong>Chinese text:</strong></p><p>M&aacute;o Yu&aacute;ny&iacute; [1594-1640], <em>Wǔb&egrave;i Zh&igrave;</em>, 80 volumes in 8 cases (30x19cm), 1628, with an <em>Introduction</em> dated 1621.</p><p><strong>Identification of the place names and commentary:</strong></p><p>Ma H., Feng, C., &amp; Mills, J. V. G. (1970). Ma Huan. <em>Ying-yai Sheng-lan. 'The Overall Survey of the Ocean's Shores' [1433; published in 1451]</em>, Translated from the Chinese text edited by Feng Ch'eng-Ch&uuml;n with introduction, notes and appendices by J. V. G. Mills. Cambridge: published for the Hakluyt Society at the Cambridge University Press [Bangkok: White Lotus Press, 1997], ${extra_info}. &copy; The Hakluyt Society.</p></div>>`;
        case 'raj':
            return `<div class="post-footer"><p><strong>Geolocations and commentary:</strong></p><p>2020-2021 Mamta Sharma supervised by Dr Andrea Nanetti.</p><p><strong>Owner of the monument: </strong>(column N).</p><p><strong>Protection status:</strong> (column O).</p></div>`;
        default:
            return "";
    }
}

export const EHM = {
    default: "AdvancedSearch.php?page=1",
    search: place_name => `AdvancedSearch.php?workstuff=&when_from=&when_to=&place_name=${place_name}&where=&who=&government=&what=&how=&title=&tag=&page=1`,
    id: post_id => `Posts.php?post_id=${post_id}`,
    ids: post_ids => `AdvancedSearch.php?post_ids=${post_ids}&page=1`
};
export const WIKIPEDIA = {
    container: "wikipedia_info",
    name: "Wikipedia",
    img: 'wikipedia_logo_30px.png',
    default: "https://en.m.wikipedia.org/wiki/Main_Page",
    ae: "https://en.m.wikipedia.org/wiki/Afro-Eurasia",
    aem: "https://en.m.wikipedia.org/wiki/Afro-Eurasia",
    fm: "https://en.m.wikipedia.org/wiki/Fra_Mauro_map",
    fm_v: "https://en.m.wikipedia.org/wiki/Adobe_Photoshop_Elements",
    fm_spec: "https://en.m.wikipedia.org/wiki/Multispectral_image",
    gm: "https://en.m.wikipedia.org/wiki/Genoese_map",
    fgm: "https://en.m.wikipedia.org/wiki/Francesco_di_Giorgio_Martini",
    mc: "https://de.m.wikipedia.org/wiki/Morosini-Codex",
    mp: "https://en.m.wikipedia.org/wiki/The_Travels_of_Marco_Polo",
    cm: "https://en.m.wikipedia.org/wiki/Methoni_Castle",
    msl: "https://en.m.wikipedia.org/wiki/Ming_Shilu",
    ibn: "https://en.m.wikipedia.org/wiki/Ibn_Battuta",
    imola: "https://en.m.wikipedia.org/wiki/Imola",
    sinai: "https://en.m.wikipedia.org/wiki/Pope_Gregory_X",
    sinai_d: "https://en.m.wikipedia.org/wiki/Papal_diplomatics",
    sinai_h: "https://en.m.wikipedia.org/wiki/Pope_Gregory_X",
    sinai_v: "https://en.m.wikipedia.org/wiki/Adobe_Photoshop_Elements",
    ayu: "https://en.m.wikipedia.org/wiki/Ayutthaya_Testimonies",
    collab: "https://en.m.wikipedia.org/wiki/Digital_history",
    vis: "https://en.m.wikipedia.org/wiki/Information_visualization",
    sr: "https://en.m.wikipedia.org/wiki/Silk_Road",
    russ: "https://en.m.wikipedia.org/wiki/Novgorod_First_Chronicle",
    bosch: "https://en.m.wikipedia.org/wiki/Ship_of_Fools_(painting)",
    maokun: "https://en.m.wikipedia.org/wiki/Mao_Kun_map",
    raj: "https://en.m.wikipedia.org/wiki/Hill_Forts_of_Rajasthan",
    search: place_name => `https://en.m.wikipedia.org/wiki/Special:Search?search="${place_name}"&go=Go`
};

const CNKI = {
    container: "cnki_info",
    name: 'CNKI',
    img: 'cnki.gif',
    default: "http://www.cnki.net/",
    search: place_name => `http://epub.cnki.net/kns/brief/Default_Result.aspx?code=SCDB&singleDB=SCDB&kw=${place_name}&korder=&sel=1`,
};
const WANFANG = {
    container: "wanfang_info",
    name: 'Wanfang Data',
    img: 'wanfang.png',
    default: "http://www.wanfangdata.com.cn/index.html",
    search: place_name => `http://www.wanfangdata.com.cn/search/searchList.do?searchType=all&showType=&pageSize=&searchWord=${place_name}&isTriggerTag=`,
};

export const BING = {
    container: "bing_info",
    name: 'Bing Images',
    img: 'bing.jpeg',
    default: "https://www.bing.com/?scope=images&nr=1&FORM=NOFORM",
    search: place_name => `https://www.bing.com/images/search?q="${place_name}"&scope=images&form=QBLH&sp=-1&pq="${place_name}"&sc=8-9&qs=n&sk=&cvid=684C14F0C0DA40AD9E4817C211EB9759`
};

const POST = {
    container: "post_info",
    name: 'publications',
    img: 'post.png',
};
const IMAGE = {
    container: "image_info",
    name: 'images',
    img: 'image.png',
};
const VIDEO = {
    container: "video_info",
    name: 'videos',
    img: 'video.png',
};
const EXTERNAL = {
    container: 'external_info',
    name: 'more',
    img: 'external.svg',
}
const BLACKWELL = {
    container: "blackwell_info",
    name: "Blackwell",
    img: "blackwell_30px.png",
    default: "https://blackwells.co.uk/bookshop/home",
    fm: "https://blackwells.co.uk/bookshop/search/?keyword=fra+mauro",
    gm: "https://blackwells.co.uk/bookshop/search/?keyword=genoese",
    osm: "https://blackwells.co.uk/bookshop/search/?keyword=openstreetmap",
    search: place_name => `https://blackwells.co.uk/bookshop/search/?keyword=${place_name}`
};

const GETTY = {
    container: "getty_info",
    name: "Getty Images",
    img: "gettyimages_logo_30px.png",
    default: "https://www.gettyimages.com/",
    fm: "https://www.gettyimages.com/photos/fra-mauros-map?phrase=fra%20mauro%27s%20map&sort=best#license",
    gm: "https://www.gettyimages.com/photos/genoese-map?phrase=genoese%20map&sort=best#license",
    osm: "https://www.gettyimages.com/photos/open-street-map?phrase=open%20street%20map&sort=best#license",
    search: place_name => `https://www.gettyimages.com/photos/${place_name}`
};

const GSCHOLAR = {
    container: "google_scholar_info",
    name: "Google Scholar",
    img: "google_scholar_logo_50px.png",
    default: "https://scholar.google.com/",
    fm: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=Fra+Mauro+Map&btnG=",
    gm: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=genoese+map&btnG=",
    osm: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=openstreetmap&btnG=",
    search: place_name => `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${place_name}&btnG=`
};
const JSTOR = {
    container: "jstor_info",
    name: "JSTOR",
    img: "jstor_logo_50px.png",
    default: "https://www.jstor.org/",
    fm: "https://www.jstor.org/stable/43483115?Search=yes&resultItemClick=true&searchText=fra&searchText=mauro&searchUri=%2Faction%2FdoBasicSearch%3FQuery%3Dfra%2Bmauro%26amp%3Bfilter%3D&ab_segments=0%2Fdefault-2%2Fcontrol&refreqid=search%3A565e4bf9168eeaac5a5300a15b8d13e7",
    gm: "https://www.jstor.org/",
    osm: "https://www.jstor.org/",
    search: place_name => `https://www.jstor.org/action/doBasicSearch?Query=${place_name}`
};

const PELAGIOS = {
    container: "pelagios_info",
    name: "Pelagios",
    img: "pelagios_logo_70px.png",
    default: "http://commons.pelagios.org/",
    fm: "http://commons.pelagios.org/",
    gm: "http://commons.pelagios.org/",
    osm: "http://commons.pelagios.org/",
    search: place_name => `http://commons.pelagios.org/?s=${place_name}`
};

export const KEYWORDS = {
    ae: "Afro Eurasia",
    aem: "Afro Eurasia",
    mc: "Morosini Codex",
    gm: "Genoese Map",
    fm: "Fra Mauro",
    fm_v: "Photoshop elements adjustment layers",
    fm_spec: "Multispectral images",
    mp: "Marco Polo",
    cm: "Methoni castle",
    msl: "Ming Shilu",
    ibn: "Ibn Battuta",
    fgm: "Francesco di Giorgio Martini",
    imola: "Imola Map",
    sinai: "Pope Gregory X",
    sinai_d: "Papal Diplomatics",
    sinai_h: "Pope Gregory X",
    sinai_v: "Photoshop elements adjustment layers",
    collab: "Digital history",
    vis: "Information visualisation",
    ayu: "Ayutthaya History",
    russ: "Old Russian Towns",
    bosch: "Wayfarer Triptych",
    sr: 'Silk Road',
    maokun: "Mao Kun Map",
    raj: "Hill forts Rajasthan",
};

export const KEYWORDS_IMAGE = {
    ae: "Afro Eurasia",
    aem: "Afro Eurasia",
    mc: "Codice Morosini",
    gm: "Genoese Map",
    fm: "Fra Mauro Map",
    fm_v: "Photoshop elements adjustment layers",
    fm_spec: "Multispectral images",
    mp: "Marco Polo Devisement",
    cm: "The Methoni Castle",
    msl: "Ming Shilu",
    ibn: "Ibn Battuta Rihla",
    fgm: "Francesco di Giorgio Martini",
    imola: "Imola Map",
    sinai: "Pope Gregory X and St Catherine Monastery",
    sinai_d: "Papal Diplomatics",
    sinai_h: "Pope Gregory X and St Catherine Monastery",
    sinai_v: "Photoshop elements adjustment layers",
    collab: "Digital history",
    vis: "Information visualisation",
    ayu: "Ayutthaya History",
    russ: "Old Russian Towns",
    bosch: "Wayfarer Triptych",
    sr: 'Silk Road',
    maokun: "Mao Kun Map",
    raj: "Hill forts Rajasthan",
};
// export const API_RESOURCES = [MULTIMODAL, EUROPEANA, IMEDIACITIES, SCOPUS, GALLICA];
export const API_RESOURCES = [POST, IMAGE, VIDEO];
// export const MASHUP_RESOURCES = [BING, WIKIDATA, WORLDCAT].concat(API_RESOURCES).concat([PROQUEST]);
export const MASHUP_RESOURCES = API_RESOURCES.concat([EXTERNAL]);
export const MASHUP_RESOURCES_NAME = MASHUP_RESOURCES.map(r => r.name);
export const EXTERNAL_RESOURCES = [GETTY, GSCHOLAR, PELAGIOS, BLACKWELL, JSTOR, CNKI, WANFANG];
export const ALL_RESOURCES = [WIKIPEDIA].concat(MASHUP_RESOURCES).concat(EXTERNAL_RESOURCES);
const postFields = {
    post_id: 'post_id',
    post_ids: 'post_ids',
    post_title: 'post_title',
    post_titles: 'post_titles',
    post_date_fr: 'post_date_fr',
    post_pre_content: 'post_pre_content',
    post_content_ori: 'post_content_ori',
    post_content_en: 'post_content_en',
    post_urls: 'post_urls',
    post_note: 'post_note',
    post_type: 'post_type',
    post_done_by: 'post_done_by',
    post_credit: 'post_credit',
    post_credit_extra_info: 'post_credit_extra_info',
    post_wiki_url: 'post_wikipedia'
};
export const FIELDS = {
    fm: {
        hist_cartouche_title: 'fm_cartouche_title',
        hist_cartouche_eng: 'fm_cartouche_eng_06',
        hist_cartouche_eng_06: 'fm_cartouche_eng_06',
        hist_cartouche_origin_11: 'fm_cartouche_origin_11',
        hist_cartouche_man_11: 'fm_cartouche_man_11',
        hist_categories: 'fm_categories',
        hist_coords: 'fm_coords',
        hist_id: 'fm_id',
        hist_note_06: 'fm_note_06',
        hist_note_man_06: 'fm_note_man_06',
        hist_other_note: 'fm_other_note',
        hist_place_name: 'fm_place_name_11',
        hist_place_name_11: 'fm_place_name_11',
        hist_post_id: 'fm_post_id',
        hist_wiki_url: 'fm_wiki_url',
        hist_xzoom: 'fm_xzoom',
        hist_yzoom: 'fm_yzoom',
    },
    fm_v: {
        hist_cartouche_title: 'fm_cartouche_title',
        hist_cartouche_eng: 'fm_cartouche_eng_06',
        hist_cartouche_eng_06: 'fm_cartouche_eng_06',
        hist_cartouche_origin_11: 'fm_cartouche_origin_11',
        hist_cartouche_man_11: 'fm_cartouche_man_11',
        hist_categories: 'fm_categories',
        hist_coords: 'fm_coords',
        hist_id: 'fm_id',
        hist_note_06: 'fm_note_06',
        hist_note_man_06: 'fm_note_man_06',
        hist_other_note: 'fm_other_note',
        hist_place_name: 'fm_place_name_11',
        hist_place_name_11: 'fm_place_name_11',
        hist_post_id: 'fm_post_id',
        hist_wiki_url: 'fm_wiki_url',
        hist_xzoom: 'fm_xzoom',
        hist_yzoom: 'fm_yzoom',
    },
    fm_spec: {
        hist_cartouche_title: 'fm_cartouche_title',
        hist_cartouche_eng: 'fm_cartouche_eng_06',
        hist_cartouche_eng_06: 'fm_cartouche_eng_06',
        hist_cartouche_origin_11: 'fm_cartouche_origin_11',
        hist_cartouche_man_11: 'fm_cartouche_man_11',
        hist_categories: 'fm_categories',
        hist_coords: 'fm_coords',
        hist_id: 'fm_id',
        hist_note_06: 'fm_note_06',
        hist_note_man_06: 'fm_note_man_06',
        hist_other_note: 'fm_other_note',
        hist_place_name: 'fm_place_name_11',
        hist_place_name_11: 'fm_place_name_11',
        hist_post_id: 'fm_post_id',
        hist_wiki_url: 'fm_wiki_url',
        hist_xzoom: 'fm_xzoom',
        hist_yzoom: 'fm_yzoom',
    },
    gm: {
        hist_cartouche_title: 'gm_cartouche_title',
        hist_cartouche_it: 'gm_cartouche_it',
        hist_cartouche_origin: 'gm_cartouche_origin',
        hist_categories: 'gm_categories',
        hist_coords: 'gm_coords',
        hist_id: 'gm_id',
        hist_place_name: 'gm_place_name',
        hist_wiki_url: 'gm_wiki_url',
        hist_xzoom: 'gm_xzoom',
        hist_yzoom: 'gm_yzoom',
    },
    fgm: {
        hist_id: 'fgm_id',
        hist_name: 'fgm_name',
        hist_place_name: 'fgm_name',
        hist_text_ori: 'fgm_text_ori',
        hist_text_en: 'fgm_text_en',
        hist_page: 'fgm_page',
        hist_folio: 'fgm_folio',
        hist_coords: 'fgm_coords',
        hist_xzoom: 'fgm_xzoom',
        hist_yzoom: 'fgm_yzoom',
        hist_type: 'fgm_type',
    },
    imola: {
        hist_id: 'imola_id',
        hist_name: 'imola_name',
        hist_categories: 'imola_categories',
        hist_place_name: 'imola_name',
        hist_coords: 'imola_coords',
        hist_xzoom: 'imola_xzoom',
        hist_yzoom: 'imola_yzoom',
        // hist_cad_coords: 'cad_coords',
        // hist_cad_xzoom: 'cad_xzoom',
        // hist_cad_yzoom: 'cad_yzoom',
        hist_caption: 'imola_caption',
        hist_content: 'imola_content',
    },
    cadastral: {
        hist_id: 'imola_id',
        hist_name: 'imola_name',
        hist_categories: 'imola_categories',
        hist_place_name: 'imola_name',
        hist_coords: 'cad_coords',
        hist_xzoom: 'cad_xzoom',
        hist_yzoom: 'cad_yzoom',
        hist_content: 'imola_content',
    },
    cappelle: {},
    sinai: {
        hist_id: 'sinai_id',
        hist_name: 'sinai_name',
        hist_categories: 'sinai_name',
        hist_place_name: 'sinai_name',
        hist_coords: 'sinai_coords',
        hist_xzoom: 'sinai_xzoom',
        hist_yzoom: 'sinai_yzoom',
        hist_transcript_ori: 'sinai_edition_ori',
        hist_transcript_en: 'sinai_edition_en',
        hist_layer: 'sinai_layer',
        hist_p_comment: 'sinai_p_comment',
        hist_comment: 'sinai_d_comment',
        hist_d_comment: 'sinai_d_comment',
        hist_h_comment: 'sinai_h_comment',
        hist_wiki_url: 'sinai_d_wiki',
        hist_keyword: 'sinai_d_keyword',
        hist_mode: 'sinai_mode',
        front_back: 'sinai_front_back',
    },
    sinai_d: {
        hist_id: 'sinai_id',
        hist_name: 'sinai_name',
        hist_categories: 'sinai_name',
        hist_place_name: 'sinai_name',
        hist_coords: 'sinai_coords',
        hist_xzoom: 'sinai_xzoom',
        hist_yzoom: 'sinai_yzoom',
        hist_transcript_ori: 'sinai_edition_ori',
        hist_transcript_en: 'sinai_edition_en',
        hist_layer: 'sinai_layer',
        hist_p_comment: 'sinai_p_comment',
        hist_comment: 'sinai_d_comment',
        hist_d_comment: 'sinai_d_comment',
        hist_h_comment: 'sinai_h_comment',
        hist_wiki_url: 'sinai_d_wiki',
        hist_keyword: 'sinai_d_keyword',
        hist_mode: 'sinai_mode',
    },
    sinai_h: {
        hist_id: 'sinai_id',
        hist_name: 'sinai_name',
        hist_categories: 'sinai_name',
        hist_place_name: 'sinai_name',
        hist_coords: 'sinai_coords',
        hist_xzoom: 'sinai_xzoom',
        hist_yzoom: 'sinai_yzoom',
        hist_transcript_ori: 'sinai_edition_ori',
        hist_transcript_en: 'sinai_edition_en',
        hist_layer: 'sinai_layer',
        hist_p_comment: 'sinai_p_comment',
        hist_comment: 'sinai_h_comment',
        hist_d_comment: 'sinai_d_comment',
        hist_h_comment: 'sinai_h_comment',
        hist_wiki: 'sinai_h_wiki',
        hist_wiki_url: 'sinai_h_wiki',
        hist_keyword: 'sinai_h_keyword',
        hist_mode: 'sinai_mode',
    },
    sinai_v: {},
    osm: {
        cont_id: 'cont_id',
        cont_place_name: 'cont_place_name',
        cont_post_id: 'cont_post_id',
        cont_wiki_url: 'cont_wiki_url',
        cont_lat: 'cont_lat',
        cont_lng: 'cont_lng',
        cont_background: 'cont_background',
        cont_place_name_split: 'cont_place_name_split',
        cont_resources: 'cont_resources',
        cont_country: 'cont_country',
    },
    aem: {
        hist_cartouche_title: {fm: 'fm_cartouche_title', gm: 'gm_cartouche_title'},
        hist_cartouche_eng_06: 'fm_cartouche_eng_06',
        hist_cartouche_origin_11: 'fm_cartouche_origin_11',
        hist_categories: {fm: 'fm_categories', gm: 'gm_categories'},
        hist_coords: {fm: 'fm_coords', gm: 'gm_coords'},
        hist_id: {fm: 'fm_id', gm: 'gm_id'},
        hist_note_06: 'fm_note_06',
        hist_other_note: 'fm_other_note',
        hist_place_name: {fm: 'fm_place_name_11', gm: 'gm_place_name'},
        hist_place_name_11: 'fm_place_name_11',
        hist_post_id: 'fm_post_id',
        hist_wiki_url: {fm: 'fm_wiki_url', gm: 'gm_wiki_url'},
        hist_xzoom: {fm: 'fm_xzoom', gm: 'gm_xzoom'},
        hist_yzoom: {fm: 'fm_yzoom', gm: 'gm_yzoom'},
        hist_cartouche_it: 'gm_cartouche_it',
        hist_cartouche_origin: 'gm_cartouche_origin',
    },
    mc: postFields,
    mp: postFields,
    cm: postFields,
    msl: postFields,
    ae: postFields,
    ibn: postFields,
    ayu: postFields,
    collab: postFields,
    vis: postFields,
    sr: postFields,
    russ: postFields,
    raj: postFields,
    bosch: {
        hist_id: 'bosch_id',
        hist_place_name: 'bosch_name',
        hist_wiki_url: 'bosch_wikipedia',
        hist_coords: 'bosch_coords',
        hist_xzoom: 'bosch_x',
        hist_yzoom: 'bosch_y',
        hist_citation: 'bosch_citation',
        hist_done_by: 'bosch_done_by',
        hist_reference: 'bosch_reference',
        hist_keywords: 'bosch_keywords',
        hist_keyword: 'bosch_keyword',
        hist_categories: 'bosch_name',
    },
    maokun: {
        hist_text_en: 'mk_en_text',
        hist_text_cn: 'mk_cn_text',
        hist_text_cn_ori: 'mk_ori_cn_text',
        hist_categories: 'mk_en_text',
        hist_id: 'mk_id',
        hist_place_name: 'mk_en_text',
        hist_wiki_url: 'mk_wiki_url',
        hist_xzoom: 'mk_xzoom',
        hist_yzoom: 'mk_yzoom',
        hist_coords: 'mk_coords',
        hist_comment: 'mk_comment',
        hist_footnote: 'mk_footnote'
    }
};

class Center {
    constructor(initialCenter, maxClusterLayer, initialLayer) {
        this.initialCenter = initialCenter;
        this.maxClusterLayer = maxClusterLayer;
        this.initialLayer = initialLayer;
    }
}

export const CENTER = {
    mc: new Center([42.960501, 26.056279], 8, 3),
    mp: new Center([32.527922, 54.577028], 8, 3),
    cm: new Center([36.8166286920961, 21.705304384231567], 16, 15),
    msl: new Center([12.843177, 106.856140], 8, 5),
    imola: new Center([44.353445, 11.714148], 18, 14),
    ibn: new Center({
        "1325–1332": [22.143499, 24.673932],
        '1332–1347': [31.991486, 58.825271],
        '1349–1354': [27.063704, -5.201466]
    }, {
        "1325–1332": 3,
        '1332–1347': 3,
        '1349–1354': 4
    }, {
        "1325–1332": 3,
        '1332–1347': 3,
        '1349–1354': 4
    }),
    sinai: new Center([36.256274, 31.535279], 5, 5),
    ayu: new Center([12.5, 102], 5, 5),
    russ: new Center([55, 33], 8, 4),
    raj: new Center([20.668208, 78.076180], 8, 4),
    collab: new Center([21.233165, 20.394990], 8, 2),
    default: new Center([32.527922, 54.577028], 8, 3),
};
const VIS_POST_PAGES = ['mc', 'mp', 'cm', 'ae', 'ibn', 'vis', 'ayu', 'russ', 'msl', 'sr', 'raj'];
export const POST_PAGES = [...VIS_POST_PAGES, 'sr', 'raj'];
// export const POST_PAGES = VIS_POST_PAGES;

export const MAP_PAGES = ['fm', 'gm', 'aem', 'imola', 'bosch', 'maokun', ...VIS_POST_PAGES];
export const POST_NAMES = {
    ae: 'Chronicles and Travel Accounts of Afro-Eurasia (1205-1533 CE)',
    aem: 'Maps of Afro-Eurasia (1100-1460 CE)',
    mc: 'The Morosini Codex (1095-1433)',
    mp: 'Marco Polo, The Description of the World',
    cm: 'The Methoni Castle (Peloponnese, Greece)',
    ibn: 'Ibn Battuta’s Travels (1325-1354 CE)',
    msl: 'Ming Shilu 1368-1644',
    collab: 'Research team',
    vis: 'Information Visualisation',
    ayu: 'Ayutthaya',
    russ: 'Russian Towns',
    sr: 'The Silk Road: Histories, Initiatives, People',
    raj: 'Hill Forts of Rajasthan (ca 8th-16th cent. CE)',
};
export const MAP_NAME = {
    fm: "Fra Mauro's map",
    fm_v: 'Re-composition',
    fm_spec: "Multispectral images",
    gm: "Genoese map",
    osm: "OpenStreetMap",
    mc: "Morosini Codex",
    ae: 'Afro-Eurasia (1205-1533 CE)',
    aem: 'Afro-Eurasia (1100-1460 CE)',
    mp: 'Marco Polo',
    cm: 'The Methoni Castle',
    ibn: 'Ibn Battuta’s Travels (1325-1354 CE)',
    msl: 'Ming Shilu 1368-1644',
    fgm: 'F. G. Martini',
    imola: 'Imola Map',
    cappelle: 'Cappelle',
    sinai: 'Mount Sinai',
    sinai_d: 'Diplomatics',
    sinai_h: 'History',
    sinai_v: 'Re-composition',
    collab: 'Research team',
    vis: 'Visualisation',
    ayu: "Ayutthaya",
    russ: "Russian Towns",
    sr: "Silk Road",
    bosch: "Bosch",
    maokun: "Mao Kun map",
    raj: "Rajasthan",
};

export class App {
    constructor(code, active, href, img, artefact, desc) {
        this.code = code;
        this.active = active;
        this.href = href;
        this.img = img;
        this.artefact = artefact;
        this.desc = desc;
    }
}

export const allApps = [
    new App('aem', true, 'AfroEurasiaMap.php', 'Afro-eurasia.png', 'All EHM datasets', 'This app explores all EHM maps'),
    new App('fm', true, 'FraMauro.php', 'Fra Mauro.jpg', '© Venice, Biblioteca Nazionale Marciana (Inv. 106173)', 'Afro-Eurasia as seen from Venice in mid-fifteenth century'),
    new App('gm', true, 'GenoeseMap.php', 'Genoese Map.jpg', '© Florence, Biblioteca Nazionale Centrale (Portolano 1)', 'Afro-Eurasia as seen from Genoa in mid-fifteenth century'),
    new App('mp', true, 'MarcoPolo.php', 'Marco-polo.png', '© Paris, Bibliothèque Nationale de France, Ms. Fr. 1116', 'A thirteenth-century global ethnography'),
    new App('ibn', true, 'IbnBattuta.php', 'battuta.jpeg', '© Hakluyt Society', 'The account of the travels of Ibn Battuta in Africa and Asia'),
    new App('mc', true, 'MorosiniCodex.php', 'morosini-codex.jpg', '© Vienna, Österreichische Nationalbibliothek, Codd. 6586-6587', 'The world of Venice in early-fifteenth century'),
    new App('msl', true, 'MingShilu.php', 'ming-shilu.jpg', '© Geoffrey Wade, National University of Singapore Press', 'English translation of the passages relevant to the history of Southeast Asia'),
    new App('sinai', true, 'MountSinai.php', 'Mount Sinai.png', '© Holy Monastery of St. Catherine at Mount Sinai, Archive', 'The only preserved original of five privileges issued by the Church of Rome to the Monastery of Mount Sinai between 1217 and 1459'),
    new App('cm', true, 'MethoniCastle.php', 'Modon.jpg', '© Greek Ministry of Culture and Sports', 'The heritage of Venetian Period (1205-1500 &amp; 1685-1715)'),
    new App('vis', true, 'Visualisation.php', 'Visualisation.png', '', ''),
    new App('ayu', true, 'Ayutthaya.php', 'ayutthaya.jpg', 'Original Artefact: © London, British Museum, OR 11827 - © English translation: The Siam Society Under Royal Patronage (Bangkok, Thailand)', 'Ayutthaya was known as the Venice of the East. The chronicle has been updated in different epochs and contains events dated between 1169 and 1758. It survives in 18 manuscripts dated between the fifteenth century (a fragment) and 1855 (Royal Autograph)'),
    new App('russ', true, 'RussianTowns.php', 'Old Russian Towns.jpg', '© Saint Petersburg, <i>The Scientific and Historical Archive of Saint-Petersburg Institute of History</i>, Collection of the Archaeographic Commission, Ms. 240 (mid-15th cent.), ff. 22v-24v.', 'The earliest toponomastic list of Old Russian Towns.'),

    new App('fgm', false, 'FGM.php', 'FGM.jpg', '© Florence, Biblioteca Medicea Laurenzia (Codice Ash361)', 'Manuscript with notes and drawings by L. da Vinci'),
    new App('imola', false, 'ImolaMap.php', 'MapImola.png', '© Windsor (Royal Library, 12284r)', 'Map of the town of Imola (Italy) by Danesio Maineri (1473) with additions and notes by L. da Vinci (1502)'),
    new App('come', false, 'CoroniMethoni.php', 'coroni-methoni-300.jpg', '© Venice, Archivio di Stato di Venezia', 'Virtual reconstruction of the archives of the Venetian territories of Coron and Modon (13th - 15th centuries)'),
    new App('bosch', true, 'Bosch.php', 'Bosch.jpg', 'Four oil paintings on panel', 'These four oil paintings on panel are recognised by scholarship as formerly composing the “Wayfarer Tripytich” realised by the Dutch painter Jheronimus Bosch (ca 1450 – 9 August 1516) in Brabant'),
    new App('maokun', false, 'MaoKunMap.php', 'Mao_Kun_map.png', 'Original Artefact: lost strip nautical chart published as 44 one-page woodcut prints in Máo Yuányí’s Wǔbèi Zhì (offered to the throne in 1628)', 'This is the earliest known Chinese navigation chart that gives a detailed description of the Western and Central Indo-Pacific seas (aka South-Asia seas), from China to East Africa'),

    new App('gnd', false, '', 'GangnidoMap.jpg', '© Ryūkoku University, Omiya Library (Kyoto, Japan)', 'The original map is lost. It was created in Korea by Yi Hoe and Kwon Kun in 1402. The surviving so-called Ryūkoku copy is painted on silk and was also made in Korea (ca. 1470s/ 1480s). In 1988, another copy made in Japan during the Edoperiod (ca. 1560s) was discovered in Nagasaki (Honkōji Temple of Shimabara)'),
    new App('dm', false, '', 'Da-ming-hun-yi-tu.jpg', '大明混一图/ Da Ming Hunyi Tu (1389)', '© First Historical Achieves of China (PRC, Beijing)', 'The original so-called “Composite Map of the Ming Empire” is lost. It reflected the political situation of 1389 (22nd year of Emperor Hongwu’s reign). The surviving copy of the map is also called 清字簽一統圖 / Qingzi Qian Yitong Tu ("Manchu text-labelled unified map") because of the superimposed Manchu translation of the classical Chinese test'),
    new App('edr', false, '', 'Edrisi.jpg', '© Konrad Miller 1928', 'The map (Tabula Rogeriana) is based on the book (Kitab Rujar) commissioned by King Roger II of Sicily to Mohammed al-Idrisi in 1138'),
    new App('ae', true, 'AfroEurasia.php', 'advanced_search.png', 'All EHM datasets', 'This app explores all EHM chronicles and travel accounts'),
    new App('nov', false, '', 'Novgorod.png', '© Moscow, <i>State Historical Museum of Russia</i>, Moscow Synodal Library collection, Ms. 786 (13<sup>th</sup>-14<sup>th</sup> cent.)', 'The earliest extant chronicle of the Novgorodian Rus’'),
    new App('ago', false, '', 'Agorastos.png', '© Mount Athos, The Holy Monastery of Iveron, Library, Cod. 61 (dated Mistras, Monastery of Zerbitza, 1728-1729), ff. 185r-187r', 'The only known chronicle of the Venetian conquest of the Peloponnese written in Greek'),
    new App('malay', false, '', 'Malay.png', '© Singapore National Library Board', 'Malay Annals (Sejarah Melayu, NLB, Ms. Raffles no. 18, dated 1612) transl. by C. C. Brown (1952)'),
    new App('pate', false, '', 'pate.jpg', '© Library of the University of Dar es Salaam (Tanzania, Dar es Salaam)<br>© Edition and Translation: Marina Tolmacheva and Michigan State University Press', 'This chronicle is considered by many scholars the most important indigenous source for Swahili history'),
    new App('hung', false, '', 'Kepes Kronika.png', '© Manuscript: National Széchényi Library (Budapest, Hungary)<br>© Edition and Translation: Central European University Press (Budapest, Hungary)', 'This manuscript – formerly known as the “Vienna Illuminated Codex” –, which represents the most extensive text of the medieval Hungarian chronicle tradition, was written and enriched by 147 miniatures at the royal court of Louis I of Hungary (1342-1382) after 1358 but not later than 1370'),
    new App('ci', false, '', 'Chronicles Imola.png', '© BIM and AISA.', 'Chronicles of the city of Imola (Italy) from the origins until 1582 (16th-17th cent. Mss.)'),
    new App('bm', false, '', 'Bust_of_Luigi_Ferdinando_Marsili.jpeg', '© Bologna, Biblioteca Universitaria', 'L. F. Marsili’s and Byzantium (selection of BUB, cod. 1044, mss. 1-146)'),
    new App('sr', false, 'SilkRoad.php', 'SilkRoad.png', '', ''),
    new App('raj', true, 'Rajasthan.php', 'rajasthan.png', '', 'The six hillforts of Rajasthan were inscribed by UNESCO in the World Heritage List in 2013. Chittor is the largest one'),

    new App('about', false, '', '', '', ''),
];