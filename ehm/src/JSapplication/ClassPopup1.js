import {postRequestForm} from "./httpRequest.js";
import {createBtnWithTooltip, SAVE_ICON, CITE_ICON, CLOSE_ICON} from "./createBtn.js";
import {ContempMap} from "./ClassContempMap1.js";

export class FullPopup {
    constructor(map_type, totalResults) {
        this.map_type = map_type;
        this.totalResults = totalResults;
        this.init();
    }

    init() {
        this.container = document.createElement('div');

        this.navigation = this.createNavigation();
        this.contentContainer = this.createContent();
        this.pagination = this.createPagination();

        this.container.append(this.navigation, this.contentContainer, this.pagination);
    }

    createNavigation() {
        var cont = document.createElement('div');
        cont.className = 'popup-nav';
        var closer = this.createCloser();
        var citation = this.createCitation();
        var save = this.createSave();
        cont.append(closer, citation, save);
        return cont;
    }

    createPagination() {
        var cont = document.createElement('div');
        cont.className = 'popup-pag';
        var firstDot = this.firstPagDot = document.createElement('span');
        firstDot.className = 'popup-pag-dot';
        var secondDot = this.secondPagDot = document.createElement('span');
        secondDot.className = 'popup-pag-dot';

        firstDot.onclick = () => {
            this.showWidget(1)
        }

        secondDot.onclick = () => {
            this.showWidget(2)
        }
        cont.append(firstDot, secondDot);
        return cont;
    }

    createSave() {
        var [button, tooltip, container] = createBtnWithTooltip(SAVE_ICON, 'Save to Notebook', 'topleft');
        button.onclick = () => {
            const currentUrl = window.location.pathname.split("/").pop() + window.location.search;
            postRequestForm("controller/saveSearch.php", {}, {
                title: this.titleDom1.innerHTML,
                url: currentUrl,
                map: this.map_type
            }, response => {
                tooltip.innerText = response;
                setTimeout(() => {
                    tooltip.innerText = 'Save to Notebook'
                }, 3000);
            })
        }
        return container;
    }

    createCitation() {
        var [button, tooltip, container] = createBtnWithTooltip(CITE_ICON, 'Cite this item', 'topleft')
        button.onclick = () => {
            var temp = document.createElement('input');
            container.append(temp);
            temp.type = 'text';
            temp.value = document.getElementById('citeTextapa').innerText;
            temp.select();
            document.execCommand("copy");
            container.removeChild(temp);

            tooltip.innerText = 'Copied';
            setTimeout(() => {
                tooltip.innerText = 'Cite this item'
            }, 3000);
        };
        return container;
    }

    createCloser() {
        var [button, tooltip, container] = createBtnWithTooltip(CLOSE_ICON, 'Close', 'topleft');
        this.closeBtn = button;
        return container;
    }

    createContent() {
        // this.title = document.createElement('div');
        // this.title.className = 'popup-title';
        // this.credit = document.createElement('div');
        // this.credit.className = 'popup-credit';
        // this.credit.style.display = 'none';
        // this.categories = document.createElement('div');
        // this.categories.className = 'popup-cat';
        // this.trove = this.createTrove();
        // this.troveFull = document.createElement('div');
        // this.troveFull.id = 'popup-mashup';
        // this.troveFull.className = 'tabcontent mashup-container';
        // this.troveFull.style.display = 'none';
        // this.troveFull.setAttribute('data-type', '2');
        //
        // this.titleCont = document.createElement('div');
        // this.titleCont.className = 'popup-title-cont';
        // this.titleCont.append(this.title, this.credit, this.categories);
        // this.troveCont = document.createElement('div');
        // this.troveCont.style = "overflow: hidden; max-height: 400px";
        // this.troveCont.append(this.trove, this.troveFull);

        this.firstWidget = this.createFirstWidget();
        this.secondWidget = this.createSecondWidget();
        this.thirdWidget = this.createThirdWidget();
        this.showWidget(0);

        var contentContainer = document.createElement('div');
        contentContainer.append(this.firstWidget, this.secondWidget, this.thirdWidget);
        contentContainer.className = 'popup-content';

        return contentContainer;
    }

    createFirstWidget() {
        this.titleDom1 = document.createElement('span');
        this.titleDom1.className = 'popup-title';
        this.contTitleDom1 = document.createElement('span');
        this.contTitleDom1.className = 'popup-title';
        var titleCont = document.createElement('div');
        titleCont.append(this.titleDom1, this.contTitleDom1);


        this.categories = document.createElement('div');
        this.categories.className = 'popup-cat';

        var seemore = document.createElement('div');
        seemore.style = 'color: blue; margin-top: 20px';
        seemore.innerText = 'Click to see more';

        seemore.onclick = () => {
            this.showWidget(1);
        }

        var container = document.createElement('div');
        container.append(titleCont, this.categories, seemore);
        return container;
    }

