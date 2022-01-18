import { Datas } from '../datas/Datas.js'
import { Recipe } from '../models/Recipe.js'
import { RecipeCard } from '../templates/RecipeCard.js'
import { displayItems } from '../listeners/displayItems.js'

/**
 * Class for display the homepage
 */
class Index {
    constructor () {
        // Create a Datas object for api connection
        this._datas = new Datas('/datas/recipes.json')
    }

    /**
     * Asynchrone function for display data on homepage
     */
    async displayIndex () {
        // Get datas by Datas object
        const datas = await this._datas.getFullDatas()

        // Create a Recipe object with datas and create card displayed on DOM
        datas.forEach((element) => {
            const recipe = new Recipe(element)
            const recipeCard = new RecipeCard(recipe)
            recipeCard.build()
        })

        // Event listeners when click on dropdown button
        const dropdowns = document.querySelectorAll('.dropdown-filters')
        dropdowns.forEach((element) => {
            element.addEventListener('click', (event) => {
                const listbox = event.target.parentElement
                displayItems(datas, listbox)
            })
        })
    }
}

const index = new Index ()
index.displayIndex ()