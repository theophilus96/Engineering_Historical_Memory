import {getRequest, postRequestForm} from "./httpRequest.js";
import {FIELDS, POST_NAMES} from "./config.js";
import {createBtnWithTooltip, SAVE_ICON} from "./createBtn.js";

const WEB_PRACTICE_PAGES = ['vis', 'sr', 'raj'];

export class TextContent {
    constructor(all_post_container, map_type, clickAction, backClickAction) {
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
        this.backClickAction = backClickAction;
        this.currentPage = 1;
        this.navigator = new Navigator(map_type);

        this.text_content_cont = document.getElementById(all_post_container);
        this.text_content_cont.appendChild(this.navigator.container);
        this.init();
    }

    init() {
        this.posts_pre_cont = document.createElement('div');
        this.search_posts_pre_cont = document.createElement('div');
        this.post_view_cont = document.createElement('div');
        this.post_view_cont.id = 'full-post-cont';
        this.text_content_cont.append(this.posts_pre_cont, this.search_posts_pre_cont, this.post_view_cont);

        this.postPreview = new PostPreview(this.posts_pre_cont, this.map_type, null, null, true);
        this.state = 0;

        this.posts_pre_cont.onclick = event => this.postPreClick(event);

        this.navigator.backBtn.onclick = () => {
            this.backClickAction();
            this.showLastContainer();
        };
        this.filter1Action();
        this.filter2Action();
    }

    filter1Action() {
        var _thisRef = this;
        this.navigator.filterBtn1.onchange = function () {
            if (this.value === 'all') {
                _thisRef.navigator.resetFilter2();

                _thisRef.navigator.showLoading();
                getRequest("controller/searchMap.php", {map: _thisRef.map_type}, response => {
                    _thisRef.showContainer(0);
                    _thisRef.navigator.hideLoading();
                });
            } else {
                _thisRef.navigator.showLoading();
                getRequest("controller/searchFilter.php", {map: _thisRef.map_type, tcat: this.value}, response => {
                    var categories = JSON.parse(response);
                    _thisRef.navigator.setFilter2(this.value, categories);
                    _thisRef.navigator.hideLoading();
                });
            }
        }
    }

    filter2Action() {
        var _thisRef = this;
        this.navigator.filterBtn2.onchange = function () {
            _thisRef.showSearchResults({
                tkey: this.value,
                tcat: _thisRef.navigator.filterBtn1.value,
            }, this.value);
        };
    }

    showSearchResults(addParams, intro) {
        var _thisRef = this;
        new PostPreview(this.search_posts_pre_cont, this.map_type, addParams, intro);
        this.showContainer(1);
        this.search_posts_pre_cont.onclick = function (event) {
            _thisRef.postPreClick(event);
        }
    }

    postPreClick(event) {
        var target = event.target;
        var targetParent = target.parentElement;
        if (target.className === 'post-pre-container') ;
        else if (targetParent.className === 'post-pre-container') target = targetParent;
        else return;
        var post_id = target.getAttribute(this.post_id_field),
            post_type = target.getAttribute(this.post_type_field);
        this.loadFullPost(post_id, post_type, event.isTrusted);
    }

    loadFullPost(post_id, post_type, isClicked) {
        getRequest('controller/searchMap.php', {map: post_type, pid: post_id}, response => {
            this.navigator.showBackBtn();
            var result = JSON.parse(response).results[0];
            this.post_view = new PostFull(this.post_view_cont, this.map_type, result);
            this.showContainer(2);
            this.text_content_cont.scrollTop = 0;
            this.clickAction(result, isClicked);
        });
    }

    showLastContainer() {
        var state = this.last_state < this.state ? this.last_state : this.state - 1;
        this.showContainer(state);
    }

    showContainer(state) {
        this.last_state = this.state;
        this.state = state;
        if (this.state === 0) {
            this.posts_pre_cont.style.display = "block";
            this.search_posts_pre_cont.style.display = "none";
            this.post_view_cont.style.display = "none";
        } else if (this.state === 1) {
            this.posts_pre_cont.style.display = "none";
            this.search_posts_pre_cont.style.display = "block";
            this.post_view_cont.style.display = "none";
        } else if (this.state === 2) {
            this.posts_pre_cont.style.display = "none";
            this.search_posts_pre_cont.style.display = "none";
            this.post_view_cont.style.display = "block";
        }
        if (this.posts_pre_cont.style.display !== "block") this.navigator.showBackBtn();
        else this.navigator.hideBackBtn();
    }
}

export class PostFull {
    constructor(container, map_type, result) {
        container.innerHTML = "";
        this.container = container;
        this.container.className = 'posts-container';

        this.map_type = map_type;
        const map_fields = FIELDS[map_type];
        this.post_title_field = map_fields.post_title;
        this.post_content_ori_field = map_fields.post_content_ori;
        this.post_content_en_field = map_fields.post_content_en;
        this.post_note_field = map_fields.post_note;
        this.result = result;
        this.init(result);
    }

