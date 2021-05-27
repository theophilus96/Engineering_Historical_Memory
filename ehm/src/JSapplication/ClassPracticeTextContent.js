import {TextContent} from "./ClassTextContent.js";
import {getRequest, postRequestForm} from "./httpRequest.js";
import {PostFull} from "./ClassTextContent.js";

export class VisPracticeTextContent extends TextContent {
    vis_init(practices, pracClickAction) {
        this.practices = practices;
        this.pracClickAction = pracClickAction;
        this.createPopup();
    }

    filter1Action() {
        var _thisRef = this;
        this.navigator.filterBtn1.onchange = function () {
            if (this.value === 'all') {
                _thisRef.navigator.resetFilter2();
                _thisRef.showContainer(0);
            } else {
                let post_containers = _thisRef.postPreview.post_containers;
                post_containers.find(p => p.getAttribute('post_id') == this.value).click();
                let categories = _thisRef.practices.filter(p => p.post_id == this.value);

                if (_thisRef.map_type === 'raj') {
                    categories = [...new Set(categories.map(c => c.categories.split("|")).flat().filter(c => c).map(c => c.charAt(0).toUpperCase() + c.slice(1)))];
                    _thisRef.navigator.setFilter2('filter', categories);
                } else {
                    categories = categories.sort((a, b) => a.name > b.name ? 1 : -1).map(p => p.name);
                    _thisRef.navigator.setFilter2('best practice', categories);
                }
            }
        }
    }

    filter2Action() {
        var _thisRef = this;
        this.navigator.filterBtn2.onchange = function () {
            const post_id = _thisRef.navigator.filterBtn1.value;
            if (_thisRef.map_type === 'raj') {
                if (this.value === 'all') {
                    let pracs = _thisRef.practices.filter(p => p.post_id == post_id);
                    var pracsHtml = _thisRef.buildBestPractices(null, null, "Constructions:", pracs);
                } else {
                    let pracs = _thisRef.practices.filter(p => p.categories.split("|").includes(this.value.toLowerCase()) && p.post_id == post_id);
                    pracsHtml = _thisRef.buildBestPractices(null, null, `Highlights for ${this.value}:`, pracs);
                }
                _thisRef.post_view_cont.removeChild(_thisRef.post_view_cont.lastChild);
                _thisRef.post_view_cont.append(pracsHtml);
            } else {
                let prac = _thisRef.practices.find(p => p.name == this.value && p.post_id == post_id)
                _thisRef.pracClickAction(prac);
            }
        };
    }

    loadFullPost(post_id, post_type, isClicked, prac_id) {
        getRequest('controller/searchMap.php', {map: post_type, pid: post_id}, response => {
            this.navigator.showBackBtn();
            var result = JSON.parse(response).results[0];
            this.post_view = new PostFull(this.post_view_cont, this.map_type, result);
            this.showContainer(2);
            this.text_content_cont.scrollTop = 0;
            this.clickAction(result, isClicked);

            const prac_intro = this.map_type === 'vis' ? "Best web practices:" : this.map_type === 'raj' ? "Constructions:" : "Best practices:"

            this.post_view_cont.append(this.buildBestPractices(post_id, prac_id, prac_intro));

            if (prac_id) {
                let elem = document.getElementById(`prac-${prac_id}`);
                if (elem) elem.scrollIntoView();
            }
        });
    }

    buildBestPractices(post_id, prac_id, prac_intro, pracs) {
        var pracsHtml = document.createElement('ul');
        var prac_exist = false;
        if (!pracs) pracs = this.practices.filter(p => p.post_id == post_id);
        pracs.sort((a, b) => a.name > b.name ? 1 : -1).forEach(prac => {
            prac_exist = true;
            let pracTitle = document.createElement('span');
            pracTitle.className = 'prac-title';
            pracTitle.innerHTML = prac.name;

            let pracCmt = document.createElement('div');
            pracCmt.innerHTML = prac.comment;

            let pracHtml = document.createElement('li');
            pracHtml.id = `prac-${prac.id}`;
            pracHtml.append(pracTitle, pracCmt);

            pracsHtml.appendChild(pracHtml);
            pracTitle.onclick = () => {
                this.pracClickAction(prac);
            }
            if (prac.id == prac_id) this.pracClickAction(prac);
        })
        if (!prac_exist) return;
        var pracIntro = document.createElement('div');
        pracIntro.style = 'font-weight:bold';
        pracIntro.innerText = prac_intro

        var pracAdd = document.createElement('div');
        pracAdd.className = 'prac-add';
        pracAdd.innerText = this.map_type === 'raj' ? 'Add new construction' : 'Add new practice';

        var pracsCont = document.createElement('div');
        pracsCont.className = 'post-content';
        pracsCont.style.width = '94%';
        pracsCont.append(pracIntro, pracAdd, pracsHtml);

        pracAdd.onclick = () => {
            this.modal.style.display = 'block';
        }
        return pracsCont;
    }

