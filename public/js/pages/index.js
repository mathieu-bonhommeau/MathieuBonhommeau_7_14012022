import { Datas } from '../datas/Datas.js'
import { Recipe } from '../models/Recipe.js'
import { RecipeCard } from '../templates/RecipeCard.js'

class Index {
    constructor () {
        this._datas = new Datas('/datas/recipes.json')
    }

    async displayIndex () {
        const datas = await this._datas.getFullDatas()
        datas.forEach((element) => {
            const recipe = new Recipe(element)
            const recipeCard = new RecipeCard(recipe)
            recipeCard.build()
        })
    }
}

const index = new Index ()
index.displayIndex ()