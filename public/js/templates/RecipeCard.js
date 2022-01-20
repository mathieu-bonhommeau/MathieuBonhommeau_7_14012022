/**
 * Class for create Recipe card and display it on the page
 */
export class RecipeCard {
    constructor (recipe) {
        this.recipe = recipe
        this.recipeSection = document.querySelector('#recipe-section .row')
    }

    /**
     * Insert the card in the recipe section
     */
    build () {
        this.recipeSection.append(this.cardDOM())
    }

    /**
     * Create recipe card 
     * @returns html element
     */
    cardDOM () {
        const cardDOM = document.createElement('div')
        cardDOM.classList.add('col-4', 'mb-5')
        let cardHTML =
            `
                <div class="card h-100">
                    <div class="card-image"></div>
                    <div class="card-header d-flex justify-content-between align-items-center pt-3">
                        <h2 class="card-title fw-normal mb-0 w-75">${ this.recipe.name }</h2>
                        <span class="card-time fw-bold">${ this.recipe.time } min</span>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <ul class="col-6 list-unstyled list-group">
            `
        // Create HTML for each ingredients of the recipe and adapt text (abbreviations and troncate)
        this.recipe.ingredients.forEach(element => {
            cardHTML += 
                `
                    <li class="list-group-item card-list">
                        ${ element.ingredient ? '<span class="fw-bold">' + element.ingredient + '</span>' : '' }
                        ${ element.quantity ? ': ' + element.quantity : '' }
                        ${ element.unit ? element.unit.replace('grammes', 'g').replace('cuillères à soupe', 'cs') : '' }</li>
                `
        })
        
        cardHTML += `  
                            </ul>
                            <div class="col-6">
                                <p class="card-text text-justify">
                                    ${ this.recipe.description.length > 200 ? this.recipe.description.substr(0, 200) + '...' : this.recipe.description }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        
        cardDOM.innerHTML = cardHTML
        return cardDOM
    }
}