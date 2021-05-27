export class CollabMap {
    constructor(container, clickAction) {
        this.container = container;
        this.clickAction = clickAction;
        this.initMap();
    }

    initMap() {
        this.contMap = L.map(this.container, {preferCanvas: true}).setView([25.482919, 25.061708], 2);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: '',
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoia2hvaXZuIiwiYSI6ImNqdGloOHl4YzE0M3c0YmxoNDhyM29pZnoifQ.iRgQ4SBXHIhaIvbJ9pcV3w'
        }).addTo(this.contMap);
        this.contMap.zoomControl.setPosition('bottomright');
    }

    addMarkers() {
        var markerLayer = new L.FeatureGroup;
        for (var i = 0; i < this.results.length; i++) {
            let result = this.results[i];
            let lat = result["lat"],
                lng = result["lng"];
            if (!(lat && lng)) continue;
            let marker = L.marker([lat, lng], {title: result["post_title"]}).bindPopup(result["post_title"]).on('click', this.clickAction);
            marker.markerResults = [result];
            markerLayer.addLayer(marker);
        }
        this.contMap.addLayer(markerLayer);
    }

    reload(results) {
        this.results = results;
        this.addMarkers();
    }
}
