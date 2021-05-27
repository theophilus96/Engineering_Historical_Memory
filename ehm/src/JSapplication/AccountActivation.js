import {getRequest} from "./httpRequest.js";
var resendBtn = document.getElementById('resendBtn');
var responseDiv = document.getElementById('resend_response');
var loader = document.createElement('div');
loader.className = 'loadingIcon';

function sendRegistrationEmail() {
    resendBtn.disabled = true;
    responseDiv.innerHTML = "";
    responseDiv.appendChild(loader);

    getRequest("controller/sendRegistrationMail.php",null,function (response) {
        resendBtn.disabled = false;
        responseDiv.innerHTML = response;
    });
}


resendBtn.onclick=function (evt) {
    evt.preventDefault();
    sendRegistrationEmail();
};