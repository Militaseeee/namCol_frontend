import { BASE_URL } from "./services";

export async function getProfileData(id_user) {
  try {
    const res = await fetch(`${BASE_URL}/profile/${id_user}`);
    if (!res.ok) throw new Error("Error in the request");
    return await res.json();
  } catch (err) {
    console.error("Error obtaining profile:", err);
    return { completedRecipes: [], unfinishedRecipes: [] };
  }
}

export async function deleteProfile(id_user) {
  try {
    const res = await fetch(`${BASE_URL}/user/${id_user}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error deleting account");
    return true;
  } catch (err) {
    console.error("Error deleting account:", err);
    return false;
  }
}
