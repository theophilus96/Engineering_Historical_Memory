import {HistMap} from "./ClassHistMap.js";

export class ImolaMap extends HistMap{
    imola_init(periodResults, changePeriodAction, flipAction){
        this.verso = 0;
        this.periodResults = periodResults;
        this.changePeriodAction = changePeriodAction;
        this.flipAction = flipAction;
        this.createPeriodBtn();
        this.createFlipBtn();
    }

    createPeriodBtn() {
        this.currentPeriod = 0;
        var icon = this.periodIcon = document.createElement('img');
        // icon.style.width = '24px';
        // icon.style.height = '24px';
        icon.src = 'Images/display-icon-2.png';
        var btn = document.createElement('button');
        btn.appendChild(icon);
        btn.addEventListener('click', () => {
            this.currentPeriod = (this.currentPeriod + 1) % 2;
            if(this.currentPeriod === 0) this.reload(this.totalResults);
            else if(this.currentPeriod === 1) this.reload(this.periodResults);
            this.changePeriodAction();
        });

        var elementTooltip = document.createElement('span');
        elementTooltip.className = 'tooltiptext tooltip-left tooltip-bottom';
        elementTooltip.innerText = 'Cappelle';

        var element = document.createElement('div');
        element.className = 'ol-control tooltip';
        element.style.bottom = 'calc(2% + 40px)';
        element.style.left = '2%';
        element.append(btn, elementTooltip);

        var control = new ol.control.Control({element: element});
        this.histMap.addControl(control);
    }

    createFlipBtn() {
        var icon = document.createElement('img');
        icon.src = 'Images/icons/flip.png';
        var btn = this.flipBtn = document.createElement('button');
        btn.appendChild(icon);

        var elementTooltip = document.createElement('span');
        elementTooltip.className = 'tooltiptext tooltip-left tooltip-bottom';
        elementTooltip.innerText = 'Flip';

        var element = document.createElement('div');
        element.className = 'ol-control tooltip';
        element.style.bottom = `calc(2% + 80px)`;
        element.style.left = '2%';
        element.append(btn, elementTooltip);

        var control = new ol.control.Control({element: element});
        this.histMap.addControl(control);

        btn.addEventListener('click', () => {
            this.verso = (this.verso + 1) % 2;
            this.flipMap();
            // this.modeBtn.style.display = this.verso === 1 ? 'none' : 'block';
            this.flipAction(this.verso);
            // this.reloadFilterBtn();
        });
    }

    flipMap(){
        [...this.histMap.getLayers().getArray()].forEach((layer) => this.histMap.removeLayer(layer))

        var layer = new ol.layer.Tile({
            source: new ol.source.Zoomify({
                url: this.verso ? 'Zoomify/Imola_Map_Verso/' : 'Zoomify/Imola_Map/',
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
}