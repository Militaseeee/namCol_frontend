import { getProfileData } from "../../services/profileService.js";
import { getSession } from "../../services/auth.js";

export async function initProfile() {
  try {
    // 1. Obtener usuario de la sesión
    const session = getSession(); 
    if (!session || !session.id_user) {
      console.error("No hay sesión activa");
      return;
    }

    const id_user = session.id_user;

    // 2. Pedir datos del backend
    const data = await getProfileData(id_user);

    // 3. Renderizar recetas
    renderRecipes(data);

  } catch (err) {
    console.error("Error inicializando perfil:", err);
  }
}

function renderRecipes(data) {
  const completedContainer = document.getElementById("completedRecipes");
  const unfinishedContainer = document.getElementById("unfinishedRecipes");

  completedContainer.innerHTML = "";
  unfinishedContainer.innerHTML = "";

  const createCard = (r) => `
    <div class="card">
      <img src="${r.image_url}" alt="${r.title}" />
      <p>${r.title}</p>
    </div>
  `;

  completedContainer.innerHTML = data.completedRecipes.map(createCard).join("");
  unfinishedContainer.innerHTML = data.unfinishedRecipes.map(createCard).join("");
}