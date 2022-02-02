/**
 * This class create an object SerachBarFilter for search a string, which is get from the searchbar input, in all recipes
 * It browse all recipes and check if the "needle" exist in title, description or ingredients properties
 * If the algorithm doesn't find the needle in one of those, the affected recipe is delete of the initial array
 */
export class SearchBarFilter {
    constructor (needle, recipes, index) {
        this.needle = needle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        this.recipes = recipes
        this.index = index
    }

    /**
     * Search occurences of needle in recipes with dichotomous system search
     * @param {array} index
     * @returns array of recipe
     */
    search () {
        // Test the performance - start the stopwatch
        const start = performance.now()
        
        // Containes all results of search in the index
        let recipesId = []
        // Array for keep only id of founded recipe without their level for each word (For see after, if a recipe is in two or more search)
        let recipeIdsWithoutLevel = []
        // Array for save ids of recipes when one is founded for two or more words in the search
        let interRecipes = []
        
        // We split the needle with space separator for allow search many words in one time
        const needles = this.needle.split(' ')

        // We loop on all words founded in needle and search
        needles.forEach(word => {
            if (word.length < 3) {
                return
            }
            // Find the word in the index
            const wordRecipesId = this.find(word)
            
            if (wordRecipesId.length > 0) {
                // Save only ids of recipe in an array 
                recipeIdsWithoutLevel.push(wordRecipesId.map(element => element[0]))

                recipesId.push(wordRecipesId)
            
            } else {
                recipesId = ''
            }
        })
        
        // Compare arrays (with only ids) for check if a recipe is in two or more fold, in this case, we save id in interRecipes array
        recipeIdsWithoutLevel[0].forEach((element) => {
            let duplicate = 0
            // Loop on elements for check if the element id is in another element, if yes, we increment duplicate
            for (let i = 1; i < recipeIdsWithoutLevel.length; i++) {  
                if (recipeIdsWithoutLevel[i].includes(element)) {
                    duplicate++
                }
            }
            // if duplicate has the same value than the length of the array, that means all the words of the search are in this recipe (id)
            if (duplicate === recipeIdsWithoutLevel.length -1) {
                interRecipes.push(element)
            }
            
        })
        
        // If any recipe id are save in interRecipe and several words are in the search, that means any recipe corresponds
        if (interRecipes.length === 0 && recipeIdsWithoutLevel.length > 1) {
            recipesId = ''
        }
        
        if (recipesId !== '') {

            recipesId = recipesId.flat()

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
            
            if (interRecipes.length > 0) {
                reduceArray = reduceArray.filter(element => interRecipes.includes(element[0]))
            }
            
            // We sort the array by level
            reduceArray = reduceArray.sort((a,b) => b[1] - a[1])
            // We transform index by recipes
            const finalRecipes = reduceArray.map(element => {
                const recipe = this.recipes[element[0] - 1]
                recipe.level = element[1]
                return recipe
            })

            // Test the performance - stop the stopwatch
            const duration = performance.now() - start;
            console.log(duration)

            return finalRecipes

        } else {
            return []
        }
    }

    find (word) {
        // The cursor is placed on the middle of the array at the begin sort
        let min = 0
        let max = this.index.length -1
        let cursor = ''
        let notWord = true
        let recipesId = ''

        while (notWord) {

            cursor = Math.floor((max-min)/2 + min)

            // If the search is found, we stop the loop 
            if (word === this.index[cursor][0].substring(0, word.length)) {
                recipesId = this.index[cursor][1]
                notWord = false
            }

            // If the search is not found, we continue
            if (word.localeCompare(this.index[cursor][0].substring(0, word.length)) < 0) {
                max = cursor
            } else if (word.localeCompare(this.index[cursor][0].substring(0, word.length)) > 0) {
                min = cursor
            }

            // if max - min = 1, this means that the search doesn't exist in index because there cannot be an element between min and max 
            if (max - min === 1) {
                notWord = false
            }
        }

        // If a string is found (id in index), we search if the next one or the previous one are ok too. 
        // It's possible if the length of needle is less than the index word 
        if (recipesId.length !== '' ) {
            let more = cursor + 1
            let less = cursor - 1

            // We continue to search needle if the previous item is OK
            while (word === this.index[more][0].substring(0, word.length)) {
                recipesId = recipesId.concat(this.index[more][1])
                // Go to the next item
                more++
            }
            // We continue to search needle if the next item is OK
            while (word === this.index[less][0].substring(0, word.length)) {
                recipesId = recipesId.concat(this.index[less][1])
                // Go to the previeous item
                less--
            }
        }

        return recipesId
    }
}