    init(result) {
        var _thisRef = this;

        buildNav();
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
            _thisRef.container.appendChild(element);

            var aDoms = Array.from(element.getElementsByTagName('a'));
            aDoms = aDoms.filter(a => (a.href.includes('engineeringhistoricalmemory') || a.href.includes('localhost')) && a.target !== '_blank');
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

        function buildNav() {
            var navCont = document.createElement('div');
            navCont.style.float = 'right';
            navCont.style.position = 'relative';
            _thisRef.container.appendChild(navCont);
            buildSaveBtn();

            function buildSaveBtn() {
                var [button, tooltip, container] = createBtnWithTooltip(SAVE_ICON, 'Save to notebook', 'topleft');
                navCont.appendChild(container);

                button.onclick = () => {
                    const currentUrl = window.location.pathname.split("/").pop() + window.location.search;
                    postRequestForm("controller/saveSearch.php", {}, {
                        title: result[_thisRef.post_title_field],
                        url: currentUrl,
                        map: _thisRef.map_type
                    }, response => {
                        tooltip.innerText = response;
                        setTimeout(() => {
                            tooltip.innerText = 'Save to Notebook'
                        }, 3000);
                    })
                }
            }

            function buildCiteBtn() {

            }
        }

    }
}

class PostPreview {
    constructor(container, map_type, addParams = {}, intro, isInit = false) {
        container.innerHTML = "";
        this.container = container;
        this.container.className = 'posts-container';

        this.perpage = 10;
        this.map_type = map_type;
        this.addParams = addParams;
        this.post_containers = [];

        const map_fields = FIELDS[map_type];
        this.post_id_field = map_fields.post_id;
        this.post_title_field = map_fields.post_title;
        this.post_pre_content_field = map_fields.post_pre_content;
        this.post_type_field = map_fields.post_type;
        this.currentPage = 1;
        this.isInit = isInit;
        this.getData(intro);
    }

    getData(intro) {
        this.showLoading();
        var params = Object.assign({}, {map: this.map_type, p: this.currentPage}, this.addParams);
        getRequest('controller/searchMap.php', params, response => {
            this.hideLoading();
            response = JSON.parse(response);
            this.load(response.results, response.total, intro);
            this.results = response.results;
            if (this.post_containers.length === 1) this.post_containers[0].click();
            if (WEB_PRACTICE_PAGES.includes(this.map_type) && this.isInit) {
                let filterBtn1 = document.getElementById('filterBtn1');
                response.results.forEach(r => {
                    let option = document.createElement('option');
                    option.innerText = r[this.post_title_field];
                    option.value = r.post_id;
                    filterBtn1.appendChild(option);
                })
            }
        });
    }

    load(results, total, intro) {
        this.totalPage = Math.ceil(total / this.perpage);
        this.intro = this.createIntro();
        this.setIntro(intro);
        this.paginator = this.createPaginator();

        this.container.innerHTML = "";
        this.container.append(this.intro, this.paginator);
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let post_container = this.buildPreviewPostHtml(result);
            this.post_containers.push(post_container);
            this.container.insertBefore(post_container, this.paginator);
        }
    }

    createIntro() {
        var posts_pre_intro = document.createElement('div');
        posts_pre_intro.className = 'posts-intro';
        return posts_pre_intro;
    }

    createPaginator() {
        var nextBtn = document.createElement('button');
        var prevBtn = document.createElement('button');
        var pageManage = document.createElement('div');
        var pageInput = document.createElement('input');
        var pageTotal = document.createElement('span');

        nextBtn.disabled = this.currentPage === this.totalPage;
        prevBtn.disabled = this.currentPage === 1;

        nextBtn.className = "next-btn";
        prevBtn.className = "prev-btn";
        pageManage.className = "page-manage";

        nextBtn.innerHTML = "Next";
        prevBtn.innerHTML = "Prev";

        pageInput.type = 'number';
        pageInput.value = this.currentPage;
        pageInput.max = this.totalPage;
        pageInput.min = 1;
        pageTotal.innerText = ` / ` + this.totalPage;
        pageManage.append(pageInput, pageTotal);

        var paginator = document.createElement('div');
        paginator.className = 'post-paginator';
        paginator.append(prevBtn, pageManage, nextBtn);

        prevBtn.onclick = ev => {
            if (this.currentPage <= 1) return;
            this.currentPage = parseInt(this.currentPage) - 1;
            this.getData();
        };

        nextBtn.onclick = ev => {
            if (this.currentPage >= this.totalPage) return;
            this.currentPage = parseInt(this.currentPage) + 1;
            this.getData();
        };

        pageManage.onkeydown = ev => {
            if (ev.keyCode == 13) {
                this.currentPage = pageInput.value > this.totalPage ? this.totalPage : pageInput.value < 1 ? 1 : pageInput.value;
                this.getData();
            }
        };
        return paginator;
    }


    buildPreviewPostHtml(result) {
        var title = document.createElement('div');
        title.className = 'post-pre-title';
        title.innerHTML = result[this.post_title_field];

        var content = document.createElement('div');
        content.className = 'post-pre-content';
        content.innerHTML = `${result[this.post_pre_content_field]}...`;

        var container = document.createElement('div');
        container.className = 'post-pre-container';
        container.setAttribute(this.post_id_field, result[this.post_id_field]);
        container.setAttribute(this.post_type_field, result[this.post_type_field]);

        container.append(title, content);
        return container;
    }

    setIntro(text) {
        if (!text) text = POST_NAMES[this.map_type];
        this.intro.innerHTML = `Results for <strong>${text}</strong>:`;
    }

    showLoading() {
        this.loader = this.createLoader();
        this.container.innerHTML = "";
        this.container.appendChild(this.loader);
        this.loader.style.display = 'block';
    }

    hideLoading() {
        this.container.removeChild(this.loader);
    }

    createLoader() {
        var loader = document.createElement('div');
        loader.className = 'loadingIcon';

        var loaderDiv = document.createElement('div');
        loaderDiv.className = 'content-load-cont';
        loaderDiv.appendChild(loader);

        return loaderDiv;
    }
}

