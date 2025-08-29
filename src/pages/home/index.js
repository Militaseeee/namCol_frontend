import { getRecipes } from "../../services/ingredientService.js";
import { navigate } from "../../router.js";

let allRecipes = [];

export async function initHomePage() {

  const container = document.querySelector(".recipe-cards");
  if (!container) return;

  allRecipes = await getRecipes();

  const featuredIndexes = [0, 1, 2];

  featuredIndexes.forEach(index => {
    const recipe = allRecipes[index];
    if (!recipe) return;

    const card = document.createElement("div");
    card.classList.add("card");
    

    const img = document.createElement("img");
    img.src = `${recipe.image_url}`;
    img.alt = recipe.title;

    const title = document.createElement("p");
    title.classList.add("recipe-title");
    title.textContent = recipe.title.toUpperCase();

    card.appendChild(img);
    card.appendChild(title);

    card.addEventListener("click", () => goToRecipe(recipe));

    container.appendChild(card);
  });
  initSearchRedirect();
}

function initSearchRedirect() {
  const input = document.querySelector(".search-box input"); 
  const button = document.querySelector(".search-box button");

  if (!input || !button) return;

  const handleSearch = () => {
    const term = input.value.trim();
    if (term.length > 0) {
      localStorage.setItem("searchTerm", term);
    }
    navigate("/recipes");
  };

  button.addEventListener("click", handleSearch);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}

function goToRecipe(recipe) {
  localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
  navigate("/listingredients");
}
