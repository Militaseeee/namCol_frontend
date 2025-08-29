import { signupUser } from "../../services/signupService.js";
import { navigate } from "../../router.js";
import { showMessage } from "../../services/utils.js";

async function loadCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );
    const countries = await response.json();

    const select = $("#country");

    const validCountries = countries
      .filter(
        (country) =>
          country.name &&
          country.name.common &&
          country.flags &&
          country.flags.svg
      )
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
      .map((country) => {
        return {
          id: country.name.common,
          text: country.name.common,
          flag: country.flags.svg,
        };
      });

    select.select2({
      data: validCountries,
      templateResult: formatOptionWithFlag,
      templateSelection: formatOptionWithFlag,
      placeholder: "Select your country",
      width: "100%",
    });
  } catch (error) {
    console.error("Error loading countries:", error);
  }
}

function formatOptionWithFlag(option) {
  if (!option.id || !option.flag) return option.text;
  return $(`
        <span>
            <img src="${option.flag}" style="width: 20px; height: 15px; margin-right: 8px;">
            ${option.text}
        </span>
    `);
}

export function initRegister() {
  loadCountries();

  const form = document.getElementById("signup-form");
  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const country = document.getElementById("country").value;


    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(fullName)) {
      const element = document.querySelector(".register-page");
      if (element) {
        showMessage({
          text: ("The full name should only contain letters and spaces."),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#FE6A6D"
        });
      }
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      const element = document.querySelector(".register-page");
      if (element) {
        showMessage({
          text: ("Please enter a valid email address."),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#FE6A6D"
        });
      }
      return;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-])[A-Za-z\d!@#$%^&*_\-]{6,}$/;
    if (!passwordPattern.test(password)) {
      const element = document.querySelector(".register-page");
      if (element) {
        showMessage({
          text: ("The password must have at least 6 characters, one capital letter, one number and one special character."),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#FE6A6D"
        });
      }
      return;
    }

    if (country === "") {
      const element = document.querySelector(".register-page");
      if (element) {
        showMessage({
          text: ("Please select your country."),
          className: "alert-message",
          parent: element,
          duration: 4000,
          color: "#FE6A6D"
        });
      }
      return;
    }

    const { ok, data } = await signupUser(fullName, email, password, country);

    if (ok) {
      const element = document.querySelector(".register-page");

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
      const element = document.querySelector(".register-page");
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
