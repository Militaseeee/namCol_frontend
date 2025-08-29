import { BASE_URL } from "./services";

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Login error:", error);
    return { ok: false, data: { message: "Server error" } };
  }
}

export async function forgotPassword(email) {
  try {
    const response = await fetch(`${BASE_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Forgot Password error:", error);
    return { ok: false, data: { message: "Server error" } };
  }
  
}

export async function resetPassword(token, newPassword) {
  try {
    const response = await fetch(`${BASE_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Reset Password error:", error);
    return { ok: false, data: { message: "Server error" } };
  }
}
