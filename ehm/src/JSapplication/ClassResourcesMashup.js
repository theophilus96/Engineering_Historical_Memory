import {
    API_RESOURCES,
    KEYWORDS,
    KEYWORDS_IMAGE,
    MASHUP_RESOURCES,
    MASHUP_RESOURCES_NAME,
    EXTERNAL_RESOURCES,
    MAP_NAME
} from "./config.js";
import {getRequest, postRequestRaw} from "./httpRequest.js";
import {openTab} from "./openTab.js";

const PREFIX = {
    cm: "Methoni castle,",
    bosch: "",
}

const POSTFIX = {
    cm: "",
    bosch: "renaissance",
}

export class ResourcesMashup {
    constructor(container, map_type, place_name_split) {
        this.preFix = PREFIX[map_type] || '';
        this.postFix = POSTFIX[map_type] || ' history';
        this.container = document.getElementById(container);
        if (this.container) this.container.innerHTML = '';
        this.data_type = 3;
        this.resourceStart = 0;
        this.resoucesNumber = Math.min(MASHUP_RESOURCES.length, 5);
        this.map_type = map_type;
        this.place_name_split = place_name_split;
        this.currentResource = MASHUP_RESOURCES[0];
        this.loader = this.createLoader();
        this.loadResourcesMashup();
    }

    createLoader() {
        var loader = document.createElement('div');
        loader.className = 'loadingIcon';

        var loaderDiv = document.createElement('div');
        loaderDiv.className = 'content-load-cont';
        loaderDiv.appendChild(loader);

        return loaderDiv;
    }

    reload(map_type, place_name_split) {
        this.map_type = map_type;
        this.place_name_split = place_name_split;
        var resources = MASHUP_RESOURCES.map(x => x.name).join(',');
        this.resources_map = this.filterPlacesByResource(resources);
        this.tabcontent.childNodes.forEach(tab => tab.innerHTML = '');

        // var tabcontentDiv = this.tabcontent.childNodes[this.currentResource];
        // var resource = this.currentResource.name;
        // var tabcontentDiv = document.getElementById(resource);

        MASHUP_RESOURCES.forEach(resourceObj => {
            var tabcontentDiv = document.getElementById(resourceObj.name);
            this.loadEmbeddedInfo(tabcontentDiv, resourceObj, this.resources_map[resourceObj.name][0]);
        })

        // this.loadEmbeddedInfo(tabcontentDiv, this.currentResource, this.resources_map[resource][0]);
    }

    loadResourcesMashup() {
        var resources = MASHUP_RESOURCES.map(x => x.name).join(',');
        this.resources_map = this.filterPlacesByResource(resources);
        this.buildMashupTable();
    }

    createPrevBtn() {
        var btn = this.resourceHeadingPrev = document.createElement('button');
        btn.innerText = '<';
        btn.className = 'resources-heading-btn';
        btn.disabled = true;

        var btnContainer = document.createElement('th');
        btnContainer.append(btn);
        btnContainer.style.width = btnContainer.style.height = '45px';

        btn.onclick = () => {
            if (this.resourceStart === 0) return;
            this.resourceStart -= 1;
            this.resourcesHeading.removeChild(this.resourcesHeading.lastChild.previousSibling);
            this.resourcesHeading.insertBefore(this.createResouceHeading(MASHUP_RESOURCES[this.resourceStart]), btnContainer.nextSibling);
            this.resourceHeadingNext.disabled = false;
            if (this.resourceStart === 0) btn.disabled = true;
        };
        return btnContainer;
    }

