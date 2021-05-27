import {allApps} from "./config.js";

export class Citation {
    constructor(container, page_name, create_html = true) {
        this.container = container;
        this.page_name = page_name;
        this.create_html = create_html;
        this.init();
    }

    init() {
        this.createCitationList();
        // this.createBtn();
        if (this.create_html) this.createPopup();
    }

    reload(map_type, hist_title, cont_title, isItem) {
        // if (this.container && !this.container.contains(this.btn)) this.container.appendChild(this.btn);
        this.map_type = map_type;
        this.title = hist_title ? `. Entry '${hist_title}'` : '';
        if (cont_title) this.title += ` (identified as ${cont_title})`;
        this.isItem = isItem;
        if (this.create_html) this.addCitationHtml();
    }

    createCitationList() {
        this.citation_types = ['apa'];

        this.citations = {
            sinai: {item_authors: ["Nanetti, A."], authors: ["Nanetti, A.", "Vu, N. K."], year: "2020"},
            sinai_d: {item_authors: ["Nanetti, A."], authors: ["Nanetti, A.", "Vu, N. K."], year: "2020"},
            sinai_h: {item_authors: ["Nanetti, A."], authors: ["Nanetti, A.", "Vu, N. K."], year: "2020"},
            sinai_v: {
                item_authors: ["Wibowo, A. H.", "Benvenuti, D.", "Nanetti, A."],
                authors: ["Nanetti, A.", "Vu, N. K."],
                year: "2020"
            },
            imola: {item_authors: ["Nanetti, A."], authors: ["Nanetti, A.", "Vu, N. K."], year: "2000"},
            ibn: {
                item_authors: ["Nanetti, A.", "Ghersetti, A.", "Marti Tormo, V."],
                authors: ["Nanetti, A.", "Ghersetti, A.", "Marti Tormo, V.", "Vu, N. K."],
                year: "2020"
            },
            msl: {
                item_authors: ["Nanetti, A.", "Wade, G."],
                authors: ["Nanetti, A.", "Vu, N. K."],
                year: "2020"
            },
            cm: {item_authors: ["Nanetti, A."], authors: ["Nanetti, A.", "Vu, N. K."], year: "2020"},
            mp: {
                item_authors: ["Nanetti, A.", "Burgio, E.", "Eusebi, M.", "Simion, S."],
                authors: ["Nanetti, A.", "Burgio, E.", "Eusebi, M.", "Simion, S.", "Vu, N. K."],
                year: "2019"
            },
            mc: {item_authors: ["Nanetti, A."], authors: ["Nanetti, A.", "Vu, N. K."], year: "2018"},
            fm: {
                item_authors: ["Nanetti, A.", "Falchetta, P."],
                authors: ["Nanetti, A.", "Falchetta, P.", "Liu, DY.", "Vu, N. K."],
                year: "2019"
            },
            fm_v: {
                item_authors: ["Wibowo, A. H.", "Benvenuti, D.", "Nanetti, A."],
                authors: ["Nanetti, A.", "Falchetta, P.", "Liu, DY.", "Vu, N. K."],
                year: "2019"
            },
            fm_spec: {
                item_authors: ["Nanetti, A.", "Falchetta, P."],
                authors: ["Nanetti, A.", "Falchetta, P.", "Vu, N. K."],
                year: "2019"
            },
            aem: {
                item_authors: ["Nanetti, A.", "Falchetta, P."],
                authors: ["Nanetti, A.", "Falchetta, P.", "Vu, N. K."],
                year: "2019"
            },
            ae: {
                item_authors: ["Nanetti, A.", "Falchetta, P."],
                authors: ["Nanetti, A.", "Falchetta, P.", "Vu, N. K."],
                year: "2019"
            },
            gm: {
                item_authors: ["Nanetti, A.", "Cattaneo, A."],
                authors: ["Nanetti, A.", "Cattaneo, A.", "Vu, N. K."],
                year: "2017"
            },
            fgm: {item_authors: ["Nanetti, A."], authors: ["Nanetti, A.", "Vu, N. K."], year: "2020"},
            vis: {item_authors: ["Liu, DY."], authors: ["Liu, DY.", "Nanetti, A.", "Vu, N. K."], year: "2020"},
            ayu: {
                item_authors: ["Nanetti, A.", "Becker, C."],
                authors: ["Nanetti, A.", "Becker, C.", "Phongpaichit, P.", "Vu, N. K."],
                year: "2021"
            },
            russ: {
                item_authors: ["Frolov, A."],
                authors: ["Nanetti, A.", "Frolov, A.", "Vu, N. K."],
                year: "2021"
            },
            about: {
                item_authors: [],
                authors: ["Nanetti, A."],
                year: "2021"
            },
            sr: {
                item_authors: ["Wong, W. L."],
                authors: ["Nanetti, A.", "Vu, N. K."],
                year: "2021"
            },
            bosch: {
                item_authors: ["Sum, H."],
                authors: ["Sum, H.", "Nanetti, A.", "Vu, N. K."],
                year: "2021"
            },
            maokun: {
                item_authors: ["Nanetti, A.", "Ping, C."],
                authors: ["Nanetti, A.", "Ping, C.", "Vu, N. K."],
                year: "2021"
            },
            raj: {
                item_authors: ["Sharma, M.", "Nanetti, A."],
                authors: ["Nanetti, A.", "Sharma, M.", "Vu, N. K."],
                year: "2021"
            }
        }
    }


