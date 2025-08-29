import { getProgress } from "../../services/ingredientService.js";
import { getSession } from "../../services/auth.js";
import { completeRecipe } from "../../services/preparationService.js";
import { showMessage } from '../../services/utils.js';

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
    // We bring the data from the API (includes steps)
    const data = await getProgress(userId, recipeId);

    // DOM elements
    const recipeNameEl = document.getElementById("recipeName");
    const recipeImgEl = document.getElementById("recipeImage");
    const recipeDescEl = document.getElementById("recipeDescription");
    const stepsListEl = document.getElementById("preparation-steps");

    // Basic info render
    recipeNameEl.textContent = data.recipe.title;
    recipeImgEl.src = data.recipe.image_url;
    recipeDescEl.textContent = data.recipe.description;

    // We clean the list of steps
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

    document.getElementById("doneBtn").addEventListener("click", async () => {
      const confirmFinish = confirm("Did you finish this recipe?");
      if (!confirmFinish) return;

      try {
        const res = await completeRecipe(userId, recipeId);
        if (res) {
          const recipeContainer = document.querySelector(".principal");
          if (recipeContainer) {
            showMessage({
                text: "Recipe completed! 🎉",
                className: "alert-message",
                parent: recipeContainer, 
                duration: 4000,
                color: "#4CAF50"
            });
          }
        }
      } catch (err) {
        console.error("Error completing recipe:", err);
      }
    });

  } catch (err) {
    console.error("Error loading preparation steps:", err);
  }
}
