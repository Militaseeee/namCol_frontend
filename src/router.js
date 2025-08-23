const routes = {
  "/": "./src/pages/home/index.html",
  "/recipes": "./src/pages/recipes/index.html",
  "/signin": "./src/pages/login/index.html",
  "/signup": "./src/pages/sign_up/index.html",
};

async function navigate(pathname) {
  const route = routes[pathname];
  if (!route) return;

  const html = await fetch(route).then(res => res.text());
  document.getElementById("content").innerHTML = html;

  history.pushState({}, "", pathname);
}

// Soporte para clicks en links con data-link
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigate(path);
  }
});

// Cargar home al inicio
navigate("/");
