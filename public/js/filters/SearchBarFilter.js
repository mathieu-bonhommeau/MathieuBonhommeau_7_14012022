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
     * @param {array} index
     * @returns array of recipe
     */
    search (index) {
        const start = performance.now()
        // Create a clone of index for avoid reference problems
        // At each input character, the index is reset
        const indexClone = JSON.parse(JSON.stringify(index));

        // Filter elements of index and return only those which are match to the search
        const recipesId = indexClone.filter((element) => {
            return this.needle === element[0].substring(0, this.needle.length)
        })

        // For each element, we keep only id array (with their level)
        let concatRecipesId = []
        recipesId.forEach(element => {
            concatRecipesId = concatRecipesId.concat([element[1]])
        })
        // We merge all arrays in one and we sort items by id
        concatRecipesId = concatRecipesId.flat().sort((a, b) => a[0] - b[0])

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