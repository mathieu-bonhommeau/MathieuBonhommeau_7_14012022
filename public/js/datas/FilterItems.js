export class FilterItems {
    static getIngredients (datas) {
        // Create an ingredients array - We filter datas for get only ingredients
        let ingredients = []
        datas.forEach((element) => {
            element.ingredients.forEach((e) => {
                // Change the firs letter in upperCase and concat with rest of the text
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
                    // Change the firs letter in upperCase and concat with rest of the text
                    const ustensil = e[0].toUpperCase() + e.slice(1)
                    ustensils.push(ustensil)
                }
            })
        })
        // Delete duplicates elements
        return new Set(ustensils)
    }
}
