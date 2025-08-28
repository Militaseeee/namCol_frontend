import { loginUser, forgotPassword, resetPassword } from "../../services/loginService.js";
import { navigate } from "../../router.js";
import { saveLocalStorage, saveSessionStorage} from "../../services/auth.js";

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

      console.log("✅ " + data.message);

      
      navigate("/");
    } else {
      console.log("❌ " + (data.message || data.mensaje));
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
      console.log("✅ " + data.message);
      navigate("/signin");
    } else {
      console.log("❌ " + (data.message || data.mensaje));
    }
  });
}

export function initResetPassword(token){
  const form = document.getElementById("resetPassForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
      console.log("❌ Las contraseñas no coinciden");
      return;
    }

    if (!token) {
      console.log("❌ Token no proporcionado");
      return;
    }

    const { ok, data } = await resetPassword(token, password);

    if (ok) {
      console.log("✅ " + data.message);
      navigate("/signin");
      console.log("✅ Contraseña restablecida con éxito");
    } else {
      console.log("❌ " + (data.message || data.mensaje));
    }
  });
}