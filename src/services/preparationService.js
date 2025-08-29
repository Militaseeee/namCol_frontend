import { BASE_URL } from "./services";

// Complete recipe progress
export async function completeRecipe(userId, recipeId) {
    try {
        const res = await fetch(`${BASE_URL}/progress/${userId}/${recipeId}/complete`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Error completing recipe");
        return res.json();
    } catch (err) {
        console.error("Error completeRecipe:", err);
        return null;
    }
}