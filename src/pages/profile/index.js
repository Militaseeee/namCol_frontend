import { getProfileData, deleteProfile } from "../../services/profileService.js";
import { getSession, logout } from "../../services/auth.js";
import { navigate } from "../../router.js";

export async function initProfile() {
  const nameUser = document.getElementById("nameUser");

  try {
    const session = getSession(); 
    if (!session || !session.id_user) {
      console.error("No hay sesión activa");
      return;
    }

    nameUser.textContent = session.name.toUpperCase() || "User";

    const id_user = session.id_user;

    const data = await getProfileData(id_user);
    
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

 // 🔹 Si hay completadas, muestro las cards. Si no, un mensaje.
  if (data.completedRecipes.length > 0) {
    completedContainer.innerHTML = data.completedRecipes.map(createCard).join("");
  } else {
    completedContainer.innerHTML = `<p class="empty-message">No hay recetas completadas en tu historial</p>`;
  }

  // 🔹 Si hay en progreso, muestro las cards. Si no, un mensaje.
  if (data.unfinishedRecipes.length > 0) {
    unfinishedContainer.innerHTML = data.unfinishedRecipes.map(createCard).join("");
  } else {
    unfinishedContainer.innerHTML = `<p class="empty-message">No hay recetas en progreso en tu historial</p>`;
  }
}

export function logOut() {
  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", () => {
    logout();
    navigate("/");
  });
}

export function deleteAccount() {
  const btnDelete = document.getElementById("btnDeleteAccount");
  btnDelete.addEventListener("click", async () => {

    const session = getSession();
    if (!session || !session.id_user) {
      console.error("No hay sesión activa");
      return;
    }

    const id_user = session.id_user;

    try {
      await deleteProfile(id_user);
      logout();
      navigate("/");
    } catch (err) {
      console.error("Error eliminando cuenta:", err);
    }
  });
}