class Navigator {
    constructor(map_type) {
        this.map_type = map_type;
        this.backBtn = document.createElement('button');
        this.container = this.createNavigator();
    }

    createNavigator() {
        var backIcon = document.createElement('i');
        backIcon.className = 'fa fa-angle-left';

        this.backBtn.className = 'back-btn';
        this.backBtn.disabled = true;
        this.backBtn.appendChild(backIcon);

        var container = document.createElement("div");
        container.className = 'post-nav';

        this.filterBtn1 = this.createFilter1();
        this.filterBtn2 = this.createFilter2();
        var loaderContainer = this.createLoader();
        this.filter_loader = loaderContainer.firstChild;
        var navigatorDesc = document.createElement('span');
        navigatorDesc.className = 'filter-desc';
        navigatorDesc.innerText = "Search:";
        container.append(this.backBtn, loaderContainer, this.filterBtn2, this.filterBtn1, navigatorDesc);

        return container;
    }

    createFilter1() {
        var filterBtn = document.createElement('select');
        filterBtn.id = 'filterBtn1';
        filterBtn.className = 'filter-btn';
        var options = this.map_type == 'collab' ? {'all': 'Select', 'name': 'Name', 'country': 'Country'} :
            WEB_PRACTICE_PAGES.includes(this.map_type) ? {'all': this.map_type === 'raj' ? 'All Hill Forts' : 'Tools'} :
                {
                    'all': 'Chronologically',
                    'place': 'Places',
                    'goods': 'Trade and Commerce',
                    'government': 'Governments',
                    'people': 'People',
                    'event': 'Events',
                };


        Object.keys(options).map(key => {
            var dom = document.createElement('option');
            dom.value = key;
            dom.innerText = options[key];
            filterBtn.appendChild(dom);
        });

        return filterBtn;
    }

    createFilter2(categories) {
        var filterBtn = document.createElement('select');
        filterBtn.id = 'filterBtn2';
        filterBtn.className = 'filter-btn';
        var option = document.createElement('option');
        option.innerHTML = '--------------------------';
        filterBtn.appendChild(option);
        return filterBtn;
    }

    setFilter2(chosenFilter, categories) {
        this.filterBtn2.innerHTML = '';
        var firstOpt = document.createElement('option');
        firstOpt.innerText = `Select ${chosenFilter}`;
        firstOpt.value = 'all';
        this.filterBtn2.appendChild(firstOpt);

        categories.map(cat => {
            var dom = document.createElement('option');
            dom.value = cat;
            dom.innerText = cat;
            this.filterBtn2.appendChild(dom);
        });
    }

    resetFilter2() {
        var option = document.createElement('option');
        option.innerHTML = '--------------------------';
        this.filterBtn2.innerHTML = '';
        this.filterBtn2.appendChild(option);
    }

    createLoader() {
        var loader = document.createElement('div');
        loader.className = 'loadingIcon';

        var loaderDiv = document.createElement('div');
        loaderDiv.className = 'filter-load-cont';
        loaderDiv.appendChild(loader);

        return loaderDiv;
    }

    showBackBtn() {
        this.backBtn.disabled = false;
    }

    hideBackBtn() {
        this.backBtn.disabled = true;
    }

    showLoading() {
        this.filter_loader.style.display = 'block';
    }

    hideLoading() {
        this.filter_loader.style.display = 'none';
    }
}