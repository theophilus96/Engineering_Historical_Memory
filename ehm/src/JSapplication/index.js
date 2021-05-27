import {ALL_RESOURCES, allApps} from "./config.js";

const popup = document.getElementById('popup');

buildApps();
loadExternalInfo();

function loadExternalInfo() {
    var sourcestopright = document.getElementsByClassName('sources-topright')[0];

    for (let i = 0; i < ALL_RESOURCES.length; i++) {
        let resource = ALL_RESOURCES[i];
        let name = resource['name'];
        name = name.charAt(0).toUpperCase() + name.slice(1);
        sourcestopright.innerHTML += `<a href='${resource['default']}' target='_blank' id="${resource['container']}"><img src='Images/resources/${resource['img']}' alt="Pelagios">${name}</a>`;
    }
}

function buildApps() {
    var topleft = document.getElementsByClassName('topleft')[0];
    allApps.map(function (app) {
        let disabled = app.active ? '' : 'disabled';
        let container = document.createElement('a');
        let content = document.createElement('div');
        let imgCont = document.createElement('div');
        let img = document.createElement('img');
        let textCont = document.createElement('div');
        let name = document.createElement('div');
        let artefact = document.createElement('div');
        let desc = document.createElement('div');
        let tooltip = document.createElement('span');
        tooltip.className = 'tooltiptext tooltip-right tooltip-top';
        tooltip.innerHTML = `<div>${app.artefact}</div>`;

        topleft.appendChild(container);
        container.append(content);
        content.append(imgCont, textCont);
        imgCont.append(img, tooltip);
        textCont.append(name, desc);

        container.className = `workstuff-container ${disabled} tooltip`;
        if(app.active) container.href = app.href;
        content.className = 'workstuff-content';
        imgCont.className = 'workstuff-img tooltip';
        img.src = `Images/apps/${app.img}`;
        textCont.className = 'workstuff-text';
        name.className = 'workstuff-name';
        desc.className = 'workstuff-desc';
        name.innerHTML = app.name;
        desc.innerHTML = app.desc;
    })
}