    createSecondWidget() {
        var creditBox = document.createElement('div');
        creditBox.className = 'popup-box';
        creditBox.append(this.createCreditSecond());
        creditBox.onclick = () => {
            this.showWidget(2);
            this.showCreditThird();
        }

        this.satelliteImg = document.createElement('img');
        this.satelliteImg.className = 'popup-satellite';
        this.satelliteImg.src = 'Images/satellite.jpg';

        var positionBox = document.createElement('div')
        positionBox.className = 'popup-box';

        this.positionSecond = document.createElement('div');
        this.positionSecond.id = 'cont_map_container1';
        this.positionSecond.style = 'height:150px; width: 190px';

        positionBox.append(this.positionSecond);
        positionBox.onclick = () => {
            this.showWidget(2);
            this.showPositionThird();
        }

        var wikiBox = document.createElement('div');
        wikiBox.className = 'popup-box';
        wikiBox.innerHTML = `<img style="width: 100%" src="Images/resources/wikipedia.jpeg">`;

        wikiBox.onclick = () => {
            this.showWidget(2);
            this.showWikiThird();
        }


        var troveBox = document.createElement('div');
        troveBox.className = 'popup-box';
        troveBox.append(this.createTroveSecond());
        troveBox.onclick = () => {
            this.showWidget(2);
            this.showTroveThird();
        }

        var container = document.createElement('div');
        container.append(creditBox, positionBox, wikiBox, troveBox);
        return container;
    }

    createThirdWidget() {
        this.credit = document.createElement('div');
        this.credit.className = 'popup-credit';

        this.positionThird = document.createElement('div');

        this.contempMapCont2 = document.createElement('div');
        this.contempMapCont2.id = 'cont_map_container2';
        this.contempMapCont2.style = 'height:400px; width: 490px';

        this.globeMapCont = document.createElement('div');
        this.globeMapCont.style = 'height:400px; width: 490px';
        this.globeMapCont.id = "globe_container";

        // this.visCont = document.createElement('div');
        // this.visCont.id = "visualization_container";
        // this.visCont.style = 'height:400px; width: 490px';

        this.positionThird.append(this.contempMapCont2, this.globeMapCont);

        this.wikipediaThird = document.createElement('div');
        this.wikipediaThird.id = 'popup_wikipedia';
        this.wikipediaThird.style = 'height:400px';


        this.troveThird = document.createElement('div');
        this.troveThird.id = 'popup-mashup';
        this.troveThird.className = 'tabcontent mashup-container';
        this.troveThird.setAttribute('data-type', '2');
        this.troveThird.style = "overflow: hidden; max-height: 400px";

        this.credit.style.display = this.positionThird.style.display = this.troveThird.style.display = this.wikipediaThird.style.display = 'none';

        var container = document.createElement('div');
        container.style.position = 'relative';
        container.append(this.credit, this.positionThird, this.wikipediaThird, this.troveThird);
        return container;
    }

    createCreditSecond() {
        this.titleDom2 = document.createElement('div');
        this.titleDom2.className = 'popup-title';
        this.contTitleDom2 = document.createElement('div');
        this.contTitleDom2.className = 'popup-title';
        var titleCont = document.createElement('div');
        titleCont.append(this.titleDom2, this.contTitleDom2);

        this.creditShort = document.createElement('div');
        this.creditShort.className = 'popup-credit-short';

        var container = document.createElement('div');
        container.append(titleCont, this.creditShort);
        return container;
    }

    createTroveSecond() {
        var troveContainer = document.createElement('div');
        troveContainer.className = 'popup-trove';

        var troveContent = document.createElement('table');
        troveContent.style.width = '100%';
        var firstRow = document.createElement('tr');
        firstRow.innerHTML = '<th colspan="3" class="popup-trove-resources">EHM Search</th>';
        firstRow.style.cursor = 'pointer';

        var secondRow = document.createElement('tr');
        var pubsCell = document.createElement('td');
        var imagesCell = document.createElement('td');
        var videosCell = document.createElement('td');
        pubsCell.className = imagesCell.className = videosCell.className = 'popup-trove-resources';

        this.pubs = document.createElement('div');
        this.pubs.className = 'click-popup-pub';
        this.images = document.createElement('div');
        this.images.className = 'click-popup-image';
        this.videos = document.createElement('div');
        this.videos.className = 'click-popup-video';

        pubsCell.append(this.pubs, document.createTextNode('publications'));
        imagesCell.append(this.images, document.createTextNode('images'));
        videosCell.append(this.videos, document.createTextNode('videos'));

        secondRow.append(pubsCell, imagesCell, videosCell);
        troveContent.append(firstRow, secondRow);
        troveContainer.appendChild(troveContent);

        return troveContainer;
    }

