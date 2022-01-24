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

        // Transform all compared string in normalize unicode for take off accent and specials characters
        const lowerNeedle = this.needle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")

        const recipes = this.recipes.map((element) => {

            // Add a new propertie named level for each recipe and initialize it at 0
            // It use for sort recipe by pertinency after the filter operation
            let level = 0

            // Check if needle exist in recipe title
            const name = element.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            if (name.indexOf(lowerNeedle) !== -1) {
                level++
            }

            // Check if needle exist in recipe description
            const description = element.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            if (description.indexOf(lowerNeedle) !== -1) {
                level++
            }

            // Check if needle exist in recipe ingredients - If one occurence is found, the for loop stop
            element.ingredients.join(' ')
            if (element.ingredients.join(' ').indexOf(lowerNeedle) !== -1) {
                level++
            }

            // Add level property in each recipe
            element.level = level
            return element
        })

        // Filter element by level property - All of them whiwh are a level under 0 are delete
        // Call sortRecipesFiltered for sort element by level
        const recipesFiltered = recipes.filter((element) => element.level > 0)

        return recipesFiltered.sort((a, b) => b.level - a.level)

    }
}