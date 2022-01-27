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
     * Search occurences of needle in recipes with dichotomous system search
     * @param {array} index
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

        // For each element, we keep only id array (with their level)
        let concatRecipesId = []
        recipesId.forEach(element => {
            concatRecipesId = concatRecipesId.concat([element])
        })
        // We merge all arrays in one and we sort items by id
        concatRecipesId = concatRecipesId.sort((a, b) => a[0] - b[0])

        concatRecipesId = concatRecipesId.map(element => {
            return [...element]
        })

        // We reduce the obtained array : if 2 or more item have the same id, we keep only one and we do the sum for the level 
        let reduceArray = concatRecipesId.filter((element, i, array) => {
            if (array[i-1] !== undefined && element[0] === array[i-1][0]) {
                array[i-1][1] += element[1]
            } else {
                return element
            }
        })

        // We sort the array by level
        reduceArray = reduceArray.sort((a,b) => b[1] - a[1])

        // We transform index by recipes
        const finalRecipes = reduceArray.map(element => {
            const recipe = this.recipes[element[0] - 1]
            recipe.level = element[1]
            return recipe
        })

        const duration = performance.now() - start;
        console.log(duration)

        return finalRecipes
    }
}