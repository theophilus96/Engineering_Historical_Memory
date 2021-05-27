import {getRequest} from "./httpRequest.js";
import {FIELDS, POST_NAMES} from "./config.js";

export class TextContent {
    constructor(all_post_container, map_type, results, clickAction) {
        const map_fields = FIELDS[map_type];
        this.post_id_field = map_fields.post_id;
        this.post_title_field = map_fields.post_title;
        this.post_date_fr_field = map_fields.post_title;
        this.post_pre_content_field = map_fields.post_pre_content;
        this.post_content_ori_field = map_fields.post_content_ori;
        this.post_content_en_field = map_fields.post_content_en;
        this.post_note_field = map_fields.post_note;
        this.post_type_field = map_fields.post_type;
        this.temp = 0;

        this.map_type = map_type;
        this.clickAction = clickAction;
        // this.perPage = 10;
        this.currentPage = 1;
        this.totalResults = results;
        this.setResults(results);

        this.text_content_cont = document.getElementById(all_post_container);

        this.posts_pre = document.createElement('div');
        this.posts_pre_cont1 = document.createElement('div');
        this.posts_pre_intro = document.createElement('div');
        this.posts_pre_intro.className = 'posts-intro';

        this.post_view_cont = document.createElement('div');
        this.post_view_cont.className = this.posts_pre.className = this.posts_pre_cont1.className = 'posts-container';
        this.backBtn = document.createElement('button');
        this.nextBtn = document.createElement('button');
        this.prevBtn = document.createElement('button');
        this.pageManage = document.createElement('div');

        this.navigator = this.createNavigator();
        this.paginator = this.createPaginator();

        this.text_content_cont.append(this.navigator, this.posts_pre, this.posts_pre_cont1, this.post_view_cont);

        this.posts_pre.appendChild(this.posts_pre_intro, this.paginator);
        this.posts_pre_cont1.appendChild(this.posts_pre_intro, this.paginator);
        this.setIntro();
        this.showLoading();
    }

    createPostPreCont(results) {
        var container = document.createElement('div');
        container.className = 'posts-container';
        var paginator = this.createPaginator();
        for (let i = 0; i < results.length; i++) {
            let new_post_preview = this.buildPreviewPostHtml(results[i]);
            container.insertBefore(new_post_preview, paginator);
        }
    }

    filterResults(results) {
        var _thisRef = this;
        const resultsMap = results.reduce(function (result, item) {
            result[item[_thisRef.post_id_field]] = item;
            return result;
        }, {});
        const resultsFilter = Object.values(resultsMap);
        resultsFilter.sort((a, b) => a[this.post_date_fr_field] > b[this.post_date_fr_field] ? 1 : -1);
        return resultsFilter;
    }

    modifyResults(results) {
        this.temp = 1;
        this.backBtn.disabled = false;
        this.setResults(results);
    }

    setResults(results) {
        this.results = this.filterResults(results);
        // this.currentPage = 1;
        // this.totalPage = Math.ceil(this.results.length / this.perPage);
    }

    removePosts() {
        document.querySelectorAll('.post-pre-container').forEach(e => e.remove());
    }

    reload(results, clicked = true) {
        this.totalResults = results;
        this.showPostPreview();
        if (this.posts_pre.contains(this.content_loader)) this.posts_pre.removeChild(this.content_loader);
        if (results) this.modifyResults(results);
        this.setPageManage();
        this.removePosts();
        this.prevBtn.disabled = this.currentPage === 1;
        this.nextBtn.disabled = this.currentPage === this.totalPage;
        for (let i = 0; i < results.length; i++) {
            let new_post_preview = this.buildPreviewPostHtml(results[i]);
            this.posts_pre.insertBefore(new_post_preview, this.paginator);
        }
        this.posts_pre = new PostPreCont(results);

        if (this.results && this.results.length === 1 && clicked) {
            this.showPostContent();
            this.text_content_cont.scrollTop = 0;
            this.backBtn.disabled = false;
            this.buildFullPostHtml(this.results[0]);
            this.clickAction(this.totalResults, result[this.post_id_field]);
        }
    }

    // initialLoad(results, clicked) {
    //     this.reload(results, clicked);
    //     // if (results.length) this.reload(results, clicked);
    //     // else this.reload(this.totalResults, clicked);
    // }

