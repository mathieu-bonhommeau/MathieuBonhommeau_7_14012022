export class FilterItems {
    static getIngredients (datas) {
        // Create an ingredients array - We filter datas for get only ingredients
        let ingredients = []
        datas.forEach((element) => {
            element.ingredients.forEach((e) => {
                // Change the first letter in upperCase and concat with rest of the text
                if (e !== null) {
                    const ingredient = e.ingredient[0].toUpperCase() + e.ingredient.slice(1)
                    ingredients.push(ingredient)
                }
            })
        })
        // Delete duplicates elements
        return new Set(ingredients)
    }
    
    static getAppliances (datas) {
        // Create an appliance array - We filter datas for get only appliance
        let appliances = []
        datas.forEach((element) => {
            if (element !== null) {
                appliances.push(element.appliance)
            }
        })
        // Delete duplicates elements
        return new Set(appliances)
    }
    
    static getUstensils (datas) {
        // Create an appliance array - We filter datas for get only appliance
        let ustensils = []
        datas.forEach((element) => {
            element.ustensils.forEach((e) => {
                if (e !== null) {
                    // Change the first letter in upperCase and concat with rest of the text
                    const ustensil = e[0].toUpperCase() + e.slice(1)
                    ustensils.push(ustensil)
                }
            })
        })
        // Delete duplicates elements
        return new Set(ustensils)
    }

    static filter (index, needle) {

        // Setup of a dichotomous search
        let min = 0
        let max = index.length - 1
        let cursor = ''
        let notKeyword = true
        let keywords = []

        while (notKeyword) {
            cursor = Math.floor((max-min)/2 + min)

            const word = index[cursor][0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            
            // If needle is found, we stop the loop
            if (needle === word.substring(0, needle.length)) {
                keywords.push(index[cursor])
                notKeyword = false
                
            }

            // If the search is not found, we continue
            if (needle.localeCompare(word.substring(0, needle.length)) < 0) {
                max = cursor
            } else if (needle.localeCompare(word.substring(0, needle.length)) > 0) {
                min = cursor
            }

            // if max - min = 1, this means that the search doesn't exist in index because there cannot be an element between min and max 
            if (max - min === 1) {
                notKeyword = false
            }
        }

        max = cursor + 1
        min = cursor - 1
        
        // Search if another words are corresponding to needle above in the list
        while (index[max] && needle === index[max][0].substring(0, needle.length)) {
            
            keywords.push(index[max])
            max++
        }
        // Search if another words are corresponding to needle below in the list
        while (index[min] && needle === index[min][0].substring(0, needle.length)) {
            keywords.push(index[min])
            min--
        }

        return keywords
    }
}