    createNextBtn() {
        var btn = this.resourceHeadingNext = document.createElement('button');
        btn.innerText = '>';
        btn.className = 'resources-heading-btn';
        btn.disabled = true;

        var btnContainer = document.createElement('th');
        btnContainer.append(btn);
        btnContainer.style.width = btnContainer.style.height = '45px';

        btn.onclick = () => {
            if (this.resourceStart > MASHUP_RESOURCES.length - this.resoucesNumber - 2) return;
            this.resourceStart += 1;
            this.resourcesHeading.removeChild(this.resourcesHeading.children[1]);
            this.resourcesHeading.insertBefore(this.createResouceHeading(MASHUP_RESOURCES[this.resourceStart + this.resoucesNumber]), btnContainer);
            this.resourceHeadingPrev.disabled = false;
            if (this.resourceStart > MASHUP_RESOURCES.length - this.resoucesNumber - 2) btn.disabled = true;
        };
        return btnContainer;
    }


    filterPlacesByResource(resources) {
        var place_name_list = this.place_name_split ? this.place_name_split.split("|") : [];
        var all_resources_list = resources.split("|");

        var resources_map = {};
        for (let i = 0; i < all_resources_list.length; i++) {
            let place_name = place_name_list[i] || place_name_list[0];
            let resources = all_resources_list[i];
            let resource_list = resources.split(",");
            for (let j = 0; j < resource_list.length; j++) {
                let resource = resource_list[j];
                if (!MASHUP_RESOURCES_NAME.includes(resource)) continue;
                if (resources_map.hasOwnProperty(resource)) resources_map[resource].push(place_name);
                else resources_map[resource] = [place_name];
            }
        }
        return resources_map;
    }

    buildMashupTable() {
        var mashupTable = document.createElement('table');
        var firstRow = this.resourcesHeading = document.createElement('tr');
        var secondRow = document.createElement('tr');
        var tabcontent = this.tabcontent = document.createElement('td');
        if (this.container) this.container.className += ' mashup-container';
        mashupTable.className = 'mashup-table';
        tabcontent.colSpan = this.resoucesNumber;

        for (let i = 0; i < this.resoucesNumber; i++) {
            let resourceObj = MASHUP_RESOURCES[i];
            let resource = resourceObj.name;
            if (!this.resources_map.hasOwnProperty(resource)) continue;
            firstRow.appendChild(this.createResouceHeading(resourceObj));
        }

        for (let i = 0; i < MASHUP_RESOURCES.length; i++) {
            let resourceObj = MASHUP_RESOURCES[i];
            let resource = resourceObj.name;
            if (!this.resources_map.hasOwnProperty(resource)) continue;

            var tabcontentDiv = document.createElement('div');
            tabcontentDiv.id = resource;
            tabcontentDiv.className = 'tabcontent';
            tabcontentDiv.style.borderRadius = '0 0 1vw 0';
            tabcontentDiv.setAttribute('data-type', this.data_type);
            tabcontent.appendChild(tabcontentDiv);

            this.loadEmbeddedInfo(tabcontentDiv, resourceObj, this.resources_map[resourceObj.name][0]);
        }
        secondRow.appendChild(tabcontent);
        // firstRow.insertBefore(this.createPrevBtn(), firstRow.firstElementChild);
        // firstRow.appendChild(this.createNextBtn());
        mashupTable.appendChild(firstRow);
        mashupTable.appendChild(secondRow);
        if (this.container) this.container.appendChild(mashupTable);

        openTab(null, this.data_type);
        // this.loadEmbeddedInfo(tabcontent.firstChild, MASHUP_RESOURCES[0], this.resources_map[MASHUP_RESOURCES[0].name][0]);


        // for (let i = 0; i < MASHUP_RESOURCES.length; i++) {
        //     this.loadEmbeddedInfo(tabcontent.firstChild, MASHUP_RESOURCES[0], this.resources_map[MASHUP_RESOURCES[0].name][0]);
        // }
        //     this.currentResource = resourceObj;
        // var resource = resourceObj.name;
        // var tabcontentDiv = document.getElementById(resource);
        // if (tabcontentDiv.childElementCount) return;
        // this.loadEmbeddedInfo(tabcontentDiv, resourceObj, this.resources_map[resource][0]);
    }

