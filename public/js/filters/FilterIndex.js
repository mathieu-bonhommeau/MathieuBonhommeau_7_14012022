/**
 * Class for create an index of all string search possibilities with avaible ids 
 */
export class FilterIndex {

    /**
     * Function for build an index (array) with all avaible words recipes without special characters, uppercase, less than 3 letters...
     * Each word has a level for manage the pertinence in the recipe
     * @param {array} recipes 
     */
    static buildIndex (recipes) {
        
        // Create an array with all avaible words in each recipe
        const recipesSringify = recipes.map(recipe => {

            let string = `${recipe.name} ${recipe.description}`
            for (const ingredient of recipe.ingredients) {
                string += ` ${ingredient.ingredient}`
            }
          
            // Take off all special characters
            string = string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            // Take off all words which have less than 3 characters and split the string into an array
            return string.replace(/\b.{0,3}\b/g, ',').replace(/[^a-z0-9,]{1}/g, '').split(/,{1,}/g)
        })

        // Create an index of all avaible words for all recipe - Using the Map object
        const map = new Map()

        // For each recipe
        recipesSringify.forEach(recipe => {
            // For each word in a recipe
            recipe.forEach(word => {
                
                if (word === "") {
                    return
                }

                // If the word doesn't exists in the index, we create it with recipe id and a level 1
                if (map.get(word) === undefined) {
                    map.set(word, [[recipesSringify.indexOf(recipe) + 1, 1]])

                // If the word exists and the id of recipe is already save in the index for this word, we increment level by 1
                } else if (map.get(word)[map.get(word).length - 1][0] === recipesSringify.indexOf(recipe) + 1) {
                    map.get(word)[map.get(word).length - 1][1]++

                // If the word exists but the recipe id isn't save in index for this word, we create a new entrie with recipe id and a level 1
                } else if (map.get(word)[map.get(word).length - 1][0] !== recipesSringify.indexOf(recipe) + 1) {
                    map.get(word).push([recipesSringify.indexOf(recipe) + 1, 1])
                }
            })
        })

        // Convert map to a classical array and sort by alphabetical order
        return Array.from(map).sort()
    }
}