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
        // Initialize an array for receive all key (word) -> values (id of recipes and level)
        let arrayWithKey = []

        // Get all values in each recipe properties (name, description, ingredients) and join all of them for build a big string, with for index, their id
        // For example : "1": "bing string with all words ..."
        for (const recipe of recipes) {

            let string = `${recipe.name} ${recipe.description}`
            for (const ingredient of recipe.ingredients) {
                string += ` ${ingredient.ingredient}`
            }

            // Take off all special characters
            string = string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            // Take off all words which have less than 3 characters and split the string into an array
            const array = string.replace(/\b.{0,3}\b/g, ',').replace(/[^a-z0-9,]{1}/g, '').split(/,{1,}/g)

            // For each word of big string
            for (const word of array) {
                if (word === "") {
                    continue
                }

                // First, we create an array that as for key the word and push another array with the recipe id and a level 1 for the pertinence
                if (arrayWithKey[word] === undefined) {
                    arrayWithKey[word] = []
                    arrayWithKey[word].push([recipe.id, 1])

                // Secondly, if same word is find in big string (during the next loop), we increment level (this word is more relevant for this recipe)
                // Check only the last item of arrayWithKey[word] because the loop reads recipes in ascending order and they are sorted by id in the json
                } else if (arrayWithKey[word] !== undefined && arrayWithKey[word][(arrayWithKey[word].length-1)][0] === recipe.id) {
                    arrayWithKey[word][(arrayWithKey[word].length-1)][1]++

                // Finally, if the word exists but the recipe.id is not save in this item, we push another array with the recipe id and a level 1 
                } else if (arrayWithKey[word] !== undefined && arrayWithKey[word][(arrayWithKey[word].length-1)][0] !== recipe.id) {
                    arrayWithKey[word].push([recipe.id, 1])
                }
            }
        }

        // Initialize 'index' for receive key/values pairs of arrayWithKey in a classical and iterable array (with index)
        const index = []
        for (const [key, value] of Object.entries(arrayWithKey)) {
            index.push([key, value])
        }

        return this.sortIndex(index)
    }

    // Function for sort index in alphabetical order - It use a quicksort implementation
    static sortIndex(array) {
        // If the array has only one element, it is return automatically
        if (array.length > 1) {
            const sortIndex = []
            const arrayLeft = []
            const arrayRight = []
            
            // Choose a random index in the array - User for the pivot of the quickSort
            const pivot = array.length - 1

            // All elements which are higher than pivot(in alphabetical order) are saved in arrayLeft and the others in arrayRight
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i][0].localeCompare(array[pivot][0]) < 0) {
                    arrayLeft.push(array[i])
                } else {
                    arrayRight.push(array[i])
                }
            }

            // the arrayLeft, the pivot and the arrayRight are merge in a new tableau in this order
            // Both array are re-sort with a recursive calls in this function until it remains 1 element
            return sortIndex.concat(this.sortIndex(arrayLeft), [array[pivot]], this.sortIndex(arrayRight))
        
        } else {
            return array
        }
    }
}