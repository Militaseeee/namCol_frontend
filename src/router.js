import { getSession, isAuthenticated } from "./services/auth.js";

const routes = {
  "/": "./src/pages/home/index.html",
  "/recipes": "./src/pages/recipes/index.html",
  "/signin": "./src/pages/login/index.html",
  "/signup": "./src/pages/sign_up/index.html",
  "/profile": "./src/pages/profile/index.html",
  "/forgot-password": "./src/pages/login/formFP.html",
  "/reset-password": "./src/pages/login/formRP.html",
  "/listingredients": "./src/pages/list_ingredients/index.html",
  "/restaurants": "./src/pages/restaurants/index.html",
  "/contact": "./src/pages/contact/index.html",
  "/about": "./src/pages/about/index.html",
  "/preparation": "./src/pages/preparation/index.html",
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
        // Create the notice
        const msg = document.createElement("div");
        msg.className = "login-alert";
        msg.innerText = "You must log in to access this page.";

        // Insert before the form
        loginSection.insertBefore(msg, loginSection.firstChild);

        setTimeout(() => {
          msg.remove();
        }, 4000);
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

    // We display a floating notice that disappears on its own
    const msg = document.createElement("div");
    msg.className = "toast-message";
    msg.innerText =
      "You must complete all the ingredients before continuing with the preparation.";

    document.body.appendChild(msg);

    // Automatically removes in 4 seconds
    setTimeout(() => {
      msg.remove();
    }, 4000);

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

  if (pathname === "/recipes" || pathname === "/listingredients" || pathname == "/restaurants" || pathname == "/preparation") {
    const svgImg = document.createElement("img");
    svgImg.draggable ="false"
    svgImg.src = "./src/assets/Waves-short.svg"; 
    svgImg.alt = "short waves";
    svgImg.classList.add("short-waves");

    navbar.appendChild( svgImg);
  }

  if (pathname === "/") {
  import("./pages/home/index.js").then(module => {
    module.initHomePage();
  });
}

  if (!session){
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
    import("./pages/about/index.js").then(module => {
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