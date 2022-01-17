export class Recipe {
    constructor ({id, name, ingredients, time, description, appliance, ustensils}) {
        this._id = id
        this._name = name
        this.ingredients = ingredients
        this._time = time
        this._description = description
        this._appliance = appliance
        this._ustensils = ustensils
    }

    get id () {
        return this._id
    }

    set id (id) {
        this._id = id
    }

    get name () {
        return this._name
    }

    set name (name) {
        this._name = name
    }

    get ingredients () {
        return this._ingredients
    }

    set ingredients (ingredients) {
        this._ingredients = ingredients
    }

    get time () {
        return this._time
    }

    set time (time) {
        this._time = time
    }

    get description () {
        return this._description
    }

    set description (description) {
        this._description = description
    }

    get appliance () {
        return this._appliance
    }

    set appliance (appliance) {
        this._appliance = appliance
    }

    get ustensils () {
        return this._ustensils
    }

    set ustensils (ustensils) {
        this._ustensils = ustensils
    }
}