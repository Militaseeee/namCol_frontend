import { getRecipes } from "../../services/ingredientService";

export async function initRecipes() {
  console.log("🌮 Recipes page initialized c:");

  const recipeNameEl = document.getElementById("recipeName");
  const recipeImgEl = document.getElementById("recipeImage");
  const recipeDescEl = document.getElementById("recipeDescription");
  const ingredientsListEl = document.getElementById("ingredientsList");

  let allRecipes = await getRecipes();
  console.log("✅ Recetas obtenidas:", allRecipes);

  if (!allRecipes.length) return;

  const recipe = allRecipes[0]; // primera receta
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