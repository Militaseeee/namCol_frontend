import { getSession, isAuthenticated } from "./services/auth.js";

const routes = {
  "/": "./src/pages/home/index.html",
  "/recipes": "./src/pages/recipes/index.html",
  "/signin": "./src/pages/login/index.html",
  "/signup": "./src/pages/sign_up/index.html",
  "/forgot-password":"./src/pages/login/formFP.html",
  "/reset-password":"./src/pages/login/formRP.html",
  "/listingredients": "./src/pages/list_ingredients/index.html",
};

export async function navigate(pathname) {
  const route = routes[pathname];
  const navbar = document.querySelector(".navbar");
  if (!route) {
    document.getElementById("content").innerHTML = '<h1 class="no-found">404 - Page Not Found</h1>';
    return;
  }

  const session = getSession();

   // Protected routes
  const protectedRoutes = ["/listingredients"];

  if (protectedRoutes.includes(pathname) && !session) {
    // alert("You must log in to access this page.");
    document.getElementById("content").innerHTML = `
    <h1 class="no-found">401 - Access denied</h1>
    <p class="no-found">You must log in to access this page.</p>
  `;
    setTimeout(() => {
      navigate("/signin");
    }, 3000);

  return;
  }

  const html = await fetch(route).then(res => res.text());
  document.getElementById("content").innerHTML = html;

  const token = new URLSearchParams(window.location.search).get("token");

  history.pushState({}, "", pathname);

  if (session) {
    isAuthenticated();
    if(pathname === "/signin" || pathname === "/signup") {
      navigate("/");
    }
  }
  // short waves svg
  const existingSvg = document.querySelector(".short-waves");
  if (existingSvg) existingSvg.remove();

  if (pathname === "/recipes" || pathname === "/listingredients") {
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

  if (pathname === "/listingredients") {
    import("./pages/list_ingredients/index.js").then(module => {
      module.initIngredientsPage(); 
    });
  }

  if (pathname === "/recipes") {
    import("./pages/recipes/index.js").then(module => {
      module.initRecipesPage();
    });
  }
  if (pathname === "/signin") {
  import("./pages/login/index.js").then(module => {
    module.initLogin();
  });
}

  if (pathname === "/forgot-password") {
  import("./pages/login/index.js").then(module => {
    module.initForgotPassword();
  });
}

  if (pathname === "/reset-password") {
    console.log("reset-password page loaded");
  import("./pages/login/index.js").then(module => {
    module.initResetPassword(token);
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