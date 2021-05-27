const host = "http://localhost:5000/";

const fm_coords_update_url = host + "fm_coords_update";

const update_data_form = document.getElementById('update_data_form');


update_data_form.addEventListener('submit', e => {
    e.preventDefault();
    const data_select = document.getElementById('data_select').value;
    const start = document.getElementById('start').value;
    const stop = document.getElementById('stop').value;

    var request_url;

    switch (data_select) {
        case "fm":
            request_url = fm_coords_update_url;
            break;
        default:
            return
    }

    let request_body = {
        start: start,
        stop: stop,
    };

    fetch(request_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request_body)
    }).then(response => {
        return response.json();
    }).then(json => {
        document.getElementById('response').innerHTML = json["result"];
    }).catch(function () {
            document.getElementById('response').innerHTML = "Internal error";
        }
    );

});

