/**
 * Class for create items and put them in dropdown list
 */ 
export class DropdownList {
    constructor (arrayItems, target) {
        this._arrayItems = arrayItems
        this.target = target
        this.filter = target.dataset.name
        this.dropdownMenu = document.createElement('div')
    }

    get arrayItems() {
        return this._arrayItems
    }

    set arrayItems (arrayItems) {
        this._arrayItems = arrayItems
    }

    // Build listbox HTML
    build () {
        // Save the button clicked in localstorage and remove it
        const button = this.target.querySelector('.dropdown-toggle')
        sessionStorage.setItem('button', this.filter)
        button.style.display = 'none'
        button.setAttribute('aria-expanded', true)

        // Replace the button by the listbox
        this.dropdownMenu.classList.add('dropdown-list', 'rounded')
        this.dropdownMenu.setAttribute('aria-labelledby', `dropdown-${this.filter}`)
        this.dropdownMenu.innerHTML = 
            `
                <div class="row" data-name="${this.filter}">
                    <form action="#" class="dropdown-search" id="search-bar-${this.filter}">
                        <label for="search-${this.filter}" id="title-${this.filter}" class="form-label d-none">Rechercher un ${this.label()}</label>
                        <input type="search" id="search-${this.filter}" class="form-control py-4 border-0 dropdown-input" placeholder="Rechercher un ${this.label()}" aria-labelledby="search-bar-${this.filter}">
                        <i class="fas fa-chevron-up close-dropdown" role="button"></i>
                    </form>
                    <div class="items-content row" aria-label="Liste des ${this.label()}"></div>
                </div>
            `

        this.buildItems()
        
        this.target.append(this.dropdownMenu)
        this.target.classList.replace('close', 'open')
    }

    buildItems () {
        const itemsContent= this.dropdownMenu.querySelector('.items-content')

        this.arrayItems.forEach((element) => {
            const item = document.createElement('div')
            item.classList.add('item', 'col-12', 'col-lg-6','col-xl-4', 'py-1')
            item.setAttribute('data-value', element)
            item.setAttribute('role', 'option')
            item.innerHTML = element
            itemsContent.append(item)
        })
    }

    label () {
        if (this.filter === 'ingredients') {
            return 'ingredient'
        }
        if (this.filter === 'appliances') {
            return 'appareil'
        }
        if (this.filter === 'ustensils') {
            return 'ustensile'
        }
    } 
}