    createResouceHeading(resourceObj) {
        var tablink = document.createElement('th');
        var tablinkBtn = document.createElement('button');
        var tablinkImg = document.createElement('img');
        tablinkImg.src = 'Images/resources/' + resourceObj.img;
        tablinkImg.className = 'mashup-icon';

        tablinkBtn.append(tablinkImg, document.createElement('BR'));
        tablinkBtn.appendChild(document.createTextNode(resourceObj.name.charAt(0).toUpperCase() + resourceObj.name.slice(1)));
        // tablinkBtn.innerText = resource.charAt(0).toUpperCase() + resource.slice(1);
        tablinkBtn.className = 'tablinks';
        tablinkBtn.onclick = event => openTab(event);
        tablinkBtn.setAttribute('resource', resourceObj.name);
        tablinkBtn.setAttribute('data-type', this.data_type);
        tablink.appendChild(tablinkBtn);

        // tablink.onclick = () => {
        //     this.currentResource = resourceObj;
        //     var resource = resourceObj.name;
        //     var tabcontentDiv = document.getElementById(resource);
        //     if (tabcontentDiv.childElementCount) return;
        //     this.loadEmbeddedInfo(tabcontentDiv, resourceObj, this.resources_map[resource][0]);
        // };
        return tablink;
    }


    loadEmbeddedInfo(container, resourceObj, place_name) {
        if (API_RESOURCES.includes(resourceObj)) this.loadApi(place_name, container, resourceObj.name);
        else if (resourceObj.name === 'more') {

            var cont = document.createElement('div');
            var externalHeader = document.createElement('div');
            externalHeader.style = "margin: 15px 20px";
            if (place_name) place_name = `${this.preFix} ${place_name} ${this.postFix}`;
            var place_name_cap = place_name ? place_name : KEYWORDS[this.map_type];

            if (place_name_cap) externalHeader.innerHTML = `<i>For further information on <b>${place_name_cap.charAt(0).toUpperCase() + place_name_cap.slice(1)}</b>, browse the below databases that cannot be integrated in the EHM Trove, yet:</i>`;

            cont.appendChild(externalHeader);

            for (let i = 0; i < EXTERNAL_RESOURCES.length; i++) {
                let resource = EXTERNAL_RESOURCES[i];

                if (place_name) var url = resource.search(encodeURI(place_name));
                else url = KEYWORDS.hasOwnProperty(this.map_type) ? resource.search(KEYWORDS[this.map_type]) : resource.default;

                let resource_html = document.createElement('div');
                resource_html.className = 'external-cont';
                resource_html.innerHTML = `<a target='_blank' id="${resource.container}" href="${url}">
                        <img src='Images/resources/${resource.img}' alt="${resource.name}"><span>${resource.name}</span>
                    </a>`;
                cont.appendChild(resource_html);
            }

            if (container) {
                container.innerHTML = "";
                container.className = 'sources_footer';
                container.appendChild(cont);
            }

        } else {
            if (container) {
                container.innerHTML = '';
                container.appendChild(this.loader);
            }


            let place_name_encoded = encodeURI(place_name);
            let url = place_name ? resourceObj.search(place_name_encoded) : (resourceObj.hasOwnProperty(this.map_type) ? resourceObj[this.map_type] : resourceObj.search(KEYWORDS[this.map_type]));
            let iframe = document.createElement('iframe');
            iframe.className = 'mashup-iframe';
            iframe.onload = () => {
                if (container.contains(this.loader)) container.removeChild(this.loader);
            }
            iframe.src = url;
            if (container) container.appendChild(iframe);
        }
    }