    getCitation(format) {
        var current_datetime = new Date()
        var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
        if (this.map_type in this.citations) {
            let cite = this.citations[this.map_type],
                item_authors = cite.item_authors.join(", "),
                authors = cite.authors.join(", "),
                year = cite.year,
                item_year = cite.item_year || year;


            if (format === 'apa') {
                if (this.isItem) {
                    if (this.map_type === 'about') return `${authors} <i>About Engineering Historical Memory</i>. Retrieved from <a href="${window.location.href}">${window.location.href}</a> (accessed on ${formatted_date})`;
                    else return `${item_authors} (${item_year})${this.title}. In ${authors} (Eds.). <i>EHM – ${this.page_name}</i>. Retrieved from <a href="${window.location.href}">${window.location.href}</a> (accessed on ${formatted_date})`;
                } else {
                    if (this.map_type === 'about') return `${authors} <i>About Engineering Historical Memory</i>. Retrieved from <a href="${window.location.href}">${window.location.href}</a> (accessed on ${formatted_date})`;
                    else return `${authors} (Eds.) (${year} - ongoing). <i>EHM – ${this.page_name}</i>. Retrieved from <a href="${window.location.href}">${window.location.href}</a> (accessed on ${formatted_date})`;
                }
            }
        }
    }

    createBtn() {
        var btn = this.btn = document.createElement('span');
        btn.innerText = 'Cite this item';
        btn.className = 'cite-btn';

        btn.onclick = () => {
            this.modal.style.display = "block";
        }
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
        modelBox.append(modelHeader, modelBody);

        var closeBtn = document.createElement('span');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '&times;';
        var header = document.createElement('div');
        header.innerText = 'Cite this item';
        modelHeader.append(closeBtn, header);

        document.getElementsByTagName('body')[0].appendChild(modelContainer);

        closeBtn.onclick = () => this.closeModal();
        window.onclick = (event) => {
            if (event.target == this.modal) this.closeModal();
        };
    }

    addCitationHtml() {
        this.modelBody.innerHTML = '';
        this.citation_types.forEach(type => {
            var citationHead = document.createElement('div');
            citationHead.innerHTML = `<b>${type.toUpperCase()}:</b><br><br>`;

            var citationText = document.createElement('div');
            citationText.id = `citeText${type}`;
            citationText.className = 'cite-text';
            citationText.innerHTML = this.getCitation(type);

            var copyBtn = document.createElement('div');
            var copySpan = document.createElement('span');
            copySpan.innerText = 'Copy to Clipboard';
            copyBtn.className = 'copy-btn';
            copyBtn.appendChild(copySpan)

            this.modelBody.append(citationHead, citationText, copyBtn);

            copyBtn.onclick = () => {
                var temp = document.createElement('input')
                this.modelBody.append(temp);
                temp.type = 'text';
                temp.value = citationText.innerText;
                temp.select();
                document.execCommand("copy");
                this.modelBody.removeChild(temp);
            }
        })
    }

    closeModal() {
        this.modal.style.display = "none";
    }
}