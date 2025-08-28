import { getProgress } from "../../services/ingredientService.js";
import { getSession } from "../../services/auth.js";

export async function initPreparationPage() {
  const session = getSession();
  if (!session) {
    console.error("No user session found");
    return;
  }

  const savedRecipe = localStorage.getItem("selectedRecipe");
  if (!savedRecipe) {
    console.error("No recipe selected");
    return;
  }

  const recipe = JSON.parse(savedRecipe);
  const userId = session.id_user;
  const recipeId = recipe._id;

  try {
    // Traemos los datos desde la API (incluye steps)
    const data = await getProgress(userId, recipeId);

    // DOM elements
    const recipeNameEl = document.getElementById("recipeName");
    const recipeImgEl = document.getElementById("recipeImage");
    const recipeDescEl = document.getElementById("recipeDescription");
    const stepsListEl = document.getElementById("preparation-steps");

    // Render de info básica
    recipeNameEl.textContent = data.recipe.title;
    recipeImgEl.src = data.recipe.image_url;
    recipeDescEl.textContent = data.recipe.description;

    // Limpiamos lista de pasos
    stepsListEl.innerHTML = "";

    if (data.recipe.steps && data.recipe.steps.length > 0) {
      data.recipe.steps.forEach((step) => {
        const li = document.createElement("li");
        li.classList.add("step-card");
        li.innerHTML = `
          <div class="step-number">${step.step_number}</div>
          <p class="step-text">${step.instruction}</p>
        `;
        stepsListEl.appendChild(li);
      });
    } else {
      stepsListEl.innerHTML = "<p>No steps found for this recipe.</p>";
    }

  } catch (err) {
    console.error("Error loading preparation steps:", err);
  }
}
