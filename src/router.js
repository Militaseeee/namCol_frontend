const routes = {
  "/": "../index.html",       // Landing page
  "/recipes": "./views/recipes.html",
  "/signin": "./views/signin.html",
  "/signup": "./views/signup.html",
  "/profile": "./pages/profile",
};


document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigate(path);
  }
});

async function navigate(pathname) {
  const route = routes[pathname];
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("content").innerHTML = html;
  history.pushState({}, "", pathname);
}

