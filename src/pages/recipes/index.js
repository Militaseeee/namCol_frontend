// Import required dependencies
import { getRecipes } from '../../services/ingredientService';
import { navigate } from "../../router.js";

// Initialize variables to store recipes data and DOM element
let data_recipes = null;
let recipes_list = null;

/**
 * Initialize data by fetching recipes from API and getting DOM element
 */
async function initData() {
    // Fetch recipes data from the API
    data_recipes = await getRecipes();    
    
    // Get the recipes grid container element
    recipes_list = document.querySelector('.recipes-grid');
}

/**
 * Filter recipes by category
 * @param {Array} json - Array of recipes
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered recipes
 */
const filter_category = (json, category) => {
    const data_filter = json.filter(item => 
        item.category.toLowerCase().includes(category.toLowerCase())
    );
    return data_filter;
};

/**
 * Filter recipes by search term
 * @param {Array} recipes - Array of recipes to filter
 * @param {string} searchTerm - Term to search for in recipe titles
 * @returns {Array} Filtered recipes
 */
const filterBySearch = (recipes, searchTerm) => {
    if (!searchTerm) return recipes;
    let data_filter = recipes.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (!data_filter.length) {
        data_filter = filter_category(recipes, searchTerm);
    }
    return data_filter;
};

/**
 * Display recipes in the grid
 * @param {string} category - Optional category to filter recipes
 * @param {string} searchTerm - Optional search term to filter recipes
 */
export async function showa_recipes(category = '', searchTerm = '') {
    // Apply both category and search filters
    let data_filter = [...data_recipes];
    
     if (category && category !== 'all') {
        data_filter = filter_category(data_filter, category);
    }

    if (searchTerm) {
        data_filter = filterBySearch(data_filter, searchTerm);
    }

    if (!data_filter.length) {
        recipes_list.innerHTML = '<p class="recipe-title">the category does not exist</p>';
        return;
    }

    // Clear current recipes
    recipes_list.innerHTML = '';
    
    // Build HTML for recipe cards
    let list_html = '';
    data_filter.forEach(item => {
        list_html += `
            <div class="recipe-card" data-category="${item.category}">
                <div class="recipe-image">
                    <img src="${item.image_url}" alt="${item.title}" class="recipe-img">
                </div>
                <h3 class="recipe-title">${item.title}</h3>
            </div>`;
    });
    
    // Insert recipe cards into the grid
    recipes_list.innerHTML = list_html;
    
    // Now that the cards exist, we add events
    addRecipeCardHoverEffect();
    addRecipeCardClickEvent();
}

/**
 * Add hover animation effects to recipe cards
 */
function addRecipeCardHoverEffect() {
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('recipe-card-hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('recipe-card-hover');
        });
    });
}

function addRecipeCardClickEvent() {
    const cards = document.querySelectorAll(".recipe-card");

    cards.forEach(card => {
        // Mouse click
        card.addEventListener("click", () => goToRecipe(card));

        // Activate with Enter
        card.setAttribute("tabindex", "0");
        card.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                goToRecipe(card);
            }
        });
    });
}

function goToRecipe(card) {
    const title = card.querySelector(".recipe-title").textContent;
    const recipe = data_recipes.find(r => r.title === title);

    localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
    navigate("/listingredients");
}
function toggleActiveFilter(selectedBtn) {
    // Remove "active" from all buttons
    const buttons = document.querySelectorAll('[data-filter]');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add "active" to the clicked button
    selectedBtn.classList.add('active');
}

function initFilters() {
    // Set up event listener for "All recipes" button
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) {
        allBtn.addEventListener('click', e => {
            toggleActiveFilter(e.target);
            showa_recipes("all");
        });
    }

    // Category buttons
    const categorys_btns = document.querySelectorAll('[id^="filter-"]');
    categorys_btns.forEach(btn => {
        btn.addEventListener('click', e => {
            const currentCategory = e.target.dataset.filter;
            toggleActiveFilter(e.target);
            showa_recipes(currentCategory);
        });
    });

    // Search
    const searchInput = document.querySelector('#search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const currentSearch = searchInput.value;    
            showa_recipes(undefined, currentSearch);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const currentSearch = e.target.value;
                showa_recipes(undefined, currentSearch);
            }
        });

        searchInput.addEventListener('input', (e) => {
            const currentSearch = e.target.value;
            showa_recipes(undefined, currentSearch);
        });
    }
}

/**
 * Initialize the recipes page
 * This function is exported and called by the router
 */
export async function initRecipesPage() {
    await initData();
    await showa_recipes();
    initFilters();
}
