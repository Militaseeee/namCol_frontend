import { getRecipes } from "../../services/ingredientService";


export async function initIngredientsPage() {
  console.log("🌮 Recipes page initialized c:");

  const recipeNameEl = document.getElementById("recipeName");
  const recipeImgEl = document.getElementById("recipeImage");
  const recipeDescEl = document.getElementById("recipeDescription");
  const ingredientsListEl = document.getElementById("ingredientsList");

  // 🔹 Intentamos cargar la receta seleccionada de localStorage
  const savedRecipe = localStorage.getItem("selectedRecipe");
  let recipe = savedRecipe ? JSON.parse(savedRecipe) : null;

  // Si no hay receta guardada, usamos la primera
  if (!recipe) {
    let allRecipes = await getRecipes();
    if (!allRecipes.length) return;
    recipe = allRecipes[0];
  }

  console.log("👉 Renderizando receta:", recipe);

  recipeNameEl.textContent = recipe.title;
  recipeImgEl.src = recipe.image_url;
  recipeDescEl.textContent = recipe.description;

  ingredientsListEl.innerHTML = "";
  recipe.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label style="flex:1; display:flex; align-items:center;">
        <input type="checkbox"> ${ing.name}
      </label>
      <span>${ing.quantity}</span>
    `;
    ingredientsListEl.appendChild(li);
  });
}
