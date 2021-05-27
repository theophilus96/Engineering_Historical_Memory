// var tabcontentsList = Array.from(document.getElementsByClassName("tabcontent"));
// var tablinksList = Array.from(document.getElementsByClassName("tablinks"));
//
// var tabcontentsMap = {}, tablinksMap = {};
//
// for (let data_type = 1; data_type < 4; data_type++) {
//     tabcontentsMap[data_type] = tabcontentsList.filter(tc => tc.getAttribute('data-type') == data_type);
//     tablinksMap[data_type] = tablinksList.filter(tl => tl.getAttribute('data-type') == data_type);
// }

export function openTab(evt, data_type = null, index=0) {
    if (!data_type) data_type = evt.currentTarget.getAttribute('data-type');
    var tabcontents = hideAllTabContents(data_type);
    var tablinks = hideAllTabLinks(data_type);
    if (evt) {
        var tab = evt.currentTarget.getAttribute('resource');
        evt.currentTarget.className += " active";
        document.getElementById(tab).style.display = "block";
    } else {
        if (tablinks[index]) tablinks[index].className += " active";
        if (tabcontents[index]) tabcontents[index].style.display = "block";
    }
}

function hideAllTabContents(data_type) {
    var tabcontents = Array.from(document.getElementsByClassName("tabcontent"));
    tabcontents = tabcontents.filter(tc => tc.getAttribute('data-type') == data_type);
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    return tabcontents;
}

function hideAllTabLinks(data_type) {
    var tablinks = Array.from(document.getElementsByClassName("tablinks"));
    tablinks = tablinks.filter(tl => tl.getAttribute('data-type') == data_type);

    // var tablinks = tablinksMap[data_type];
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    return tablinks;
}


export function tabLoading(){
    var tablinks = Array.from(document.getElementsByClassName("tablinks"));
    openTab(null, 1);
    openTab(null, 2);
    // openTab(null, 3);
    for (let i = 0; i < tablinks.length; i++) {
        var tablink = tablinks[i];
        tablink.onclick = function(evt){
            openTab(evt);
        };
    }
}
