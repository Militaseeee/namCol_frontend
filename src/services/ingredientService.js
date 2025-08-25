import { BASE_URL } from "./services";

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
