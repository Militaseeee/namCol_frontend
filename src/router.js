import { getSession, isAuthenticated } from "./services/auth.js";
import { showMessage } from "./services/utils.js";

const routes = {
  "/": "./pages/home/index.html",
  "/recipes": "./pages/recipes/index.html",
  "/signin": "./pages/login/index.html",
  "/signup": "./pages/sign_up/index.html",
  "/profile": "./pages/profile/index.html",
  "/forgot-password": "./pages/login/formFP.html",
  "/reset-password": "./pages/login/formRP.html",
  "/listingredients": "./pages/list_ingredients/index.html",
  "/restaurants": "./pages/restaurants/index.html",
  "/contact": "./pages/contact/index.html",
  "/about": "./pages/about/index.html",
  "/preparation": "./pages/preparation/index.html",
};

export async function navigate(pathname) {
  const route = routes[pathname];
  const navbar = document.querySelector(".navbar");
  if (!route) {
    document.getElementById("content").innerHTML =
      '<h1 class="no-found">404 - Page Not Found</h1>';
    return;
  }

  const session = getSession();

  // Protected routes
  const protectedRoutes = ["/listingredients", "/preparation"];

  if (protectedRoutes.includes(pathname) && !session) {
    // Redirects directly to login
    navigate("/signin");

    // We wait for the login content to load
    setTimeout(() => {
      const loginSection = document.querySelector(".login");
      if (loginSection) {
        showMessage({
          text: "You must log in to access this page.",
          className: "alert-message",
          parent: loginSection,
          color: "#FE6A6D",
          duration: 4000,
        });
      }
    }, 50);
    return;
  }

  // Blockage due to incomplete ingredients
  if (
    pathname === "/preparation" &&
    localStorage.getItem("canGoToPreparation") !== "true"
  ) {
    // Redirects to the list of ingredients
    navigate("/listingredients");

    showMessage({
      text: "You must complete all the ingredients before continuing with the preparation.",
      className: "toast-message",
      parent: document.body,
      duration: 4000,
      color: "#FE6A6D",
    });

    return;
  }

  const html = await fetch(route).then((res) => res.text());
  document.getElementById("content").innerHTML = html;

  const token = new URLSearchParams(window.location.search).get("token");

  history.pushState({}, "", pathname);

  if (session) {
    isAuthenticated();
    if (pathname === "/signin" || pathname === "/signup") {
      navigate("/");
    }
  }
  // short waves svg
  const existingSvg = document.querySelector(".short-waves");
  if (existingSvg) existingSvg.remove();

  if (
    pathname === "/recipes" ||
    pathname === "/listingredients" ||
    pathname == "/restaurants" ||
    pathname == "/preparation" ||
    pathname == "/profile"
  ) {
    const svgImg = document.createElement("img");
    svgImg.draggable = "false";
    svgImg.src = "./assets/Waves-short.svg";
    svgImg.alt = "short waves";
    svgImg.classList.add("short-waves");

    navbar.appendChild(svgImg);
  }

  if (pathname === "/") {
    import("./pages/home/index.js").then((module) => {
      module.initHomePage();
    });
  }

  if (!session) {
    if (pathname === "/profile") {
      navigate("/signin");
    }
  }

  if (pathname === "/listingredients") {
    import("./pages/list_ingredients/index.js").then((module) => {
      module.initIngredientsPage();
    });
  }

  if (pathname === "/recipes") {
    import("./pages/recipes/index.js").then((module) => {
      module.initRecipesPage();
    });
  }

  if (pathname === "/contact") {
    import("./pages/contact/index.js");
  }

  if (pathname === "/about") {
    import("./pages/about/index.js").then((module) => {
      module.initAbout();
    });
  }

  if (pathname === "/signin") {
    import("./pages/login/index.js").then((module) => {
      module.initLogin();
    });
  }

  if (pathname === "/profile") {
    import("./pages/profile/index.js").then((module) => {
      module.initProfile();
      module.logOut();
      module.deleteAccount();
    });
  }

  if (pathname === "/forgot-password") {
    import("./pages/login/index.js").then((module) => {
      module.initForgotPassword();
    });
  }

  if (pathname === "/reset-password") {
    import("./pages/login/index.js").then((module) => {
      module.initResetPassword(token);
    });
  }

  if (pathname === "/signup") {
    import("./pages/sign_up/index.js").then((module) => {
      module.initRegister();
    });
  }

  if (pathname === "/preparation") {
    import("./pages/preparation/index.js").then((module) => {
      module.initPreparationPage();
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

window.addEventListener("popstate", () => {
  navigate(location.pathname, false);
});