    loadApi(place_name, container, platform) {
        var perpage = 10;
        if (!place_name) {
            if (['images', 'videos'].includes(platform)) place_name = KEYWORDS_IMAGE[this.map_type];
            else place_name = KEYWORDS[this.map_type];
        } else {
            place_name = `${this.preFix} ${place_name} ${this.postFix}`;
            place_name = place_name.charAt(0).toUpperCase() + place_name.slice(1);
        }
        if (platform === 'science direct') {
            var params = {
                start: 0,
                count: perpage,
                query: place_name,
                apiKey: "38da2df0f6eee6827f5cfab0fb2bed9d"
            };
            var url_end_point = "https://api.elsevier.com/content/search/sciencedirect";
        } else if (platform === 'scopus') {
            params = {
                start: 0,
                count: perpage,
                // query: `TITLE-ABS-KEY(${place_name}) AND SUBJAREA(ARTS)`,
                query: place_name,
                // apiKey: "38da2df0f6eee6827f5cfab0fb2bed9d"
            };
            url_end_point = "controller/scopus.php";
            // url_end_point = "https://api.elsevier.com/content/search/scopus";
        } else if (platform === 'europeana') {
            params = {
                start: 1,
                count: perpage,
                query: `"${place_name}"`,
                // wskey: "Fq77bNoa4"
            };
            // url_end_point = "https://api.europeana.eu/api/v2/search.json";
            url_end_point = "controller/europeana.php";
        } else if (platform === 'zenodo') {
            params = {
                page: 1,
                size: perpage,
                q: place_name,
            };
            url_end_point = "https://zenodo.org/api/records";
        } else if (platform === 'gallica') {
            params = {
                start: 1,
                count: perpage,
                query: place_name,
            };
            url_end_point = "controller/gallica.php";
        } else if (platform === 'i media cities') {
            params = {
                start: 1,
                count: perpage,
                query: place_name,
            };
            // var body = `{"match":{"term":"\\"${place_name}\\"","fields":["title","contributor","keyword","description"]},"filter":{"type":"all","provider":null,"city":null,"iprstatus":null,"yearfrom":1890,"yearto":1999,"terms":[],"missingDate":true}}`;
            // url_end_point = "https://imediacities.hpc.cineca.it/api/search";
            url_end_point = "controller/IMC.php";
        } else if (platform === 'youtube') {
            params = {
                count: perpage,
                query: place_name,
            };
            url_end_point = "controller/youtube.php";
        } else if (platform === 'vimeo') {
            params = {
                page: 1,
                count: perpage,
                query: place_name,
            };
            url_end_point = "controller/vimeo.php";
        } else if (platform === 'google') {
            params = {
                page: 1,
                count: perpage,
                query: place_name,
            };
            url_end_point = "controller/google.php";
        } else if (platform === 'videos') {
            params = {
                page: 1,
                count: perpage,
                query: place_name,
                pageToken: "",
            };
            url_end_point = "controller/video.php";
        } else if (platform === 'images') {
            params = {
                page: 1,
                count: perpage,
                query: place_name,
            };
            url_end_point = "controller/image.php";
        } else if (platform === 'publications') {
            params = {
                page: 1,
                count: perpage,
                query: place_name,
            };
            url_end_point = "controller/post.php";
        }
        if (container) {
            container.innerHTML = '';
            container.appendChild(this.createLoader());
        }
        loadPosts(url_end_point, params);

        function loadPosts(url_end_point, params, append = false) {
            if (platform === 'images') loadAPI(url_end_point, params, append, 'image');
            else if (platform === 'videos') loadAPI(url_end_point, params, append, 'video');
            else loadAPI(url_end_point, params, append);
        }

        // function loadExternal(place_name_encoded) {
        //     var table = document.createElement("table");
        //     var td = document.createElement('td');
        //     td.colSpan = 2;
        //     td.id = "place_name_footer";
        //     var firstTr = document.createElement('tr');
        //     table.appendChild(firstTr);
        //     firstTr.appendChild(td);
        //
        //     for (let i = 0; i < EXTERNAL_RESOURCES.length; i += 2) {
        //         let firstResource = EXTERNAL_RESOURCES[i];
        //         let secondResource = EXTERNAL_RESOURCES[i + 1];
        //
        //         if (place_name_encoded) var first_url = firstResource.search(place_name_encoded);
        //         else first_url = KEYWORDS.hasOwnProperty(this.map_type) ? firstResource.search(KEYWORDS[this.map_type]) : firstResource.default;
        //         // else url = resource.hasOwnProperty(map_type) ? resource[map_type] : resource.default;
        //
        //         if (place_name_encoded) var second_url = secondResource.search(place_name_encoded);
        //         else second_url = KEYWORDS.hasOwnProperty(this.map_type) ? secondResource.search(KEYWORDS[this.map_type]) : secondResource.default;
        //
        //         let tr = document.createElement('tr');
        //
        //         let firstTd = `<td style="text-align: right">
        //             <a target='_blank' id="${firstResource['container']}" href="${first_url}">
        //                 ${firstResource['name']}<img src='Images/resources/${firstResource['img']}' alt="${firstResource['name']}">
        //             </a>
        //         </td>`;
        //         let secondTd = secondResource ? `<td>
        //             <a target='_blank' id="${secondResource['container']}" href="${second_url}">
        //                 <img src='Images/resources/${secondResource['img']}' alt="${secondResource['name']}">${secondResource['name']}
        //             </a>
        //         </td>` : "";
        //         tr.innerHTML = firstTd + secondTd;
        //         table.appendChild(tr);
        //     }
        //     container.innerHTML = "";
        //     container.className = 'sources_footer'
        //     container.id = "sources_footer"
        //     container.appendChild(table);
        // }

        function loadAPI(url_end_point, params, append = false, type) {
            getRequest(url_end_point, params, function (response) {
                if (!response) return;
                response = JSON.parse(response);
                if (params.hasOwnProperty('pageToken')) params.pageToken = response.nextPageToken;
                var items = response.items;
                var start = parseInt(params.start);
                var page = parseInt(params.page);
                var apiPaginator = {total: response.total, start: start, more: response.more};
                buildHtml(items, apiPaginator, append, type);
                if (page > 1) return;
                if (!type) type = 'pub';
                else if (type === 'image') {
                    setTimeout(function () {
                        Array.from(document.getElementsByClassName('cont-popup-img')).forEach(
                            element => element.innerHTML = `<img style="width: 100%" src="${items[0].img}">`
                        );
                    }, 1000);
                }
                Array.from(document.getElementsByClassName('click-popup-' + type)).forEach(
                    element => element.innerHTML = response.total
                );
            });
        }


        // function loadYoutube(url_end_point, params) {
        //     getRequest(url_end_point, params, function (response) {
        //         response = JSON.parse(response);
        //         var items = response.items,
        //             nextPageToken = response.nextPageToken,
        //             total = response.total;
        //         var apiResults = [];
        //         items.forEach(item => {
        //             let title = item.title,
        //                 description = item.description,
        //                 videoId = item.videoId,
        //                 thumbnail = item.thumbnail,
        //                 channelTitle = item.channelTitle;
        //             apiResults.push({
        //                 title: title,
        //                 url: `https://www.youtube.com/watch?v=${videoId}`,
        //                 desc: description,
        //                 author: channelTitle,
        //                 img: thumbnail
        //             });
        //         })
        //         var apiPaginator = {total: total, start: 1};
        //         buildHtml(apiResults, apiPaginator);
        //     });
        // }

        // function loadIMC(url_end_point, params, body) {
        //     postRequestRaw(url_end_point, params, body, function (response) {
        //         response = JSON.parse(response);
        //         var total = response.Meta.totalItems;
        //         var start = perpage * (parseInt(params.currentpage) - 1) + 1;
        //         var allData = response.Response.data;
        //         var apiResults = [];
        //         for (let i = 0; i < allData.length; i++) {
        //             let data = allData[i];
        //             let title = data.relationships.titles[0].attributes.text;
        //             let url = data.links.self.replace("imediacities.hpc.cineca.it/api", "imediacities.hpc.cineca.it/app/catalog")
        //             let author = "";
        //             try {
        //                 var desc = data.relationships.descriptions[1].attributes.text;
        //             } catch (e) {
        //                 desc = ""
        //             }
        //             let img = data.links.thumbnail;
        //             apiResults.push({title: title, url: url, desc: desc, author: author, img: img})
        //         }
        //         var apiPaginator = {total: total, start: start};
        //         buildHtml(apiResults, apiPaginator);
        //     });
        // }

        // function loadEuropeana(url_end_point, params) {
        //     getRequest(url_end_point, params, function (response) {
        //         response = JSON.parse(response);
        //         var items = response['items'];
        //         var total = response['total'];
        //         var start = parseInt(params['start']);
        //         var apiResults = [];
        //
        //         for (let i = 0; i < items.length; i++) {
        //             let item = items[i];
        //             if (item.hasOwnProperty('dcCreator')) {
        //                 var creator = item['dcCreator'][0];
        //                 creator = creator.split(", ");
        //                 creator = creator.reverse().join(" ");
        //                 var title = item['title'][0] + " | " + creator;
        //             } else {
        //                 title = item['title'][0];
        //             }
        //             let post_url = item['guid'];
        //             let desc = item['dcDescription'];
        //             desc = desc ? desc.join("; ") : "";
        //             let provider = item['dataProvider'][0];
        //             let img = item['edmPreview'] ? item['edmPreview'][0] : null;
        //             apiResults.push({title: title, url: post_url, desc: desc, author: provider, img: img});
        //         }
        //         var apiPaginator = {total: total, start: start};
        //         buildHtml(apiResults, apiPaginator);
        //     });
        // }

        // function loadZenodo(url_end_point, params) {
        //     getRequest(url_end_point, params, function (response) {
        //         response = JSON.parse(response);
        //         var hits = response['hits']['hits'];
        //         var apiResults = [];
        //         hits.map(hit => {
        //             let metadata = hit['metadata'];
        //             let title = metadata['title'];
        //             let description = metadata['description'].slice(0, 300);
        //             let creators = metadata['creators'].map(c => c['name']).join(";");
        //             let url = hit['links']['html'];
        //             apiResults.push({title: title, url: url, desc: description, author: creators});
        //         });
        //         var total = response['hits']['total'];
        //         var start = perpage * (parseInt(params['page']) - 1) + 1;
        //         var apiPaginator = {total: total, start: start};
        //         buildHtml(apiResults, apiPaginator);
        //     });
        //
        // }

        // function loadScidirScopus(url_end_point, params) {
        //     getRequest(url_end_point, params,
        //         function (response) {
        //             response = JSON.parse(response);
        //
        //             var apiResults = [];
        //             var search_results = response['search-results'];
        //             var entries = search_results['entry'];
        //             var link = search_results['link'];
        //
        //             for (let i = 0; i < entries.length; i++) {
        //                 let entry = entries[i];
        //                 if (entry['link'] && entry['dc:title']) {
        //                     let title = entry['dc:title'];
        //                     if (platform === 'scopus') {
        //                         var post_url = entry['link'][2]['@href'];
        //                         var prism = `${entry['prism:publicationName']}, Volume ${entry['prism:volume']}, ${entry['prism:coverDate']}`;
        //                         var creator = entry['dc:creator'];
        //                     } else if (platform === 'science direct') {
        //                         post_url = entry['link'][1]['@href'];
        //                         prism = `${entry['prism:publicationName']}, Volume ${entry['prism:volume']}, ${entry['prism:coverDate']}, ${entry['prism:startingPage']}`;
        //                         creator = entry['authors'] ? entry['authors']['author'] : '';
        //                         if (creator.constructor === Array) creator = creator.map(x => x['$']).join(", ");
        //                     }
        //                     apiResults.push({title: title, url: post_url, desc: prism, author: creator});
        //                 }
        //             }
        //             var linkMap = {};
        //             for (let i = 0; i < link.length; i++) linkMap[link[i]['@ref']] = link[i]['@href'];
        //             var total = search_results['opensearch:totalResults'];
        //             var start = parseInt(params['start']) + 1;
        //             var apiPaginator = {total: total, start: start};
        //
        //             buildHtml(apiResults, apiPaginator);
        //         }
        //     );
        // }

        // function loadGallica(url_end_point, params) {
        //     getRequest(url_end_point, params, function (response) {
        //         if (!response) return;
        //         response = JSON.parse(response);
        //         var items = response['items'];
        //         var apiResults = [];
        //         for (let i = 0; i < items.length; i++) {
        //             let item = items[i];
        //             let title = item['title'],
        //                 date = item['date'],
        //                 creator = item['creator'],
        //                 desc = item['desc'],
        //                 url = item['url'],
        //                 thumbnail = item['thumbnail'];
        //             apiResults.push({
        //                 title: title,
        //                 url: url,
        //                 desc: desc,
        //                 author: creator,
        //                 img: thumbnail
        //             });
        //         }
        //         var start = parseInt(params['start']);
        //         var apiPaginator = {total: response['total'], start: start};
        //         buildHtml(apiResults, apiPaginator);
        //     });
        // }

        function buildHtml(apiResults, apiPaginator, append = false, type = 'post') {
            if (append) {
                html = container.getElementsByClassName('api-results')[0];
                if (!apiPaginator.more) container.lastChild.style.display = 'none';
            } else {
                if (container) container.innerHTML = '';
                var html = document.createElement('div');
                html.className = "api-results";
            }

            for (let i = 0; i < apiResults.length; i++) {
                let postCont = document.createElement('div');
                postCont.className = `api-result-${type}`;
                html.appendChild(postCont);
                let apiResult = apiResults[i];
                let author = apiResult['author'] ? apiResult['author'] : "";
                let desc = apiResult['desc'] ? apiResult['desc'] : "";
                let textDom = document.createElement('div');

                let sourceImgDom = apiResult.sourceImg ? `<img src="Images/resources/${apiResult.sourceImg}">` : "";
                textDom.innerHTML = `<table class="api-result">
                <tr class="api-url"><td colspan="2">${sourceImgDom}${apiResult.source}</td></tr>
                <tr class="api-title"><td colspan="2"><a href="${apiResult['url']}" target="_blank">${apiResult.title}</a></td></tr>
                <tr class="api-pub"><td><img src="Images/description.png"></td><td>${desc}</td></tr>
                <tr class="api-creator"><td><img src="Images/author.png"></td><td>${author}</td></tr>
                </table>`;
                postCont.appendChild(textDom);

                if (apiResult['img']) {
                    textDom.className = `api-result-text-${type}`;
                    let imgDom = document.createElement('div');
                    imgDom.innerHTML = `<img class="api-img" src="${apiResult['img']}">`;
                    imgDom.className = `api-result-img-${type}`;
                    let imgCont = document.createElement('a');
                    imgCont.href = apiResult['url'];
                    imgCont.target = '_blank';
                    let imgSpan = document.createElement('span');
                    imgSpan.className = `api-result-span-${type}`;
                    imgDom.appendChild(imgSpan);
                    imgCont.append(imgDom);

                    postCont.appendChild(imgCont);
                } else {
                    textDom.className = 'api-results-text-full';
                }
            }

            if (!html.hasChildNodes()) html.innerText = 'No result!';
            else {
                let header = document.createElement('div');
                header.className = "api-results-header";
                // header.style = "font-size: 16px; padding: 10px 0 0 0";

                if (platform === 'scopus') header.innerHTML = `<i>Results found for <b>${place_name}</b> in Arts and Humanities</i>:`;
                else if (platform === 'publications') header.innerHTML = `<i>Results found for <b>${place_name}</b> in 
                    <a target="_blank" href="https://gallica.bnf.fr/accueil/en/content/accueil-en?mode=desktop"><img src="Images/resources/gallica.png"></a>
                    <a target="_blank" href="https://www.scopus.com/"><img src="Images/resources/scopus.svg"></a>
                    <a target="_blank" href="https://www.europeana.eu/portal/en"><img src="Images/resources/europeana_logo_40px.png"></a>
                    <a target="_blank" href="https://www.tandfonline.com/"><img src="Images/resources/TAF.jpeg"></a>
                    </i>:`;
                else if (platform === 'images') header.innerHTML = `<i>Results found for <b>${place_name}</b> in 
                    <a target="_blank" href="https://www.google.com/imghp?hl=EN"><img src="Images/resources/google_images.svg"></a>
                    <a target="_blank" href="https://www.bing.com/?scope=images&nr=1&FORM=NOFORM"><img src="Images/resources/bing.jpeg"></a>
                    </i>:`;
                else if (platform === 'videos') header.innerHTML = `<i>Results found for <b>${place_name}</b> in 
                    <a target="_blank" href="https://www.youtube.com/"><img src="Images/resources/youtube.png"></a>
                    <a target="_blank" href="https://vimeo.com/"><img src="Images/resources/vimeo.png"></a>
                    <a target="_blank" href="https://imediacities.hpc.cineca.it/app/catalog"><img src="Images/resources/IMC.png"></a>
                    </i>:`;
                else if (platform === 'google') header.innerHTML = `<i>Results found for <b>${place_name}</b> in 
                    <a target="_blank" href="https://www.google.com/"><img src="Images/resources/google.svg"></a>
                    </i>:`;
                else header.innerHTML = `<i>Results found for <b>${place_name}</b></i>:`;
                if (!append) html.insertBefore(header, html.firstChild);
                // html.appendChild(buildPaginator(apiPaginator));
            }
            if (container) {
                container.style.overflow = 'auto';
                if (!append) container.appendChild(html);
                if (!append) container.appendChild(buildLoadMoreBtn());
            }
        }

        function buildPaginator(apiPaginator) {
            var total = apiPaginator.total,
                start = apiPaginator.start;
            var end = Math.min(total, start + perpage - 1);

            var prevBtn = document.createElement('button');
            prevBtn.className = 'prev-btn';
            prevBtn.innerText = 'Prev';
            prevBtn.onclick = ev => {
                if (params.hasOwnProperty('start')) params['start'] -= perpage;
                else params['page'] -= 1;
                loadPosts(url_end_point, params);
            };

            var nextBtn = document.createElement('button');
            nextBtn.className = 'next-btn';
            nextBtn.innerText = 'Next';
            nextBtn.onclick = ev => {
                if (params.hasOwnProperty('start')) params.start += perpage;
                else if (params.hasOwnProperty('currentpage')) params.currentpage += 1;
                else params['page'] += 1;
                loadPosts(url_end_point, params);
            };

            if (start <= 1) prevBtn.disabled = true;
            if (end >= total) nextBtn.disabled = true;

            var pageStatus = document.createElement('span');
            pageStatus.className = 'page-manage';
            pageStatus.innerText = `Showing ${start}-${end} of ${total}`;

            var paginator = document.createElement('div');
            paginator.append(prevBtn, pageStatus, nextBtn);
            return paginator;
        }

        function buildLoadMoreBtn() {
            var btn = document.createElement('button');
            btn.innerHTML = 'Load more';
            btn.className = 'next-btn';
            btn.style.width = '100px';
            btn.style.margin = '0 calc(50% - 50px) 60px calc(50% - 50px)';
            btn.onclick = () => {
                if (params.hasOwnProperty('start')) params.start += perpage;
                else if (params.hasOwnProperty('currentpage')) params.currentpage += 1;
                else params['page'] += 1;
                // if(params.hasOwnProperty('nextPageToken')) params.pageToken = apiResults
                loadPosts(url_end_point, params, true);
            }
            return btn;
        }
    }
}