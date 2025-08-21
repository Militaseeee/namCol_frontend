# namCol_frontend

This repository contains the development of the frontend for an interactive web application designed to promote Colombian gastronomy. The platform allows both national and international users to discover, learn, and prepare traditional Colombian recipes through a step-by-step guided experience, from selecting ingredients to the final preparation.

The interface is designed to be intuitive, dynamic, and responsive, ensuring smooth navigation across different devices. It also includes free features and premium options that enhance the experience by offering exclusive and personalized content.

The frontend consumes services provided by the backend through a REST API, ensuring efficient communication and a seamless user experience.

## 📁 Project Structure
```
namCol_frontend/
├── src/
│   ├── assets/
│   │   └── icons
│   ├── pages/
│   │   ├── list_ingredients
│   │   │   └── index.html
│   │   ├── login
│   │   │   └── index.html
│   │   ├── preparation
│   │   │   └── index.html
│   │   ├── profile
│   │   │   └── index.html
│   │   ├── recipes
│   │   │   └── index.html
│   │   └── sign_up
│   │       └── index.html
│   ├── services/
│   │   └── services.js
│   ├── styles/
│   │   └── style.css
│   ├── router.js                
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
  - **`pages/`** → Contains the HTML files for each main section of the application.  
    - **`list_ingredients/`** → Page where users can view and manage the list of ingredients.  
    - **`login/`** → Page for user authentication (login form).  
    - **`preparation/`** → Step-by-step preparation instructions for each recipe.  
    - **`profile/`** → User profile page, where personal information and preferences can be managed.  
    - **`recipes/`** → Displays the list of available Colombian recipes.  
    - **`sign_up/`** → User registration (sign-up form).  
  - **`services/`** → Contains JavaScript files that handle communication with the backend API.  
    - **`services.js`** → Defines the functions for fetching and sending data to the backend (e.g., recipes, users).  
  - **`styles/`** → Global styles and CSS definitions for the application.  
    - **`style.css`** → Main stylesheet applied across the frontend.  
  - **`router.js`** → Manages client-side navigation between different pages.  

- **`.gitignore`** → Specifies intentionally untracked files to ignore in version control (e.g., `node_modules`, logs).  
- **`index.html`** → Main entry point of the application (root page).  
- **`package.json`** → Project metadata and dependencies configuration for Node.js.  
- **`package-lock.json`** → Locks dependency versions to ensure consistency across environments.  
- **`README.md`** → Documentation of the project (this file).  

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

3) Initialize the project
```bash
npm init -y
```

4) Install Vite as a development dependency
```bash
npm install -D vite
```

5) Start the development server
```bash
npm run dev
```
