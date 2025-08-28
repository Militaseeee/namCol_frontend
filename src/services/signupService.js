import {BASE_URL} from "./services.js"

export async function signupUser(name, email, password, country) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, country }),
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Sign up error:", error);
    return { ok: false, data: { message: "Server error" } };
  }
}