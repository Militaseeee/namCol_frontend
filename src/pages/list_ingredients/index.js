import { getProgress, toggleIngredient, startProgress } from "../../services/ingredientService.js";
import { getSession } from "../../services/auth.js";
import { navigate } from "../../router.js";

export async function initIngredientsPage() {

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
    let data;

    // Trying to make progress
    try {
      data = await getProgress(userId, recipeId);
    } catch (err) {
      console.warn("No existing progress, initializing...");
      await startProgress(userId, recipeId);
      data = await getProgress(userId, recipeId);
    }

    // DOM elements
    const recipeNameEl = document.getElementById("recipeName");
    const recipeImgEl = document.getElementById("recipeImage");
    const recipeDescEl = document.getElementById("recipeDescription");
    const ingredientsListEl = document.getElementById("ingredientsList");
    const cookButton = document.getElementById("letsCook");

    // Render recipe
    recipeNameEl.textContent = data.recipe.title;
    recipeImgEl.src = data.recipe.image_url;
    recipeDescEl.textContent = data.recipe.description;

    // Render ingredients
    ingredientsListEl.innerHTML = "";
    data.ingredients.forEach(ing => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="ingredient-row">
          <label style="display:flex; align-items:center;">
            <input type="checkbox" ${ing.is_done ? "checked" : ""} data-ing="${ing.name}">
            <span style="margin-left:8px;">${ing.name}</span>
          </label>
          <span style="color:#555;">${ing.quantity}</span>
        </div>
      `;
      ingredientsListEl.appendChild(li);
    });

    // Function to update button state
    function updateCookButton() {
      const allChecked = Array.from(ingredientsListEl.querySelectorAll("input[type=checkbox]"))
        .every(cb => cb.checked);

      if (allChecked) {
        cookButton.disabled = false;
        cookButton.style.backgroundColor = "#FFC042";
        cookButton.style.cursor = "pointer";

        // We allow to go to preparation
        localStorage.setItem("canGoToPreparation", "true");
      } else {
        cookButton.disabled = true;
        cookButton.style.backgroundColor = "gray";
        cookButton.style.cursor = "not-allowed";

        // We block preparation if I don't complete everything
        localStorage.setItem("canGoToPreparation", "false");
      }
    }

    // Initialize button
    updateCookButton();

    // Listen for changes in checkboxes
    ingredientsListEl.querySelectorAll("input[type=checkbox]").forEach(cb => {
      cb.addEventListener("change", async (e) => {
        const ingName = e.target.getAttribute("data-ing");
        const isDone = e.target.checked;
        // console.log(`${ingName} → ${isDone}`);

        await toggleIngredient(userId, recipeId, ingName, isDone);

        updateCookButton(); // update button after each change
      });
    });

    // Click-to-button navigation
    cookButton.addEventListener("click", () => {
      if (!cookButton.disabled) {
        navigate("/preparation");
      }
    });
    
    // Reset button
    const resetButton = document.querySelector(".btn-reset");
    if (resetButton) {
      resetButton.addEventListener("click", async () => {
      
        const confirmReset = confirm("Are you sure you want to reset all ingredients?");
        if (!confirmReset) return; 
      
        // Uncheck all checkboxes in the DOM
        const checkboxes = ingredientsListEl.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach(cb => cb.checked = false);
      
        // Update each ingredient in the database to false
        for (let ing of data.ingredients) {
          try {
            await toggleIngredient(userId, recipeId, ing.name, false);
          } catch (err) {
            console.error(`Error resetting ingredient ${ing.name}:`, err);
          }
        }
      
        // Update COOK button state
        updateCookButton();
      
        alert("Ingredients successfully reset");
      });
    }

  } catch (err) {
    console.error("Error loading recipe progress:", err);
  }
}
