const selectElementList = [document.getElementsByName("workstuff")[0],
    document.getElementsByName("place")[0],
    document.getElementsByName("goods")[0],
    document.getElementsByName("government")[0],
    document.getElementsByName("people")[0],
    document.getElementsByName("event")[0]];

const inputElementList = [document.getElementsByName('tag')[0]];

if (document.getElementById('search_result_container')) {
    document.getElementById('search_filter').style.float = 'right';
}

var nextBtn = document.getElementById('next_button');
var prevBtn = document.getElementById('prev_button');

if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var url = new URL(window.location);
        var page = parseInt(url.searchParams.get("page"));
        url.searchParams.set("page", page + 1);
        window.location.href = url;
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var url = new URL(window.location);
        var page = url.searchParams.get("page");
        url.searchParams.set("page", parseInt(page) - 1);
        window.location.href = url;
    });
}


function filterReset() {
    selectElementList.forEach(function (element) {
        element.selectedIndex = 0;
    });
    inputElementList.forEach(function (element) {
        element.value = "";
    });

}

function resetOthers(evt) {
    selectElementList.forEach(function (element) {
        if (element !== evt.target) element.selectedIndex = 0;
    });
    inputElementList.forEach(function (element) {
        if (element !== evt.target) element.value = "";
    });
}