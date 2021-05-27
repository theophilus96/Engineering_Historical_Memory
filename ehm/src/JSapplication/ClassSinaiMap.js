import {HistMap} from "./ClassHistMap.js";

export class SinaiMap extends HistMap {
    sinai_init(modeAction, flipAction, videoAction, mode, verso) {
        this.verso = verso != null ? verso : 0;
        this.mode = mode != null ? mode : 1;
        this.modeAction = modeAction;
        this.flipAction = flipAction;
        this.videoAction = videoAction;
        this.createFlipBtn();
        this.createModeBtn();
        this.createVideoBtn();
        if (this.mode == 0) {
            this.changeModeIcon();
            this.reloadFilterBtn();
        }
        if (this.verso == 1) {
            this.flipMap();
            this.modeBtn.style.display = this.verso === 1 ? 'none' : 'block';
        }
    }

    createVideoBtn() {
        var [btn, tooltip, container] = this.createBtn('<img src="Images/icons/play.ico">', 'Digital Recomposition', 'topright');
        this.videoBtn = btn;
        container.style.bottom = `calc(2% + 80px)`;
        container.style.left = '2%';

        btn.addEventListener('click', () => {
            this.videoAction(this.mode);
        });
    }

    createFlipBtn() {
        var [btn, tooltip, container] = this.createBtn('<img src="Images/icons/flip.png">', 'Flip', 'topright');
        this.flipBtn = btn;
        container.style.bottom = `calc(2% + 40px)`;
        container.style.left = '2%';

        btn.addEventListener('click', () => {
            this.verso = (this.verso + 1) % 2;
            this.flipMap();
            this.modeBtn.style.display = this.verso === 1 ? 'none' : 'block';
            this.flipAction(this.verso, this.mode);
            this.reloadFilterBtn();
        });
    }

    flipMap() {
        [...this.histMap.getLayers().getArray()].forEach((layer) => this.histMap.removeLayer(layer))

        var layer = new ol.layer.Tile({
            source: new ol.source.Zoomify({
                url: this.verso ? 'Zoomify/Mount_Sinai_Verso/' : 'Zoomify/Mount_Sinai/',
                size: [this.imgWidth, this.imgHeight],
            })
        });

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
    }

    createModeBtn() {
        var cont = this.modeBtn = document.createElement('div');
        cont.className = 'mode-switch-cont';
        var textleft = document.createElement('span');
        textleft.innerText = 'History';
        var textright = document.createElement('span');
        textright.innerText = 'Diplomatics';
        var label = document.createElement('label');
        label.className = 'mode-switch';
        var checkbox = this.modeCheckBox = document.createElement('input');
        // checkbox.checked = true;
        checkbox.type = 'checkbox';
        var slider = this.modeSlider = document.createElement('span');
        slider.className = 'mode-switch-slider';

        label.append(checkbox, slider);
        cont.append(textleft, label, textright);

        slider.onclick = () => {
            this.mode = checkbox.checked ? 1 : 0;
            this.modeAction(this.mode);
            this.reloadFilterBtn();
        }


        var element = document.createElement('div');
        element.className = 'ol-control tooltip';
        element.style.top = `2%`;
        element.style.left = 'calc(50% - 95px)';
        element.style.backgroundColor = 'rgba(255,255,255,0.8)';
        element.append(cont);

        var control = new ol.control.Control({element: element});
        this.histMap.addControl(control);
    }

    changeModeIcon() {
        var checked = this.modeCheckBox.checked ? 1 : 0;
        if (checked === this.mode) this.modeSlider.click();
    }

    reloadFilterBtn() {
        var categoryList = this.totalResults.map(r => r[this.hist_categories_field].split("|")).flat();
        categoryList = [...new Set(categoryList)];
        categoryList.unshift('All');
        this.filterBox.innerHTML = '';

        for (let i = 0; i < categoryList.length; i++) {
            let category = categoryList[i];
            let filterOption = document.createElement('option');
            filterOption.value = category.toLowerCase();
            filterOption.text = category;
            this.filterBox.appendChild(filterOption);
        }
    }
}