    showPostContent() {
        this.posts_pre.style.display = 'none';
        this.post_view_cont.style.display = 'block';
    }

    showPostPreview() {
        this.posts_pre.style.display = "block";
        this.post_view_cont.style.display = "none";
    }

    showLoading() {
        this.content_loader = this.createLoader('content-load-cont');
        this.posts_pre.insertBefore(this.content_loader, this.paginator);
    }

    buildPreviewPostHtml(result) {
        var post_pre_title = document.createElement('div');
        post_pre_title.className = 'post-pre-title';
        post_pre_title.innerHTML = result[this.post_title_field];

        var post_pre_content = document.createElement('div');
        post_pre_content.className = 'post-pre-content';
        post_pre_content.innerHTML = `${result[this.post_pre_content_field]}...`;

        var post_pre_container = document.createElement('div');
        post_pre_container.className = 'post-pre-container';
        // post_pre_container.name = result[this.post_id_field];

        post_pre_container.appendChild(post_pre_title);
        post_pre_container.appendChild(post_pre_content);

        post_pre_container.onclick = evt => {
            var post_id = result[this.post_id_field];
            var post_type = result[this.post_type_field];
            getRequest('controller/searchMap.php', {map: post_type, pid: post_id}, response => {
                this.showPostContent();
                this.text_content_cont.scrollTop = 0;
                this.backBtn.disabled = false;
                this.buildFullPostHtml(JSON.parse(response).results[0]);
                this.clickAction(this.totalResults, result[this.post_id_field]);
            });

        };
        return post_pre_container;
    }

    buildFullPostHtml(result) {
        var _thisRef = this;
        this.post_view_cont.innerHTML = "";

        buildHtml(this.post_title_field, 'post-title');
        var post_content_ori = buildHtml(this.post_content_ori_field, 'post-content');
        var post_content_en = buildHtml(this.post_content_en_field, 'post-content');
        buildHtml(this.post_note_field, 'post-note');

        if (post_content_ori && !post_content_en) post_content_ori.style.width = '94%';
        else if (!post_content_ori && post_content_en) post_content_en.style.width = '94%';

        function buildHtml(field, css_class) {
            var text_content = result[field];
            if (!text_content) return;
            var element = document.createElement('div');
            element.className = css_class;
            element.innerHTML = text_content;
            _thisRef.post_view_cont.appendChild(element);

            var aDoms = element.getElementsByTagName('a');
            var extIframeDom = document.createElement('iframe');
            var extDivClose = document.createElement('span');
            extDivClose.innerHTML = '&times;';
            var extDivDom = document.createElement('div');
            extDivDom.className = 'ext-post';
            extDivDom.append(extIframeDom, extDivClose);

            for (let aDom of aDoms) {
                aDom.onclick = function (e) {
                    e.preventDefault();
                    extDivDom.style.display = 'block';
                    extIframeDom.src = this.href;
                    this.after(extDivDom);
                }
            }

            extDivClose.onclick = function () {
                extDivDom.style.display = 'none';
            };

            return element;
        }
    }

    createNavigator() {
        var backIcon = document.createElement('i');
        backIcon.className = 'fa fa-angle-left';

        this.backBtn.className = 'back-btn';
        this.backBtn.disabled = true;
        this.backBtn.appendChild(backIcon);
        this.backBtn.onclick = () => {
            if (this.posts_pre.style.display === "none") {
                this.showPostPreview();
            } else {
                this.reload(this.totalResults);
                this.temp = 0;
                this.setIntro();
            }
            if (!this.temp) this.backBtn.disabled = true
        };

        var navigator = document.createElement("div");
        navigator.className = 'post-nav';
        navigator.appendChild(this.backBtn);

        this.filterBtn1 = this.createFilter1();
        this.filterBtn2 = this.createFilter2();
        var loaderContainer = this.createLoader('filter-load-cont');
        this.filter_loader = loaderContainer.firstChild;
        var navigatorDesc = document.createElement('span');
        navigatorDesc.className = 'filter-desc';
        navigatorDesc.innerText = "Search:";
        navigator.append(loaderContainer, this.filterBtn2, this.filterBtn1, navigatorDesc);

        this.text_content_cont.appendChild(navigator);
        return navigator;
    }

