/**
 * This class create an object SerachBarFilter for search a string, which is get from the searchbar input, in all recipes
 * It browse all recipes and check if the "needle" exist in title, description or ingredients properties
 * If the algorithm doesn't find the needle in one of those, the affected recipe is delete of the initial array
 */
export class SearchBarFilter {
    constructor (needle, recipes) {
        this.needle = needle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        this.recipes = recipes
    }

    /**
     * Search occurences of needle in recipes
     * @param {array} Index
     * @returns array of recipe
     */
    search (index) {
        
        const start = performance.now()
        // The cursor is placed on the middle of the array at the begin sort
        let min = 0
        let max = index.length -1
        let cursor = ''
        let notNeedle = true
        let recipesId = ''
        
        while (notNeedle) {
            cursor = Math.floor((max-min)/2 + min)

            // If the search is found, we stop the loop 
            if (this.needle === index[cursor][0].substring(0, this.needle.length)) {
                recipesId = index[cursor][1]
                notNeedle = false
            }

            // If the search is not found, we continue
            if (this.needle.localeCompare(index[cursor][0].substring(0, this.needle.length)) < 0) {
                max = cursor
            } else if (this.needle.localeCompare(index[cursor][0].substring(0, this.needle.length)) > 0) {
                min = cursor
            }

            // if max - min = 1, this means that the search doesn't exist in index because there cannot be an element between min and max 
            if (max - min === 1) {
                notNeedle = false
            }
        }

        // If a string is found (id in index), we search if the next one or the previous one are ok too. 
        // It's possible if the length of needle is less than the index word 
        if (recipesId.length !== '' ) {
            let more = cursor + 1
            let less = cursor - 1

            // We continue to search needle if the previous item is OK
            while (this.needle === index[more][0].substring(0, this.needle.length)) {
                recipesId = recipesId.concat(index[more][1])
                // Go to the next item
                more++
            }
            // We continue to search needle if the next item is OK
            while (this.needle === index[less][0].substring(0, this.needle.length)) {
                recipesId = recipesId.concat(index[less][1])
                // Go to the previeous item
                less--
            }
        }

        // Sort array(index obtained) by id (recipeId) and remove all duplicates because when system search, 
        // it validates for example 'coc' for 'coco' and 'cocotte' and add the same recipe id twice
        recipesId = this.removeDuplicates(this.sortId(recipesId, 0))

        // After, sort the result by level
        let sortId = this.sortId(recipesId, 1)
        
        // Finally, we transform index just created by corresponding recipes
        sortId = this.transformIdByRecipe(sortId)

        const duration = performance.now() - start;
        console.log(duration)
        return sortId
    }

    /**
     * Delete all duplicates based on recipeId
     * @param {array} Array of recipesId with their level ([[recipeId1, level], [recipeId2, level], ...])
     * @returns array without duplicates
     */
    removeDuplicates(array) {
        for (let i = 0; i < array.length - 2; i++) {
            // if item has the same recipe id than the next
            if (array[i][0] === array[i + 1][0]) {
                // Added levels of both item
                array[i][1] += array[i + 1][1]
                // Delete the second item
                array.splice(i + 1, 1)
            }
        }
        return array
    }

    /**
     * Sort using quicksort
     * @param {array} array 
     * @param {integer} sortBy The index of array (0: recipeId, 1: level)
     * @returns array sorted
     */
    sortId(array, sortBy) {

        if (array.length > 1) {
            const pivot = array[array.length -1]
            const arrayLeft = []
            const arrayRight = []
            const sortRecipes = []

            // All elements which are higher than pivot are saved in arrayLeft and the others in arrayRight
            for (let i = 0; i < array.length - 1; i++) {

                if (array[i][sortBy] > pivot[sortBy]) {
                    arrayLeft.push(array[i])
                
                } else {
                    arrayRight.push(array[i])
                }
            }

            // the arrayLeft, the pivot and the arrayRight are merge in a new tableau in this order
            // Both array are re-sort with a recursive calls in this function until it remains 1 element
            return sortRecipes.concat(this.sortId(arrayLeft, sortBy), [pivot], this.sortId(arrayRight, sortBy))

        } else {
            return array
        }
    }

    /**
     * Transform array of index in array of recipes
     * @param {*} array 
     * @returns array of recipes
     */
    transformIdByRecipe(array) {

        const recipesFiltered = []

        for (const element of array) {
            const recipe = this.recipes[element[0] - 1]
            recipe.level = element[1]
            recipesFiltered.push(recipe)
        }
        
        return recipesFiltered
    }
}