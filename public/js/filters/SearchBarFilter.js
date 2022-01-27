/**
 * This class create an object SerachBarFilter for search a string, which is get from the searchbar input, in all recipes
 * It browse all recipes and check if the "needle" exist in title, description or ingredients properties
 * If the algorithm doesn't find the needle in one of those, the affected recipe is delete of the initial array
 */
export class SearchBarFilter {
    constructor (needle, recipes) {
        this.needle = needle
        this.recipes = recipes
    }

    /**
     * Search occurences of needle in recipes
     * @returns array of recipe
     */
    search () {

        const start = performance.now()

        let i = 0
        let j = 0
        let recipesFiltered = []

        while (i < this.recipes.length) {
            // Add a new propertie named level for each recipe and initialize it at 0
            // It use for sort recipe by pertinency after the filter operation
            let level = 0
            // Transform all compared string in normalize unicode for take off accent and specials characters
            const lowerNeedle = this.needle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            
            // Check if needle exist in recipe title
            const name = this.recipes[i].name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            if (name.indexOf(lowerNeedle) !== -1) {
                level++
            }

            // Check if needle exist in recipe description
            const description = this.recipes[i].description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            if (description.indexOf(lowerNeedle) !== -1) {
                level++
            }

            // Check if needle exist in recipe ingredients - If one occurence is found, the for loop stop
            const ingredients = this.recipes[i].ingredients
            for (const ingredient of ingredients) {
                const normalizeIngredient = ingredient.ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                if (normalizeIngredient.indexOf(lowerNeedle) !== -1) {
                    level++
                    break
                }
            }

            // If level = 0, the recipe is delete from the initial array, else, the level properties is add in the recipe with is value
            if (level > 0) {
                recipesFiltered[j] = this.recipes[i]
                recipesFiltered[j].level = level
                j++
            }
            i++
            
        }

        recipesFiltered = this.sortRecipesFiltered(recipesFiltered)

        const duration = performance.now() - start
        console.log(duration)

        return recipesFiltered

    }

    /**
     * Sort the result of filter with a quick sort algorithm
     * @param {Array} array 
     * @returns array of recipes
     */
    sortRecipesFiltered(array) {
        // If the array has only one element, it is return automatically
        if (array.length > 1) {
            const pivot = array[array.length -1]
            const arrayLeft = []
            const arrayRight = []
            const sortRecipes = []

            // All elements which are higher than pivot are saved in arrayLeft and the others in arrayRight
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i].level > pivot.level) {
                    arrayLeft.push(array[i])
                } else {
                    arrayRight.push(array[i])
                }
            }

            // the arrayLeft, the pivot and the arrayRight are merge in a new tableau in this order
            // Both array are re-sort with a recursive calls in this function until it remains 1 element
            return sortRecipes.concat(this.sortRecipesFiltered(arrayLeft), pivot, this.sortRecipesFiltered(arrayRight))

        } else {
            return array
        }
    }

}