    createLoader(divClass) {
        var loader = document.createElement('div');
        loader.className = 'loadingIcon';

        var loaderDiv = document.createElement('div');
        loaderDiv.className = divClass;
        loaderDiv.appendChild(loader);

        return loaderDiv;
    }

    createFilter1() {
        var filterBtn = document.createElement('select');
        filterBtn.className = 'filter-btn';

        var options = {
            'all': 'Chronologically',
            'place': 'Places',
            'goods': 'Trade and Commerce',
            'government': 'Governments',
            'people': 'People',
            'event': 'Events',
        };

        // var options = {
        //     'all': 'All sources',
        //     'mc': 'The Morosini Codex (1095-1433 CE)',
        //     'mp': 'Marco Polo, The Description of the World',
        //     'cm': 'The Castle of Modon (Peloponnese, Greece)',
        // };

        Object.keys(options).map(key => {
            var dom = document.createElement('option');
            dom.value = key;
            dom.innerText = options[key];
            filterBtn.appendChild(dom);
        });

        var _thisRef = this;
        filterBtn.onchange = function () {
            if (this.value === 'all') {
                var option = document.createElement('option');
                option.innerHTML = '--------------------------';
                _thisRef.filterBtn2.innerHTML = '';
                _thisRef.filterBtn2.appendChild(option);

                var params = {
                    map: _thisRef.map_type,
                };

                _thisRef.filter_loader.style.display = 'block';
                getRequest("controller/searchMap.php", params, response => {
                    _thisRef.setIntro();
                    _thisRef.reload(JSON.parse(response));
                    _thisRef.filter_loader.style.display = 'none';
                });
            } else {
                params = {
                    map: _thisRef.map_type,
                    tcat: this.value,
                };
                _thisRef.filter_loader.style.display = 'block';

                getRequest("controller/searchFilter.php", params, response => {
                    var categories = JSON.parse(response);
                    _thisRef.setFilter2(this.value, categories);
                    _thisRef.filter_loader.style.display = 'none';
                });
            }
        };
        return filterBtn;
    }

    createFilter2(categories) {
        var filterBtn = document.createElement('select');
        filterBtn.className = 'filter-btn';
        var option = document.createElement('option');
        option.innerHTML = '--------------------------';
        filterBtn.appendChild(option);
        return filterBtn;
    }

    setFilter2(chosenFilter, categories) {
        var _thisRef = this;

        this.filterBtn2.innerHTML = '';
        var firstOpt = document.createElement('option');
        firstOpt.innerText = `Select ${chosenFilter}`;
        this.filterBtn2.appendChild(firstOpt);

        categories.map(cat => {
            var dom = document.createElement('option');
            dom.value = cat;
            dom.innerText = cat;
            this.filterBtn2.appendChild(dom);
        });

        this.filterBtn2.onchange = function () {
            _thisRef.filter_loader.style.display = 'block';
            var url = "controller/searchMap.php";
            var params = {
                map: _thisRef.map_type,
                tkey: this.value,
                tcat: _thisRef.filterBtn1.value,
            };
            getRequest(url, params, response => {
                _thisRef.filter_loader.style.display = 'none';
                _thisRef.setIntro(this.value);
                _thisRef.reload(JSON.parse(response));
            });
        };
    }


    createPaginator() {
        var nextBtn = document.createElement('button');
        var prevBtn = document.createElement('button');
        var pageManage = document.createElement('div');
        var currentPage = 1;

        nextBtn.className = "next-btn";
        prevBtn.className = "prev-btn";
        nextBtn.innerHTML = "Next";
        prevBtn.innerHTML = "Prev";
        pageManage.className = "page-manage";

        var paginator = document.createElement('div');
        paginator.className = 'post-paginator';
        paginator.appendChild(prevBtn);
        paginator.appendChild(pageManage);
        paginator.appendChild(nextBtn);

        prevBtn.onclick = ev => {
            if (currentPage <= 1) return;
            currentPage -= 1;
            this.request();
        };

        nextBtn.onclick = ev => {
            if (currentPage >= this.totalPage) return;
            currentPage += 1;
            this.request();
        };
        return paginator;
    }