    showWidget(number) {
        if (number === 1) {
            this.shrink();
            this.firstWidget.style.display = 'none';
            this.secondWidget.style.display = 'block';
            this.thirdWidget.style.display = 'none';
            if (!this.contempMap1) this.contempMap1 = new ContempMap(this.positionSecond, this.map_type);
            this.contempMap1.reload(this.results);
            this.contempMap1.centerMapOnResults(this.results, false);

            this.contempMap1.searchBox.style.display = this.contempMap1.searchBtn.style.display
                = this.contempMap1.fullscreenBtn.style.display = this.contempMap1.visSelectBtn.style.display = 'none';
            this.contempMap1.contMap.zoomControl.remove();
            this.showPagDot(0);
        } else if (number === 2) {
            this.expand();
            this.firstWidget.style.display = 'none';
            this.secondWidget.style.display = 'none';
            this.thirdWidget.style.display = 'block';
            this.showPagDot(1);
        } else {
            this.shrink();
            this.firstWidget.style.display = 'block';
            this.secondWidget.style.display = 'none';
            this.thirdWidget.style.display = 'none';
            if (this.pagination) this.pagination.style.display = 'none';
        }
    }

    showPagDot(index) {
        if (index === 0) {
            if (this.pagination) this.pagination.style.display = 'block';
            else return;
            this.firstPagDot.style.backgroundColor = 'gray';
            this.secondPagDot.style.backgroundColor = 'unset';
        } else if (index === 1) {
            if (this.pagination) this.pagination.style.display = 'block';
            else return;
            this.firstPagDot.style.backgroundColor = 'unset';
            this.secondPagDot.style.backgroundColor = 'gray';
        }
    }

    setTitle(title) {
        this.titleDom1.innerHTML = this.titleDom2.innerHTML = title;
    }

    setContTitle(title) {
        this.contTitleDom1.innerHTML = this.contTitleDom2.innerHTML = title ? " / " + title : "";
    }

    setCredit(credit) {
        this.creditShort.innerHTML = credit;
    }

    setCategories(categories) {
        if (!categories) return;
        categories = categories.split("|").filter(c => c).map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ");
        this.categories.innerHTML = categories;
    }

    setPubs(number) {
        this.pubs.innerHTML = number;
    }

    setImages(number) {
        this.images.innerHTML = number;
    }

    setVideos(number) {
        this.videos.innerHTML = number;
    }

    setResults(results) {
        this.results = results;
    }

    expand() {
        this.container.style.width = '500px';
    }

    shrink() {
        this.container.style.width = '200px';
    }

    showTitle() {
        // this.credit.style.display = this.troveFull.style.display = 'none';
        // this.title.style.display = this.categories.style.display = this.trove.style.display = 'block';
        // this.shrink();
    }


    showCreditThird() {
        this.credit.style.display = 'block';
        this.troveThird.style.display = 'none';
        this.hidePositionThird();
        this.wikipediaThird.style.display = 'none';
    }

    showWikiThird() {
        this.credit.style.display = 'none';
        this.troveThird.style.display = 'none';
        this.hidePositionThird();
        this.wikipediaThird.style.display = 'block';
    }

    hidePositionThird() {
        this.positionThird.style.display = 'none';
        if (this.contempMap2) this.contempMap2.visSelectBtn.style.display = 'none';
    }

    showPositionThird() {
        this.positionThird.style.display = 'block';
        this.troveThird.style.display = this.credit.style.display = 'none';
        this.wikipediaThird.style.display = 'none';

        if (!this.contempMap2) this.contempMap2 = new ContempMap(this.contempMapCont2, this.map_type, this.totalResults,
            null, null, null, null, null, null,
            this.globeMapCont, null, false);
        this.contempMap2.reload(this.results);
        this.contempMap2.centerMapOnResults(this.results);
        this.contempMap2.visSelectBtn.style.display = 'block';
        if (this.contempMap2.globeMap) this.contempMap2.globeMap.reload(this.results);

    }

    showTroveThird() {
        this.credit.style.display = 'none';
        this.troveThird.style.display = 'block';
        this.hidePositionThird();
        this.wikipediaThird.style.display = 'none';

        // this.expand();
    }

    reset() {
        this.setPubs('?');
        this.setImages('?');
        this.setVideos('?');
        this.showWidget(0);
        this.shrink();
    }
}