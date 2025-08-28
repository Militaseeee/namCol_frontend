import { BASE_URL } from "./services";

// Get all the recipes
export async function getRecipes() {
    try {
        const res = await fetch(`${BASE_URL}/recipes`);
        if (!res.ok) throw new Error("Error en el fetch");
        return res.json();
    } catch (err) {
        console.error("Error getRecipes:", err);
        return [];
    }
}

// Start a user's progress with a recipe
export async function startProgress(id_user, id_recipe) {
    try {
        const res = await fetch(`${BASE_URL}/progress/${id_user}/${id_recipe}/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) throw new Error("Error starting progress");
        return res.json();
    } catch (err) {
        console.error("Error startProgress:", err);
        return null;
    }
}

// Update an ingredient as done/not done
export async function updateIngredient(id_user, id_recipe, ingredientName, isDone) {
    try {
        const res = await fetch(`${BASE_URL}/progress/${id_user}/${id_recipe}/ingredient`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ingredient_name: ingredientName,
                is_done: isDone
            })
        });
        if (!res.ok) throw new Error("Error updating ingredient");
        return res.json();
    } catch (err) {
        console.error("Error updateIngredient:", err);
        return null;
    }
}

// Bring recipe + user progress
export async function getProgress(userId, recipeId) {
    try {
        const res = await fetch(`${BASE_URL}/progress/${userId}/${recipeId}`);
        if (!res.ok) throw new Error("No progress yet");
        return res.json();
    } catch (err) {
        console.warn("Progress not found, will initialize:", recipeId);
        throw err; // keep pitching so your initIngredientsPage catches it
    }
}

// Check/uncheck ingredient
export async function toggleIngredient(userId, recipeId, ingName, isDone) {
    const res = await fetch(`${BASE_URL}/progress/${userId}/${recipeId}/ingredient`, {
        method: "PUT", // should be PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredient_name: ingName, is_done: isDone })
    });
    if (!res.ok) throw new Error("Error updating ingredient");
    return res.json();
}