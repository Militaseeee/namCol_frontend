// Import required dependencies
import { getRecipes } from '../../services/ingredientService';

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
    const data_filter = json.filter((item) => item.category === category);
    return data_filter;
}

/**
 * Display recipes in the grid
 * @param {string} category - Optional category to filter recipes
 */
export async function showa_recipes(category = '') {
    // Filter data if category is provided, otherwise show all recipes
    const data = category ? filter_category(data_recipes, category) : data_recipes;
    
    // Clear current recipes
    recipes_list && (recipes_list.innerHTML = '');
    
    // Build HTML for recipe cards
    let list_html = '';
    data?.forEach(item => {
        const html = `
        <div class="recipe-card" data-category="${item.category}">
            <div class="recipe-image">
                <img src="${item.image_url}" alt="${item.title}" class="recipe-img">
            </div>
            <h3 class="recipe-title">${item.title}</h3>
        </div> `;
        list_html += html;
    });

    // Insert recipe cards into the grid
    recipes_list && (recipes_list.innerHTML = list_html);
    // Add hover effects after cards are rendered
    setTimeout(addRecipeCardHoverEffect, 0);
}

/**
 * Handles the active class on filter buttons
 * @param {HTMLElement} clickedButton - The button that was clicked
 */
function toggleActiveFilter(clickedButton) {
    // Remove active class from all buttons
    const allFilterButtons = document.querySelectorAll('.filter-btn');
    allFilterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    clickedButton.classList.add('active');
}

// Set up event listener for "All recipes" button
const allBtn = document.querySelector('[data-filter="all"]');
if (allBtn) {
    allBtn.addEventListener('click', e => {
        e.preventDefault();
        toggleActiveFilter(e.target);
        showa_recipes();
    });
}

const categorys_btns = document.querySelectorAll('#filter-category');
categorys_btns.forEach(btn => {
    btn.addEventListener('click', e => {
        const category = e.target.textContent;
        toggleActiveFilter(e.target);
        showa_recipes(category);
    });
});

/**
 * Add hover animation effects to recipe cards
 */
function addRecipeCardHoverEffect() {
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach(card => {
        // Add hover class when mouse enters
        card.addEventListener('mouseenter', () => {
            card.classList.add('recipe-card-hover');
        });
        // Remove hover class when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.classList.remove('recipe-card-hover');
        });
    });
}

/**
 * Initialize the recipes page
 * This function is exported and called by the router
 */
export async function initRecipes() {
    await initData();
    await showa_recipes();
}
