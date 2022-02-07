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
        cardDOM.classList.add('col-12','col-md-6', 'col-xl-4','mb-5', 'recipe')
        let cardHTML =
            `
                <a href="#" title="Voir cette recette">
                    <div class="card h-100" aria-labelledby="recipe-title-${this.recipe.id}" aria-describedby="recipe-description-${this.recipe.id}">
                        <div class="card-image"></div>
                        <div class="card-header d-flex justify-content-between align-items-center pt-3">
                            <h2 id="recipe-title-${this.recipe.id}" class="card-title fw-normal mb-0 w-75">${ this.recipe.name }</h2>
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
                                    <p id="recipe-description-${this.recipe.id}" class="card-text text-justify">
                                        ${ this.recipe.description.length > 200 ? this.recipe.description.substr(0, 200) + '...' : this.recipe.description }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `
        
        cardDOM.innerHTML = cardHTML
        return cardDOM
    }
}