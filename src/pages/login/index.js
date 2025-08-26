import { loginUser } from "../../services/loginService.js";
import { navigate } from "../../router.js";
import { saveLocalStorage, saveSessionStorage} from "../../services/auth.js";

export function initLogin() {
  const form = document.getElementById("loginForm");
  const btnSignin = document.getElementById("btnSignin");
  btnSignin.style.display = "none";
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