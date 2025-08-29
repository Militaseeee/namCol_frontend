<img src="src\assets\Logo.svg" alt="NamCol Logo" width="300" style="display: flex; justify-self: center; padding-bottom: 2rem"/>

This repository contains the development of the frontend for an interactive web application designed to promote Colombian gastronomy. The platform allows both national and international users to discover, learn, and prepare traditional Colombian recipes through a step-by-step guided experience, from selecting ingredients to the final preparation.

The interface is designed to be intuitive, dynamic, and responsive, ensuring smooth navigation across different devices. It also includes free features and premium options that enhance the experience by offering exclusive and personalized content.

The frontend consumes services provided by the backend through a REST API, ensuring efficient communication and a seamless user experience.

## 📁 Project Structure
```
namCol_frontend/
├── src/
│   ├── assets/
│   │   └── icons/
│   │
│   ├── pages/
│   │   ├── about/
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   ├── contact/
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   ├── home/
│   │   │   ├── index.html
│   │   │   └── index.js
│   │   ├── list_ingredients/
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   ├── login/
│   │   │   ├── formFP.html
│   │   │   ├── formRP.html
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   ├── preparation/
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   ├── profile/
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   ├── recipes/
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   ├── restaurants/
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   └── sign_up/
│   │       ├── index.html
│   │       ├── index.js
│   │       └── style.css
│   │
│   ├── services/
│   │   ├── auth.js
│   │   ├── ingredientService.js
│   │   ├── loginService.js
│   │   ├── preparationService.js
│   │   ├── profileService.js
│   │   ├── services.js
│   │   ├── signupService.js
│   │   └── utils.js
│   │
│   ├── styles/
│   │   └── style.css
│   │
│   ├── router.js
│   │
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── README.md

```

---

## 📂 Folder & File Explanation  


- **`src/`** → Main source code of the frontend application.  
  - **`assets/`** → Contains static resources such as images, icons, or other media used across the app.  
    - **`icons/`** → Icon set used in the user interface.  
  - **`pages/`** → Contains the HTML, JS, and CSS files for each main section of the application.  
    - **`about/`** → Page with general information about the project or application.  
    - **`contact/`** → Page with a contact form or communication details.  
    - **`home/`** → Main landing page of the application.  
    - **`list_ingredients/`** → Page where users can view and manage the list of ingredients.  
    - **`login/`** → User authentication pages (login form, password recovery, etc.).  
    - **`preparation/`** → Step-by-step preparation instructions for each recipe.  
    - **`profile/`** → User profile page, where personal information and preferences can be managed.  
    - **`recipes/`** → Displays the list of available Colombian recipes.  
    - **`restaurants/`** → Page that lists restaurants related to Colombian cuisine.  
    - **`sign_up/`** → User registration (sign-up form).  
  - **`services/`** → Contains JavaScript files that handle communication with the backend API and utility functions.  
    - **`auth.js`** → Authentication handling (tokens, sessions).  
    - **`ingredientService.js`** → Functions related to ingredient data.  
    - **`loginService.js`** → Logic for user login requests.  
    - **`preparationService.js`** → Functions to fetch and manage recipe preparation steps.  
    - **`profileService.js`** → User profile data management.  
    - **`services.js`** → Centralized service file with general API functions.  
    - **`signupService.js`** → Logic for user registration requests.  
    - **`utils.js`** → Helper functions and utilities used across services.  
  - **`styles/`** → Global styles and CSS definitions for the application.  
    - **`style.css`** → Main stylesheet applied across the frontend.  
  - **`router.js`** → Manages client-side navigation between different pages in a SPA-like structure.  

---

## ⚙️ Root Files  

- **`.gitignore`** → Defines files and folders ignored by Git version control.  
- **`index.html`** → Entry point of the application, base HTML file loaded in the browser.  
- **`package.json`** → Defines project dependencies, scripts, and metadata.  
- **`package-lock.json`** → Locks the versions of installed dependencies for consistency.  
- **`README.md`** → Documentation file that explains the project, how to install, and how to use it.  

---

## 🔧 Configuration and Installation

1) Clone the repository
```powershell
git clone https://github.com/Militaseeee/namCol_frontend.git
cd namCol_frontend;
```

2) Install dependencies
```bash
npm install
```

3) Start the development server
```bash
npm run dev
```

---

## 🚀 Technologies Used  

This project was built with:  

- **JavaScript (Vanilla JS)** → For application logic and interactivity.  
- **CSS (Vanilla CSS)** → For styling and responsive design.  
- **Vite** → Development environment and build tool for fast and optimized frontend.  
- **SPA (Single Page Application)** → Navigation and routing handled on the client-side with `router.js`.  

