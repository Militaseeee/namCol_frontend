import { getProgress } from "../../services/ingredientService.js";
import { getSession } from "../../services/auth.js";
import { completeRecipe } from "../../services/preparationService.js";
import { showMessage } from "../../services/utils.js";
import { navigate } from "../../router.js"

export async function initPreparationPage() {
  const loader = document.getElementById("loader");
  const recipeContent = document.getElementById("recipeContent");
  const ingredientsSection = document.getElementById("ingredientsSection");

  // we show input loader
  loader.style.display = "flex";
  recipeContent.style.display = "none";
  ingredientsSection.style.display = "none";

  const session = getSession();
  if (!session) {
    console.error("No user session found");
    return;
  }

  const savedRecipe = localStorage.getItem("selectedRecipe");
  if (!savedRecipe) {
    console.error("No recipe selected");
    loader.style.display = "none";
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
              duration: 2000,
              color: "#4CAF50",
            });
          } 
          setTimeout(() => {
            navigate("/profile"); 
          }, 1000);
        }
      } catch (err) {
        console.error("Error completing recipe:", err);
      }
    });

    // We hide the loader and show the content when everything is ready.
    loader.style.display = "none";
    recipeContent.style.display = "block";
    ingredientsSection.style.display = "block";

  } catch (err) {
    console.error("Error loading preparation steps:", err);
    loader.style.display = "none"; // We hide the loader when an error is found.
  }
}
