import { loginUser, forgotPassword, resetPassword } from "../../services/loginService.js";
import { navigate } from "../../router.js";
import { saveLocalStorage, saveSessionStorage } from "../../services/auth.js";
import { showMessage } from "../../services/utils.js";

export function initLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    const { ok, data } = await loginUser(email, password);

    if (ok) {
      if (rememberMe) {
        saveLocalStorage(data.user);
      } else {
        saveSessionStorage(data.user);
      }
      navigate("/");
    } else {
      const element = document.querySelector(".login");
      if (element) {
        showMessage({
          text: (data.message || data.mensaje),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#FE6A6D"
        });
      }
    }
  });
}

export function initForgotPassword() {
  const form = document.getElementById("forgotPassForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    const { ok, data } = await forgotPassword(email);

    if (ok) {
      const element = document.querySelector(".login");

      if (element) {
        showMessage({
          text: (data.message),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#4CAF50"
        });
      }

      setTimeout(() => {
        navigate("/signin");
      }, 3000);

    } else {
      const element = document.querySelector(".login");

      if (element) {
        showMessage({
          text: (data.message || data.mensaje),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#FE6A6D"
        });
      }

    }
  });
}

export function initResetPassword(token) {
  const form = document.getElementById("resetPassForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      const element = document.querySelector(".login");
      if (element) {
        showMessage({
          text: ("Passwords do not match"),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#FE6A6D"
        });
      }
      return;
    }

    if (!token) {
      const element = document.querySelector(".login");
      if (element) {
        showMessage({
          text: ("Token not provided"),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#FE6A6D"
        });
      }
      return;
    }

    const { ok, data } = await resetPassword(token, password);

    if (ok) {
      const element = document.querySelector(".login");

      if (element) {
        showMessage({
          text: ("Password successfully reset"),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#4CAF50"
        });
      }

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } else {
       const element = document.querySelector(".login");

      if (element) {
        showMessage({
          text: (data.message || data.mensaje),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#FE6A6D"
        });
      }
    }
  });
}