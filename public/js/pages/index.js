import { Datas } from '../datas/Datas.js'
import { Recipe } from '../models/Recipe.js'
import { RecipeCard } from '../templates/RecipeCard.js'
import { displayListbox } from '../listeners/displayListbox.js'
import { closeListbox } from '../listeners/displayListbox.js'
import { SearchBarFilter } from '../filters/SearchBarFilter.js'
import { FilterIndex } from '../filters/FilterIndex.js'
import { Message } from '../templates/Message.js'
import { SearchByTags } from '../filters/SearchByTags.js'
/**
 * Class for display the homepage
 */
class Index {
    constructor () {
        // Create a Datas object for api connection
        this._datas = new Datas('./datas/recipes.json')
    }

    /**
     * Asynchrone function for display data on homepage
     */
    async displayIndex () {
        // Get datas by Datas object
        let datas = await this._datas.getFullDatas()
        // For save recipes after each filter
        let recipeFiltered = ''
        // For save initial results by search bar and go back when search by tags is remove
        let initialSearch = ''
        
        // Block code for test the performance of this algorithm    
        /*for (let i = 0; i < 5; i++) {
            let test = JSON.parse(JSON.stringify(datas));
            test.map((element) => {
                if (element === undefined) {
                    return
                }
                
                element.name = element.name+i
                element.description = element.description+i
                element.ingredients.map(e => e.ingredient = e.ingredient+i) 

                return element
            })
            datas = datas.concat(test)
        }*/

        // Build an indexation table - Gather all same words/strings and save their recipes id
        const index = FilterIndex.buildRecipesIndex(datas)

        // Create a Recipe object with datas and create card displayed on DOM
        this.createRecipes(datas)

        // Principal Search -------------------------------------------------
        // Event listener for principal search - Searchbar
        const searchBarInput = document.querySelector('#search-bar')

        searchBarInput.addEventListener('focus', () => {

            // If a listbox is already opened - close it when when the focus is on the search bar
            const listboxOpened = sessionStorage.getItem('button')
            if (listboxOpened && listboxOpened.length > 0) {
                closeListbox(listboxOpened)
            }
        })

        let tags = document.querySelector('.tags-location')

        searchBarInput.addEventListener('keyup', (event) => {

            // Get the string which we must search in recipes
            const search = event.target.value

            // If we change the search in search bar, we remove all tags
            tags.innerHTML = ''

            // Reset recipes in the DOM
            document.querySelector('#recipe-section .row').innerHTML = ''

            // Do nothing while number of characters are less than 3
            while (search.length < 3) {
                recipeFiltered = ''
                this.createRecipes(datas)
                return
            }

            // Call the function for filter
            const $searchBarFilter = new SearchBarFilter (search, datas, index)
            // Retrieve recipes filtered
            recipeFiltered = $searchBarFilter.search()
            initialSearch = recipeFiltered

            // If any recipe is found by the search
            if (recipeFiltered.length < 1) {
                if (document.querySelector('.alert') < 1) {
                    const message = new Message ('Aucune recette ne correspond à votre critère…, vous pouvez chercher "tarte aux pommes", "poisson", etc.')
                    message.build()
                    recipeFiltered = datas
                }
                // Close the alert message
                document.querySelector('.btn-close').addEventListener('click', event => {
                    event.target.parentNode.remove()
                })
                this.createRecipes(datas)

            } else {
                if (document.querySelectorAll('.alert').length > 0) {
                    document.querySelector('.alert').remove()
                }
                // Create a Recipe object with datas and create card displayed on DOM
                this.createRecipes(recipeFiltered)
            }
        })

        // Search by tags ---------------------------------------------------------
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
                    recipeFiltered !== '' ? displayListbox(recipeFiltered, listbox) : displayListbox(datas, listbox)
                } 
            })
        })

        // Use a mutation observer for retrieve tag when it display on the DOM 
        // config : options for say at our observer what observe
        const config = { childList: true, subtree: true }

        // Init the observer
        let tagsObserver = new MutationObserver(mutationsList => {
            // For each mutation on tag-content element - Do :
            mutationsList.forEach(element => {
                // If the search was setting up with search bar, we get initial results
                if (!initialSearch) {
                    initialSearch = datas
                }

                // Use recipeFiltered if it exist else use datas (all recipes)
                let recipesToFilter = recipeFiltered ? recipeFiltered : datas

                let recipesFilterByTags = ''

                // If we add a tag for the search
                if (element.addedNodes.length > 0) {
                    // Init the search by tags and filter
                    recipesFilterByTags = (new SearchByTags (recipesToFilter, element.addedNodes[0])).filter()
                }

                // If we remove a tag from the search
                if (element.removedNodes.length > 0) {

                    const tags = document.querySelectorAll('.tag')
                    // if it stay tags on the DOM
                    if (tags.length > 0) {
                        recipesToFilter = initialSearch
                        
                        tags.forEach(element => {
                            recipesToFilter = (new SearchByTags (recipesToFilter, element).filter())
                            recipesFilterByTags = recipesToFilter
                        })
                        if (recipesFilterByTags === '') {
                            tags.forEach(element => element.remove())
                        }
                    // If no tags, we display all recipes
                    } else {
                        if (initialSearch && document.querySelector('#search-bar').value.length < 3) {
                            recipesFilterByTags = datas
                        } else {
                            recipesFilterByTags = initialSearch
                        }
                    }
                }

                // Empty all recipes
                document.querySelector('#recipe-section .row').innerHTML = ''

                // Create recipes filtered by tags and display on the DOM
                this.createRecipes(recipesFilterByTags)

                // Adapt recipeFiltered for continue the search
                recipeFiltered = recipesFilterByTags
            })
        })
        // Say at the observer : Start observe !
        tagsObserver.observe(tags, config)
    }

    /**
     * Function for create recipe card in the DOM
     * @param {array} datas 
     */
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