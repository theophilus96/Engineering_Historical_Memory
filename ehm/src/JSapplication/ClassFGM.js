import {HistMap} from "./ClassHistMap.js";
import {getRequest} from "./httpRequest.js";

export class FgmMap extends HistMap {
    fgm_int(changePageAction) {
        this.FOLIOS = {
            1: "Ashb361_CoverR",
            2: "Ashb361_CoverV-00r",
            3: "Ashb361_00v-01r",
            4: "Ashb361_01v-02r",
            5: "Ashb361_02v-03r",
            6: "Ashb361_03v-04r",
            7: "Ashb361_04v-05r",
            8: "Ashb361_05v-06r",
            9: "Ashb361_06v-07r",
            10: "Ashb361_07v-08r",
            11: "Ashb361_08v-09r",
            12: "Ashb361_09v-10r",
            13: "Ashb361_10v-11r",
            14: "Ashb361_11v-12r",
            15: "Ashb361_12v-13r",
            16: "Ashb361_13v-14r",
            17: "Ashb361_14v-15r",
            18: "Ashb361_15v-16r",
            19: "Ashb361_16v-17r",
            20: "Ashb361_17v-18r",
            21: "Ashb361_18v-19r",
            22: "Ashb361_19v-20r",
            23: "Ashb361_20v-21r",
            24: "Ashb361_21v-22r",
            25: "Ashb361_22v-23r",
            26: "Ashb361_23v-24r",
            27: "Ashb361_24v-25r",
            28: "Ashb361_25v-26r",
            29: "Ashb361_26v-27r",
            30: "Ashb361_27v-28r",
            31: "Ashb361_28v-29r",
            32: "Ashb361_29v-30r",
            33: "Ashb361_30v-31r",
            34: "Ashb361_31v-32r",
            35: "Ashb361_32v-33r",
            36: "Ashb361_33v-34r",
            37: "Ashb361_34v-35r",
            38: "Ashb361_35v-36r",
            39: "Ashb361_36v-37r",
            40: "Ashb361_37v-38r",
            41: "Ashb361_38v-39r",
            42: "Ashb361_39v-40r",
            43: "Ashb361_40v-41r",
            44: "Ashb361_41v-42r",
            45: "Ashb361_42v-43r",
            46: "Ashb361_43v-44r",
            47: "Ashb361_44v-45r",
            48: "Ashb361_45v-46r",
            49: "Ashb361_46v-47r",
            50: "Ashb361_47v-48r",
            51: "Ashb361_48v-49r",
            52: "Ashb361_49v-50r",
            53: "Ashb361_50v-51r",
            54: "Ashb361_51v-52r",
            55: "Ashb361_52v-53r",
            56: "Ashb361_53v-54r",
            57: "Ashb361_54v-ReggA46/9bis_000Ir",
            58: "ReggA46/9bis_000Iv -ReggA46/9bis_00IIr",
            59: "ReggA46/9bis_00IIv -ReggA46/9bis0IIIr",
            60: "ReggA46/9bis_0IIIv -ReggA46/9bisIIIIr",
            61: "ReggA46/9bis_IIIIv"
        };
        this.totalPage = 61;
        // this.createNextBtn();
        // this.createPrevBtn();
        this.changePageAction = changePageAction;
        this.thumbnailContainer = document.createElement('div');
        this.thumbnailContainer.className = "thumb-control ol-control";
        this.histMap.addControl(new ol.control.Control({element: this.thumbnailContainer}));
        this.createPageSlider();
    }

    createPageSlider() {
        var currentPage = this.getCurrentPage();
        var slider = this.pageSlider = document.createElement('input');
        var label = this.pageLabel = document.createElement('label');
        var sliderCont = document.createElement('div');
        sliderCont.append(slider, label);
        var nextBtn = document.createElement('button');
        nextBtn.innerText = '>';
        var prevBtn = document.createElement('button');
        prevBtn.innerText = '<';
        this.thumbnailContainer.append(prevBtn, sliderCont, nextBtn);

        slider.className = 'page-slider';
        slider.type = 'range';
        slider.min = 1;
        slider.max = this.totalPage;
        label.className = 'page-slider-label';
        this.setPageSlider(currentPage)

        slider.oninput = () => this.setPageSlider(slider.value);
        slider.onchange = () => this.loadPage(slider.value);

        nextBtn.onclick = () => {
            var page = this.getCurrentPage() + 1;
            if (page > this.totalPage) return;
            this.setPageSlider(page)
            this.loadPage(page);
        }

        prevBtn.onclick = () => {
            var page = this.getCurrentPage() - 1;
            if (page < 1) return;
            this.setPageSlider(page);
            this.loadPage(page);
        }
    }

