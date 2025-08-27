import { getSession, isAuthenticated } from "./services/auth.js";

const routes = {
  "/": "./src/pages/home/index.html",
  "/recipes": "./src/pages/recipes/index.html",
  "/signin": "./src/pages/login/index.html",
  "/signup": "./src/pages/sign_up/index.html",
  "/profile": "./src/pages/profile/index.html",
  "/forgot-password":"./src/pages/login/formFP.html",
  "/listingredients": "./src/pages/list_ingredients/index.html",
};

export async function navigate(pathname) {
  const route = routes[pathname];
  if (!route) {
    document.getElementById("content").innerHTML = '<h1 class="no-found">404 - Page Not Found</h1>';
    return;
  }

  const html = await fetch(route).then(res => res.text());
  document.getElementById("content").innerHTML = html;

  history.pushState({}, "", pathname);

  const session = getSession();
  if (session) {
    isAuthenticated();
    if(pathname === "/signin" || pathname === "/signup") {
      navigate("/");
    }
  }

  if (pathname === "/listingredients") {
    import("./pages/list_ingredients/index.js").then(module => {
      module.initRecipes(); // llamamos a una función de arranque - Mientras tanto
    });
  }

  if (pathname === "/signin") {
  import("./pages/login/index.js").then(module => {
    module.initLogin();
  });
}

  if (pathname === "/profile") {
  import("./pages/profile/index.js").then(module => {
    module.initLogin();
  });
}
  
}

// Support for clicks on links with data-links
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigate(path);
  }
});

// Load home at startup
navigate(window.location.pathname);

/* window.addEventListener("popstate", () => {
  navigate(location.pathname, false);
});
 */