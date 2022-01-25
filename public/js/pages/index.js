import { Datas } from '../datas/Datas.js'
import { Recipe } from '../models/Recipe.js'
import { RecipeCard } from '../templates/RecipeCard.js'
import { displayListbox } from '../listeners/displayListbox.js'
import { closeListbox } from '../listeners/displayListbox.js'
import { SearchBarFilter } from '../filters/SearchBarFilter.js'
import { FilterIndex } from '../filters/FilterIndex.js'

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
        
        // Build an indexation table - Gather all same words/strings and save their recipes id
        const index = FilterIndex.buildIndex(datas)
        console.log(index)
        // Create a Recipe object with datas and create card displayed on DOM
        this.createRecipes(datas)

        // Event listener for principal search - Searchbar
        const searchBarInput = document.querySelector('#search-bar')
        searchBarInput.addEventListener('keyup', (event) => {

            // Get the string which we must search in recipes
            const search = event.target.value
            // Do nothing while number of characters are less than 3
            while (search.length < 3) {
                this.createRecipes(datas)
                return
            }
            // Call the function for filter
            const $searchBarFilter = new SearchBarFilter (search, datas)
            const recipeFiltered = $searchBarFilter.search(index)
            if (recipeFiltered.length > 0) {
                document.querySelector('#recipe-section .row').innerHTML = ''
            }

            // Create a Recipe object with datas and create card displayed on DOM
            this.createRecipes(recipeFiltered)
        })

        // Event listeners when click on dropdown button for display listboxs
        const dropdowns = document.querySelectorAll('.dropdown-filters')
        dropdowns.forEach((element) => {
            element.addEventListener('click', (event) => {
                // this event is dispatch only on click on a dropdown button
                if (event.target.dataset.type === 'button') {
                    // If a listbox is already opened - close it
                    const listboxOpened = sessionStorage.getItem('button')
                    if (listboxOpened && listboxOpened.length > 0) {
                        closeListbox(listboxOpened)
                    }
                    // Retrieve parent element for replace the button by the listbox
                    const listbox = event.target.parentElement
                    displayListbox(datas, listbox)
                } 
            })
        })
    }

    createRecipes (datas) {
        datas.forEach((element) => {
            const recipe = new Recipe(element)
            const recipeCard = new RecipeCard(recipe)
            recipeCard.build()
        })
    }
}

// Clear session storage when the page is reload
document.addEventListener("DOMContentLoaded", () => sessionStorage.clear())

const index = new Index ()
index.displayIndex ()