    setPageSlider(page) {
        this.pageSlider.value = page;
        this.pageLabel.innerText = `${page}. ${this.FOLIOS[page]}`;
        this.pageLabel.style.left = `calc(${(page - 1) / this.totalPage * 100}% - ${this.pageLabel.offsetWidth / 2}px + 15px)`;
    }

    loadPage(page) {
        var urls = this.zoomifyUrl.split("/");
        urls[urls.length - 2] = page;
        this.zoomifyUrl = urls.join("/");
        var layer = new ol.layer.Tile({
            source: new ol.source.Zoomify({
                url: this.zoomifyUrl,
                size: [this.imgWidth, this.imgHeight],
            })
        });
        this.histMap.getLayers().forEach(l => this.histMap.removeLayer(l));

        this.histMap.setView(new ol.View({
            projection: new ol.proj.Projection({
                code: 'ZOOMIFY',
                units: 'pixels',
                extent: [0, -this.imgHeight, this.imgWidth, 0]
            }),
            center: this.initialCenter,
            zoom: this.minLayer,
            extent: [0, -this.imgHeight, this.imgWidth, 0]
        }));
        this.histMap.addLayer(layer);
        this.changePageAction(page);
        // this.highlightThumbnail();
    }


    createPaginator() {
        var pageManage = document.createElement('div');
        var pageInput = document.createElement('input');
        this.pageInput = pageInput;
        var pageTotal = document.createElement('span');
        pageInput.type = 'number';
        pageInput.value = this.getCurrentPage();
        pageInput.max = this.totalPage;
        pageInput.min = 1;
        pageTotal.innerText = ` / ` + this.totalPage;
        pageManage.append(pageInput, pageTotal);

        var element = document.createElement('div');
        element.className = 'fgm-page-manage ol-control';
        element.append(pageManage);

        var control = new ol.control.Control({element: element});
        this.histMap.addControl(control);

        pageManage.onkeydown = ev => {
            if (ev.keyCode != 13) return;
            var page = pageInput.value > this.totalPage ? this.totalPage : pageInput.value < 1 ? 1 : pageInput.value;
            this.loadPage(page);
        };
    }

    createNextBtn() {
        var btn = document.createElement('button');
        btn.innerText = '>';

        var element = document.createElement('div');
        element.className = 'next-page-btn ol-control';
        element.append(btn);

        var control = new ol.control.Control({element: element});
        this.histMap.addControl(control);

        btn.onclick = () => {
            var page = this.getCurrentPage() + 1;
            if (page > this.totalPage) return;
            this.loadPage(page);
        }
    }

    createPrevBtn() {
        var btn = document.createElement('button');
        btn.innerText = '<';

        var element = document.createElement('div');
        element.className = 'prev-page-btn ol-control';
        element.append(btn);

        var control = new ol.control.Control({element: element});
        this.histMap.addControl(control);

        btn.onclick = () => {
            var page = this.getCurrentPage() - 1;
            if (page < 1) return;
            this.loadPage(page);
        }
    }

