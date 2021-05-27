import {postRequestForm} from "./httpRequest.js";

export class SuggestModal {
    constructor(mapType, modalId, modalBodyId, modalCloseId) {
        this.mapType = mapType;
        this.selectedHistId = null;
        this.suggestUrl = "controller/suggestionUpdate.php";
        this.modal = document.getElementById(modalId);
        this.modalBody = document.getElementById(modalBodyId);
        this.closeBtn = document.getElementById(modalCloseId);
        this.placeNameInput = document.createElement('input');
        this.wikipediaInput = document.createElement('input');
        this.ehmInput = document.createElement('input');
        this.latInput = document.createElement('input');
        this.lngInput = document.createElement('input');
        this.submitBtn = document.createElement('button');
        this.modalBodyDiv = document.createElement('div');


        this.init();
    }

    init() {
        var _thisRef = this;

        this.placeNameInput.type = 'text';
        this.placeNameInput.placeholder = 'Place name';

        var line1 = document.createElement('div');
        line1.appendChild(this.placeNameInput);

        this.wikipediaInput.type = 'text';
        this.wikipediaInput.placeholder = 'Wikipedia URL';

        this.ehmInput.type = 'text';
        this.ehmInput.placeholder = 'EHM URL';

        var line2 = document.createElement('div');
        line2.appendChild(this.wikipediaInput);
        line2.appendChild(this.ehmInput);

        this.latInput.type = 'text';
        this.latInput.placeholder = 'Latitude';

        this.lngInput.type = 'text';
        this.lngInput.placeholder = 'Longitude';

        var line3 = document.createElement('div');
        line3.appendChild(this.latInput);
        line3.appendChild(this.lngInput);

        this.submitBtn.innerText = 'Submit';
        var line4 = document.createElement('div');
        line4.appendChild(this.submitBtn);

        this.modalBodyDiv.appendChild(line1);
        this.modalBodyDiv.appendChild(line2);
        this.modalBodyDiv.appendChild(line3);
        this.modalBodyDiv.appendChild(line4);

        this.modalBody.appendChild(this.modalBodyDiv);

        this.closeBtn.onclick = function () {
            _thisRef.closeModal();
        };

        window.onclick = function (event) {
            if (event.target == this.modal) {
                _thisRef.closeModal();
            }
        };


        this.submitBtn.onclick = function () {
            let body = {
                key: "cont_item",
                table: _thisRef.mapType,
                id: _thisRef.selectedHistId,
                place_name: _thisRef.placeNameInput.value,
                wikipedia: _thisRef.wikipediaInput.value,
                ehm: _thisRef.ehmInput.value,
                lat: _thisRef.latInput.value,
                lng: _thisRef.lngInput.value
            };
            postRequestForm(_thisRef.suggestUrl, {}, body, function (response) {
                var updatedModalBody = document.createElement('div');
                updatedModalBody.innerText = response;
                _thisRef.modalBody.innerHTML = "";
                _thisRef.modalBody.appendChild(updatedModalBody);
            });

        };
    }

    setHistId(selectedHistId, mapType) {
        this.selectedHistId = selectedHistId;
        if(mapType) this.mapType = mapType;
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modalBody.innerHTML = "";
        this.placeNameInput.value = this.wikipediaInput.value = this.ehmInput.value = this.latInput.value = this.lngInput.value = "";
        this.modalBody.appendChild(this.modalBodyDiv);
    }

}