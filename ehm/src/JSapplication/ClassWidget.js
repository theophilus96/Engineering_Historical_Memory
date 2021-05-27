import {openTab} from "./openTab.js";
import {postRequestForm} from "./httpRequest.js";
import {createBtnWithTooltip, SAVE_ICON, CITE_ICON, CLOSE_ICON} from "./createBtn.js";

export class Widget {
    constructor(map_type) {
        this.map_type = map_type;
        this.init();
    }

    init() {
        this.container = document.createElement('div');
        this.navigation = this.createNavigation();
        this.contentContainer = this.createContent();
        this.container.append(this.navigation, this.contentContainer);
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

    createSave() {
        var [button, tooltip, container] = createBtnWithTooltip(SAVE_ICON, 'Save to Notebook', 'topleft');
        button.onclick = () => {
            const currentUrl = window.location.pathname.split("/").pop() + window.location.search;
            postRequestForm("controller/saveSearch.php", {}, {
                title: this.title.innerHTML,
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
        this.title = document.createElement('div');
        this.title.className = 'popup-title';
        this.title.onclick=()=>{
            openTab(null, 2, 0);
        }

        this.credit = document.createElement('div');
        this.credit.className = 'popup-credit';
        this.credit.style.display = 'none';
        this.categories = document.createElement('div');
        this.categories.className = 'popup-cat';
        // this.creditCont = document.createElement('div');
        this.trove = this.createTrove();
        this.troveFull = document.createElement('div');
        this.troveFull.id = 'popup-mashup';
        this.troveFull.className = 'tabcontent mashup-container';
        this.troveFull.style.display = 'none';
        // this.troveFull.setAttribute('data-type', '2');

        // this.troveCont = document.createElement('div');

        this.titleCont = document.createElement('div');
        this.titleCont.className = 'popup-title-cont';
        this.titleCont.append(this.title, this.credit, this.categories);
        this.troveCont = document.createElement('div');
        this.troveCont.style = "overflow: hidden; max-height: 400px";
        this.troveCont.append(this.trove, this.troveFull);

        var contentContainer = document.createElement('div');
        contentContainer.append(this.titleCont, this.troveCont);
        contentContainer.className = 'popup-content';

        return contentContainer;
    }

    createTrove() {
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

        firstRow.onclick = () => {
            openTab(null, 2, 1);
        }
        pubsCell.onclick = () => {
            openTab(null, 2, 1);
            openTab(null, 3, 0);
        }
        imagesCell.onclick = () => {
            openTab(null, 2, 1);
            openTab(null, 3, 1);
        }
        videosCell.onclick = () => {
            openTab(null, 2, 1);
            openTab(null, 3, 2);
        }

        return troveContainer
    }


    setTitle(title) {
        this.title.innerHTML = title;
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
        this.credit.style.display = this.troveFull.style.display = 'none';
        this.title.style.display = this.categories.style.display = this.trove.style.display = 'block';
        this.shrink();
    }


    showCredit() {
        this.credit.style.display = this.trove.style.display = 'block';
        this.title.style.display = this.categories.style.display = this.troveFull.style.display = 'none';
        this.expand();
    }

    showFullTrove() {
        this.troveFull.style.display = this.title.style.display = this.categories.style.display = 'block';
        this.trove.style.display = this.credit.style.display = 'none';
        this.expand();
    }
}