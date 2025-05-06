// Set a cookie
function setCookie(cookieName, cookieValue, expires = "", path = "/") {
    if (expires === "") {
        let currentDate = new Date();
        expires = new Date(
            currentDate.getFullYear() + 1,
            currentDate.getMonth(),
            currentDate.getDate() 
        );
    }

    let cookie = "";
    cookie += `${cookieName}=${cookieValue};`;
    cookie += `expires=${(new Date(expires)).toUTCString()};`;
    cookie += `path=${path};`;

    document.cookie = cookie;
}

// Get a cookie value by name
function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookiesArray = decodedCookie.split(";");

    for (let i = 0; i < cookiesArray.length; i++) {
        let c = cookiesArray[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

// Delete a cookie by name
function deleteCookie(cookieName, path = "/") {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}

// Greet the user when the page loads
window.onload = function () {
    var username = getCookie("username");
    if (username) {
        document.getElementById("greeting").innerHTML = "Welcome, " + username + "!!!";
        document.querySelector(".button-container").style.visibility = "visible";
    } else {
        document.getElementById("greeting").innerHTML = "Welcome, guest!";
        document.querySelector(".button-container").style.visibility = "hidden";
    }
};

// Handle form submission
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("username");
    var username = input.value.trim();

    if (/^[A-Za-z0-9]+$/.test(username)) {
        setCookie("username", username);
        location.reload();
    } else {
        alert("Try again! Username must contain only letters and numbers.");
    }
});

// Logout functionality using cookie deletion
document.getElementById("logoutBtn").addEventListener("click", function () {
    deleteCookie("username");
    location.reload();
});
