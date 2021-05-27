var usernameInput = document.getElementsByName('username')[0];
var passwordInput = document.getElementsByName('pwd')[0];
var submitBtn = document.getElementById('submitBtn');

submitBtn.onclick = function () {
    var username = usernameInput.value;
    var password = passwordInput.value;
    if (!username) {
        document.getElementById('responseText').innerHTML = "Username required!";
        return
    }
    if (!password) {
        document.getElementById('responseText').innerHTML = "Password required!";
        return
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "controller/checkUserNamePwd.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var success = xhr.responseText;
            if (success == 1) {
                document.getElementById('loader').innerHTML = "<div class='loadingIcon' id='loadingIcon'></div>";
                document.getElementById('responseText').innerHTML = "<div style='font-size:15px'><a href='' target='_blank'>Not redirected? Click here</a></div>";
                location.reload();
            } else document.getElementById('responseText').innerHTML = "Invalid username or password";
        }
    };

    var formData = new FormData();
    formData.append("username", username);
    formData.append("pwd", password);
    xhr.send(formData);
};


usernameInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitBtn.click();
    }
});

passwordInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitBtn.click();
    }
});


document.getElementById("facebookLogin").onclick = function () {
    FB.login(function(response) {
        if (response.status === 'connected') {
            FB.api('/me', function(response1) {
                window.location.href = `social-login/facebook/redirect.php?userID=${response1.id}&name=${response1.name}`;
            });
        } else {
        }
    });
}