    createPopup() {
        var modelContainer = this.modal = document.createElement('div');
        modelContainer.className = 'modal';

        var modelBox = document.createElement('div');
        modelBox.className = 'modal-content';
        modelContainer.appendChild(modelBox);
        var modelHeader = document.createElement('div');
        modelHeader.className = 'modal-header';
        var modelBody = this.modelBody = document.createElement('div');
        modelBody.className = 'modal-body';
        var category_map = {};
        this.postPreview.results.forEach(result => category_map[result[this.post_id_field]] = result[this.post_title_field])

        if (this.map_type === 'sr') {
            var [pracToolCont, pracTool] = this.createSelect('Select a category', category_map);

            var [pracLinkCont, pracLink] = this.createTextInput('Select a relevant Wikipage');
            var [pracTitleCont, pracTitle] = this.createTextInput('Title');
            var [pracAuthorCont, pracAuthor] = this.createTextInput('Write up to three keywords');
            var [pracIntroCont, pracIntro] = this.createTextArea('Introduction');
            var [pracDescCont, pracDesc] = this.createTextArea('Relevance to the Silk Road: History, Initiatives, People');
            var [pracImgCont, pracImg] = this.createImgUpload('Upload up to three relevant images');
            var [pracReviewerCont, pracReviewer] = this.createTextInput("Your name");
            var [pracDateCont, pracDate] = this.createDateInput("Date");
        } else {
            [pracToolCont, pracTool] = this.createSelect('Select Visualisation tool', {
                100001: 'Radial Tree',
                100002: 'Treemapping',
                100003: 'Force-Directed Graph',
                100004: 'OpenStreetMap',
                100005: 'Satellite View'
            });

            [pracLinkCont, pracLink] = this.createTextInput('URL of the website*');
            [pracTitleCont, pracTitle] = this.createTextInput('Title of the website');
            [pracAuthorCont, pracAuthor] = this.createTextInput('Author(s) of the website');
            [pracIntroCont, pracIntro] = this.createTextArea('Introduction');
            [pracDescCont, pracDesc] = this.createTextArea('Relevance to Digital History');
            [pracImgCont, pracImg] = this.createImgUpload('Upload screenshots');
            [pracReviewerCont, pracReviewer] = this.createTextInput("Reviewer's name");
            [pracDateCont, pracDate] = this.createDateInput("Review date");
        }


        var pracSubmit = this.createSubmitBtn();
        var pracRes = document.createElement('div');
        pracRes.className = 'prac-res';

        modelBody.append(pracToolCont, pracLinkCont, pracTitleCont, pracAuthorCont, pracIntroCont, pracDescCont, pracImgCont, pracReviewerCont, pracDateCont);
        modelBody.append(pracSubmit, pracRes)
        modelBox.append(modelHeader, modelBody);

        var closeBtn = document.createElement('span');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '&times;';
        var header = document.createElement('div');
        header.innerText = 'Add a new review';
        modelHeader.append(closeBtn, header);

        document.getElementsByTagName('body')[0].appendChild(modelContainer);

        pracSubmit.onclick = () => {
            var tool = pracTool.value,
                link = pracLink.value,
                title = pracTitle.value,
                author = pracAuthor.value,
                intro = pracIntro.value,
                desc = pracDesc.value,
                images = pracImg.files,
                reviewer = pracReviewer.value,
                date = pracDate.value;
            if (!link) {
                pracRes.innerText = 'Please fill required fields';
                return
            }
            postRequestForm("controller/addWebPrac.php", {}, {
                tool: tool,
                link: link,
                title: title,
                author: author,
                intro: intro,
                desc: desc,
                'image[]': images,
                reviewer: reviewer,
                date: date
            }, res => {
                pracRes.innerText = res;
            });
        }

        closeBtn.onclick = () => {
            pracRes.innerText = '';
            this.closeModal();
        }
        window.onclick = (event) => {
            if (event.target == this.modal) {
                pracRes.innerText = '';
                this.closeModal();
            }
        };
    }

    createDateInput(title) {
        var titleHtml = document.createElement('div');
        titleHtml.innerText = title;
        var inputHtml = document.createElement('input');
        inputHtml.type = 'date';
        var container = document.createElement('div');
        container.className = 'modal-input-cont';
        container.append(titleHtml, inputHtml)
        return [container, inputHtml];
    }

    createImgUpload(title) {
        var titleHtml = document.createElement('div');
        titleHtml.innerText = title;
        var inputHtml = document.createElement('input');
        inputHtml.type = 'file';
        inputHtml.accept = 'image/*';
        inputHtml.multiple = true;
        var container = document.createElement('div');
        container.className = 'modal-file-upload';
        container.append(titleHtml, inputHtml)
        return [container, inputHtml];
    }

    createSubmitBtn() {
        var btn = document.createElement('button');
        btn.type = 'submit';
        btn.innerText = 'Submit';
        return btn;
    }

    createTextArea(title, placeholder = 'Max 4000 characters') {
        var titleHtml = document.createElement('div');
        titleHtml.innerText = title;
        var inputHtml = document.createElement('textarea');
        inputHtml.maxLength = 4000;
        inputHtml.placeholder = placeholder || '';
        var container = document.createElement('div');
        container.className = 'modal-input-cont';
        container.append(titleHtml, inputHtml)
        return [container, inputHtml];
    }

    createTextInput(title, placeholder = 'Max 200 characters') {
        var titleHtml = document.createElement('div');
        titleHtml.innerText = title;
        var inputHtml = document.createElement('input');
        inputHtml.type = 'text';
        inputHtml.maxLength = 200;
        inputHtml.placeholder = placeholder || '';
        var container = document.createElement('div');
        container.className = 'modal-input-cont';
        container.append(titleHtml, inputHtml)
        return [container, inputHtml];
    }

    createSelect(title, select = {}) {
        var titleHtml = document.createElement('div');
        titleHtml.innerText = title;

        var selectHtml = document.createElement('select');
        // selectHtml.style.width = '268px';

        for (let value in select) {
            let option = document.createElement('option');
            option.value = value;
            option.innerText = select[value];
            selectHtml.appendChild(option);
        }

        var container = document.createElement('div');
        container.className = 'modal-input-cont';
        container.append(titleHtml, selectHtml)
        return [container, selectHtml];
    }

    closeModal() {
        this.modal.style.display = "none";
    }
}