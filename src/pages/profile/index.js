import { getProfileData, deleteProfile } from "../../services/profileService.js";
import { getSession, logout } from "../../services/auth.js";
import { navigate } from "../../router.js";

let data_recipes = null;

export async function initProfile() {
  const nameUser = document.getElementById("nameUser");

  try {
    const session = getSession(); 
    if (!session || !session.id_user) {
      console.error("No active session");
      return;
    }

    nameUser.textContent = session.name.toUpperCase() || "User";

    const id_user = session.id_user;

    const data = await getProfileData(id_user);
    
    renderRecipes(data);

  } catch (err) {
    console.error("Error initializing profile:", err);
  }
}

function renderRecipes(data) {
  const completedContainer = document.getElementById("completedRecipes");
  const unfinishedContainer = document.getElementById("unfinishedRecipes");

  completedContainer.innerHTML = "";
  unfinishedContainer.innerHTML = "";

 const createCard = (r) => `
    <div class="card" 
         data-recipe='${JSON.stringify(r)}'>
      <img src="${r.image_url}" alt="${r.title}" />
      <h3 class="recipe-title">${r.title}</h3>
    </div>
  `;

  if (data.completedRecipes.length > 0) {
    completedContainer.innerHTML = data.completedRecipes.map(createCard).join("");
  } else {
    completedContainer.innerHTML = `<p class="empty-message">There are no completed recipes in your history.</p>`;
  }

  if (data.unfinishedRecipes.length > 0) {
    unfinishedContainer.innerHTML = data.unfinishedRecipes.map(createCard).join("");
  } else {
    unfinishedContainer.innerHTML = `<p class="empty-message">There are no recipes unfinished in your history.</p>`;
  }

  addRecipeClickEvent();
}

export function logOut() {
  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", () => {
    logout();
    navigate("/");
  });
}

export function deleteAccount() {
  const btnDelete = document.getElementById("btnDeleteAccount");
  btnDelete.addEventListener("click", async () => {

    const session = getSession();
    if (!session || !session.id_user) {
      console.error("No active session");
      return;
    }

    const id_user = session.id_user;

    try {
      await deleteProfile(id_user);
      logout();
      navigate("/");
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  });
}

function addRecipeClickEvent() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => goToRecipeSelected(card));
    });
}

function goToRecipeSelected(card) {
  const recipe = JSON.parse(card.dataset.recipe);
  localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
  navigate("/listingredients");
}