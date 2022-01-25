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
     * @param {array} Index
     * @returns array of recipe
     */
    search (index) {
        let cursor = Math.floor((index.length -1) / 2)
        let min = 0
        let max = index.length -1
        
        console.log(cursor)
        let notNeedle = true 
        
        while (notNeedle) {
            if (this.needle.localeCompare(index[cursor][0]) < 0) {
                console.log(this.needle)
            }
            return false 
        }
    }

}