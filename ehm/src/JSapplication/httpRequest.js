export function getRequest(url, params, action) {
    url = url + formatParams(params);
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            action(this.responseText);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

export function postRequestForm(url, params = {}, body = {}, action) {
    url = url + formatParams(params);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            action(this.responseText);
        }
    };

    var formData = new FormData();
    for (let key in body) {
        if (!body.hasOwnProperty(key)) continue;
        let value = body[key];
        if (typeof value === 'object' && value !== null) {
            for (let i = 0; i < value.length; i++) formData.append(key, value[i])
        } else formData.append(key, value);
    }
    xhr.send(formData);
}

export function postRequestRaw(url, params = {}, body, action) {
    url = url + formatParams(params);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            action(this.responseText);
        }
    };
    xhr.send(body);
}

function formatParams(params) {
    if (!params) return '';
    return "?" + Object.keys(params).map(function (key) {
        return key + "=" + (params[key] ? encodeURIComponent(params[key]) : '');
    }).join("&");
}

function getURI() {
    let pathSplitted = window.location.pathname.split("/");
    return pathSplitted[pathSplitted.length - 1];
}


export function setParams(paramList) {
    const urlParams = new URLSearchParams(window.location.search), mapURI = getURI();

    for (let key in paramList) {
        if (!paramList.hasOwnProperty(key)) continue;
        let value = paramList[key];
        urlParams.set(key, value);
    }
    history.replaceState({}, null, `${mapURI}?${urlParams}`);
}