    // createPaginator() {
    //     this.nextBtn.className = "next-btn";
    //     this.prevBtn.className = "prev-btn";
    //     this.nextBtn.innerHTML = "Next";
    //     this.prevBtn.innerHTML = "Prev";
    //     this.pageManage.className = "page-manage";
    //
    //     var paginator = document.createElement('div');
    //     paginator.className = 'post-paginator';
    //     paginator.appendChild(this.prevBtn);
    //     paginator.appendChild(this.pageManage);
    //     paginator.appendChild(this.nextBtn);
    //
    //     this.prevBtn.onclick = ev => {
    //         if (this.currentPage <= 1) return;
    //         this.currentPage -= 1;
    //         this.request();
    //     };
    //
    //     this.nextBtn.onclick = ev => {
    //         if (this.currentPage >= this.totalPage) return;
    //         this.currentPage += 1;
    //         this.request();
    //     };
    //     return paginator;
    // }

    request() {
        getRequest('controller/searchMap.php', {p: this.currentPage, map: this.map_type}, response => {
            response = JSON.parse(response);
            this.reload(response.results);
            this.setPageManage();
        });
    }

    setPageManage() {
        this.pageManage.innerHTML = `${this.currentPage} / ${this.totalPage}`;
    }

    setIntro(text) {
        if (!text) text = POST_NAMES[this.map_type];
        this.posts_pre_intro.innerHTML = `Results for <strong>${text}</strong>:`;
    }
}

class PostPreCont {
    constructor(results) {
        const map_fields = FIELDS[map_type];
        this.post_id_field = map_fields.post_id;
        this.post_title_field = map_fields.post_title;
        this.post_date_fr_field = map_fields.post_title;
        this.post_pre_content_field = map_fields.post_pre_content;
        this.post_content_ori_field = map_fields.post_content_ori;
        this.post_content_en_field = map_fields.post_content_en;
        this.post_note_field = map_fields.post_note;
        this.post_type_field = map_fields.post_type;
        this.results = results;
        this.currentPage = 1;

        this.container = this.init(results);
    }

    init(results) {
        var container = document.createElement('div');
        container.className = 'posts-container';
        this.intro = this.createIntro();
        this.paginator = this.createPaginator();
        container.append(this.intro, this.paginator);
        for (let i = 0; i < results.length; i++) {
            let new_post_preview = this.buildPreviewPostHtml(results[i]);
            container.insertBefore(new_post_preview, this.paginator);
        }
        return container;
    }

    createIntro() {
        var posts_pre_intro = document.createElement('div');
        posts_pre_intro.className = 'posts-intro';
        return posts_pre_intro;
    }

    createPaginator() {
        this.nextBtn = document.createElement('button');
        this.prevBtn = document.createElement('button');
        this.pageManage = document.createElement('div');
        this.nextBtn.className = "next-btn";
        this.prevBtn.className = "prev-btn";
        this.nextBtn.innerHTML = "Next";
        this.prevBtn.innerHTML = "Prev";
        this.pageManage.className = "page-manage";

        var paginator = document.createElement('div');
        paginator.className = 'post-paginator';
        paginator.appendChild(this.prevBtn);
        paginator.appendChild(this.pageManage);
        paginator.appendChild(this.nextBtn);

        this.prevBtn.onclick = ev => {
            if (this.currentPage <= 1) return;
            this.currentPage -= 1;
            // this.request();
        };

        this.nextBtn.onclick = ev => {
            if (this.currentPage >= this.totalPage) return;
            this.currentPage += 1;
            // this.request();
        };
        return paginator;
    }
    buildPreviewPostHtml(result) {
        var post_pre_title = document.createElement('div');
        post_pre_title.className = 'post-pre-title';
        post_pre_title.innerHTML = result[this.post_title_field];

        var post_pre_content = document.createElement('div');
        post_pre_content.className = 'post-pre-content';
        post_pre_content.innerHTML = `${result[this.post_pre_content_field]}...`;

        var post_pre_container = document.createElement('div');
        post_pre_container.className = 'post-pre-container';

        post_pre_container.append(post_pre_title, post_pre_content);

        post_pre_container.onclick = evt => {
            var post_id = result[this.post_id_field];
            var post_type = result[this.post_type_field];
            getRequest('controller/searchMap.php', {map: post_type, pid: post_id}, response => {
                this.showPostContent();
                this.text_content_container.scrollTop = 0;
                this.backBtn.disabled = false;
                this.buildFullPostHtml(JSON.parse(response).results[0]);
                this.clickAction(this.totalResults, result[this.post_id_field]);
            });

        };
        return post_pre_container;
    }
}