    createSearchBar() {
        var _thisRef = this;

        var searchBox = document.createElement('input');
        searchBox.className = 'hist-search-box';
        searchBox.id = 'histSearchBox';
        searchBox.setAttribute("type", "text");
        searchBox.setAttribute("placeholder", "Search..");

        this.searchBox = searchBox;

        var searchIcon = document.createElement("i");
        searchIcon.className = "fa fa-search";

        var searchButton = document.createElement('button');
        searchButton.setAttribute('type', 'submit');
        searchButton.className = "hist-search-button";
        searchButton.appendChild(searchIcon);

        var searchDiv = document.createElement('div');
        searchDiv.append(searchBox, searchButton);
        searchDiv.style.height = '28px';

        var searchBar = document.createElement('div');
        searchBar.className = 'ol-control hist-search-bar tooltip';
        searchBar.appendChild(searchDiv);

        this.histMap.addControl(new ol.control.Control({element: searchBar}));

        searchBox.addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                searchButton.click();
            }
        });


        searchButton.onclick = function () {
            var keyword = searchBox.value;
            if (!keyword) return;
            keyword = keyword.toLowerCase();
            getRequest("controller/searchMap.php", {map: _thisRef.mapType, tkey: keyword}, function (response) {
                var searchResults = JSON.parse(response).results;
                // searchResults = searchResults.map(r => r.result);
                _thisRef.searchResults = searchResults;
                _thisRef.currentResults = [];
                _thisRef.setFilter();
                _thisRef.searchAction(searchResults, keyword);
                var thumbnails = searchResults.map(r => r.page.split("|")).flat();
                thumbnails = Array.from(new Set(thumbnails));
                thumbnails = thumbnails.map(t => ({page: t}));
                _thisRef.createThumbnail(thumbnails);
            });
        };
    }

    createThumbnail(thumbnails) {
        var _thisRef = this;
        this.thumbnailContainer.innerHTML = '';
        var maxThumbnail = 3;
        var thumbnailStart = 0;
        var thumbsContainer = document.createElement('div');
        thumbsContainer.className = "thumb-cont";
        var nextBtn = document.createElement('button');
        nextBtn.innerHTML = ">";
        var prevBtn = document.createElement('button');
        prevBtn.innerHTML = "<";
        if (thumbnailStart < maxThumbnail) prevBtn.disabled = true;
        this.thumbnailContainer.append(prevBtn, thumbsContainer, nextBtn);

        loadThumbnail(thumbnailStart);

        nextBtn.onclick = function () {
            if (thumbnailStart + maxThumbnail >= thumbnails.length) return;
            thumbnailStart += maxThumbnail;
            loadThumbnail(thumbnailStart);
            if (thumbnailStart + maxThumbnail >= thumbnails.length) this.disabled = true;
            prevBtn.disabled = false;
        }
        prevBtn.onclick = function () {
            if (thumbnailStart < maxThumbnail) return;
            thumbnailStart -= maxThumbnail;
            loadThumbnail(thumbnailStart);
            if (thumbnailStart < maxThumbnail) this.disabled = true;
            nextBtn.disabled = false;
        }

        // thumbsContainer.style.width = 80 * thumbsContainer.childElementCount + "px";

        function loadThumbnail(start) {
            thumbsContainer.innerHTML = "";

            for (let i = start; i < start + maxThumbnail; i++) {
                let thumb = thumbnails[i];
                if (!thumb) continue;
                let thumbContainer = document.createElement('div');
                if (!thumb.page) continue;
                // let page = thumb.page.split("|")[0];
                let page = thumb.page;
                let folio = _thisRef.FOLIOS[page];
                thumbContainer.innerHTML = `<span>${folio}</span><img src='Zoomify/FGM_Zoomify/${page}/TileGroup0/0-0-0.jpg'>`;
                thumbContainer.setAttribute("page", page);
                thumbsContainer.appendChild(thumbContainer);
                thumbContainer.onclick = function () {
                    _thisRef.loadPage(page);
                }
            }
            _thisRef.highlightThumbnail();
        }
    }

    highlightThumbnail() {
        // var currentPage = this.getCurrentPage();
        // var thumbsContainer = this.thumbnailContainer.getElementsByTagName("div")[0];
        // thumbsContainer.childNodes.forEach(cont=>{
        //     if(cont.getAttribute("page") == currentPage) cont.style.backgroundColor = "rgba(255,255,255,.4)";
        //     else cont.style.backgroundColor = "";
        // })
    }

    getCurrentPage() {
        var urls = this.zoomifyUrl.split("/");
        return parseInt(urls[urls.length - 2]);
    }
}