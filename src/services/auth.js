
export function saveSessionStorage(user) {
    const sessionData = JSON.stringify(user);
    sessionStorage.setItem("session", sessionData);
}

export function saveLocalStorage(user) {
    const sessionData = JSON.stringify(user);
    localStorage.setItem("session", sessionData);
}

export function getSession() {
    const sessionLocal = localStorage.getItem("session");
    const sessionSession = sessionStorage.getItem("session");

    if (sessionLocal) {
        return JSON.parse(sessionLocal);
    } else if (sessionSession) {
        return JSON.parse(sessionSession);
    } else {
        return null;
    }
}

export function logout() {
    const btnSignin = document.getElementById("btnSignin");
    const btnSignup = document.getElementById("btnSignup");
    const btnName = document.getElementById("btnNameButton");

    localStorage.removeItem("session");
    sessionStorage.removeItem("session");

    btnName.remove();
    btnSignin.style.display = "block";
    btnSignup.style.display = "block";

}

export function isAuthenticated() {
    const btnSignin = document.getElementById("btnSignin");
    const btnSignup = document.getElementById("btnSignup");
    const nav = document.querySelector("nav");
    const btnName = document.createElement("button");
    const name = getSession().name.toUpperCase();

    btnSignin.style.display = "none";
    btnSignup.style.display = "none";

    btnName.classList.add("nav-button");
    btnName.id = "btnNameButton";
    btnName.innerHTML = `<a href="/profile" data-link id="btnName">${name}</a>`;
    if (document.getElementById("btnNameButton")) return;
    nav.appendChild(btnName);
}