/**
 * Class for create an index of all string search possibilities with avaible ids 
 */
 export class FilterIndex {

    /**
     * Function for build an index (array) with all avaible words recipes without special characters, uppercase, less than 3 letters...
     * Each word has a level for manage the pertinence in the recipe
     * @param {array} recipes 
     */
    static buildRecipesIndex (recipes) {
        
        // Create an array with all avaible words in each recipe


        const recipesStringify = []

        for (let recipe of recipes) {
            let string = `${recipe.name} ${recipe.description}`
            for (const ingredient of recipe.ingredients) {
                string += ` ${ingredient.ingredient}`
            }

            // Take off all special characters
            string = string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            // Take off all words which have less than 3 characters and split the string into an array
            string = string.replace(/\b.{0,2}\b/g, ',').replace(/[^a-z0-9,]{1}/g, '').split(/,{1,}/g)

            recipesStringify.push(string)
        }

        // Create an index of all avaible words for all recipe - Using the Map object
        const map = new Map()

        // For each recipe
        recipesStringify.forEach(recipe => {
            // For each word in a recipe
            recipe.forEach(word => {
                
                if (word === "") {
                    return
                }

                // If the word doesn't exists in the index, we create it with recipe id and a level 1
                if (map.get(word) === undefined) {
                    map.set(word, [[recipesStringify.indexOf(recipe) + 1, 1]])

                // If the word exists and the id of recipe is already save in the index for this word, we increment level by 1
                } else if (map.get(word)[map.get(word).length - 1][0] === recipesStringify.indexOf(recipe) + 1) {
                    map.get(word)[map.get(word).length - 1][1]++

                // If the word exists but the recipe id isn't save in index for this word, we create a new entrie with recipe id and a level 1
                } else if (map.get(word)[map.get(word).length - 1][0] !== recipesStringify.indexOf(recipe) + 1) {
                    map.get(word).push([recipesStringify.indexOf(recipe) + 1, 1])
                }
            })
        })
        
        
        let index = []

        // Build the index
        for (const [idOfRecipe, recipe] of recipesStringify.entries()) {
            for (let word of recipe) {

                let exist = false
                let id = 0

                for (let [i, element] of index.entries()) {
                    if (word === element[0]) {
                        exist = true
                        id = i
                    
                    }
                }
                
                if (!exist) {
                    index.push([word, [[idOfRecipe + 1, 1]]])
                    
                } else if (exist && index[id][1][index[id][1].length-1][0]-1 === idOfRecipe) {
                    
                    index[id][1][index[id][1].length-1][1]++

                } else if (exist && index[id][1][index[id][1].length-1][0]-1 !== idOfRecipe) {
                    index[id][1].push([idOfRecipe + 1, 1])
                    
                }
            }
        }
    
        return index.sort()
    }

    static buildKeywordsIndex (keywords) {

        const map = new Map()

        keywords.forEach((keyword, i) => {
            // For each word in a keyword
            keyword.forEach(word => {
                if (word === "") {
                    return
                }

                if (map.get(word) === undefined) {
                    map.set(word, [i])
                
                } else {
                    map.get(word).push(i)
                }
            })
        })
        
        return map
    }
}