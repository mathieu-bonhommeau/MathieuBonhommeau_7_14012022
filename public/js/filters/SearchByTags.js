/**
 * Class for filter recipes by tags
 */
 export class SearchByTags {
    /**
     * 
     * @param {array} recipesToFilter The recipes which are filter or not by the search bar input
     * @param {HTMLObject} tagDOM Tag Html element display on the DOM
     */
    constructor (recipesToFilter, tagDOM) {
        this.recipesToFilter = recipesToFilter
        this.keyword = tagDOM.dataset.value
        this.listbox = tagDOM.dataset.list
    }

    /**
     * Fonction for adapt listbox content in term of input value in listbox
     * @returns array
     */
    filter () {

        if (this.listbox === 'ingredients') {
            return this.recipesToFilter.filter(element => {
                return element.ingredients.some(e => e.ingredient.toLowerCase() === this.keyword.toLowerCase())
            })

        } else if (this.listbox === 'appliances') {
            
            return this.recipesToFilter.filter(element => element.appliance.toLowerCase() === this.keyword.toLowerCase())
        
        } else if (this.listbox === 'ustensils') {
            return this.recipesToFilter.filter(element => {
                return element.ustensils.some(e => e.toLowerCase() === this.keyword.toLowerCase())
            })
        }
    }

}