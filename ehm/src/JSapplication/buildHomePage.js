import {allApps} from './config.js';

var descriptions;

export function buildThumbnail(thumbnail, title = '', descs = []) {
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    thumbnailContainer.style.backgroundImage = `url('Images/apps/${thumbnail}')`;

    var thumbnailText = document.createElement('div');
    thumbnailText.className = 'thumbnail-text';
    var titleDiv = document.createElement('div');
    titleDiv.className = 'thumbnail-title';
    titleDiv.innerHTML = title;
    var descDiv = document.createElement('div');
    descDiv.className = 'thumbnail-desc';
    descDiv.id = 'thumbnailDesc';
    var fadeDiv = document.createElement('div');
    fadeDiv.id = 'thumbDescFade';
    descDiv.appendChild(fadeDiv);
    thumbnailText.append(titleDiv, descDiv);
    thumbnailContainer.appendChild(thumbnailText);
    descriptions = descs;
    $(rotateTerm);
}

export function buildHomePage(app_code_list, isAdmin) {
    var app_list = allApps.filter(a => app_code_list.includes(a.code));
    const appContainer = document.getElementById('appsContainer');
    app_list.forEach(app => {
        var disabled = app.active ? '' : 'disabled';
        var newApp = document.createElement('a');
        if ((app.active || isAdmin) && app.href) newApp.href = app.href;
        newApp.className = `app-container ${disabled}`;
        newApp.innerHTML =
            `<div class="app-img-cont">
                <img src="Images/apps/${app.img}">
            </div>
            <div class="app-text-cont">
                <div class="app-title">${app.name}</div>
                <div class="app-desc">${app.artefact}</div>
                <div>${app.desc}</div>
            </div>`;
        appContainer.appendChild(newApp)
    })
}

function rotateTerm() {
    var ct = $("#thumbDescFade").data("desc") || 0;
    $("#thumbDescFade").data("desc", ct == descriptions.length - 1 ? 0 : ct + 1).text(descriptions[ct])
        .fadeIn().delay(2000).fadeOut(2000, rotateTerm);
}
