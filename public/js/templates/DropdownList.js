/**
 * Class for create items and put them in dropdown list
 */ 
export class DropdownList {
    constructor (arrayItems, target) {
        this.arrayItems = arrayItems
        this.target = target
        this.filter = target.dataset.name
    }

    // Build listbox HTML
    build () {
        // Save the button clicked in localstorage and remove it
        const button = this.target.querySelector('.dropdown-toggle')
        sessionStorage.setItem('button', this.filter)
        button.style.display = 'none'

        // Replace the button by the listbox
        const dropdownMenu = document.createElement('div')
        dropdownMenu.classList.add('dropdown-list', 'rounded')
        dropdownMenu.setAttribute('aria-labelledby', `dropdown-${this.filter}`)
        dropdownMenu.innerHTML = 
            `
                <div class="row" data-name="${this.filter}">
                    <form action="#" class="dropdown-search">
                        <label for="search-${this.filter}" id="title-${this.filter}" class="form-label d-none">Rechercher un ${this.label()}</label>
                        <input type="search" id="search-${this.filter}" class="form-control py-4 border-0" placeholder="Rechercher un ${this.label()}">
                        <i class="fas fa-chevron-up close-dropdown"></i>
                    </form>
                    
                </div>
            `

        const dropdownMenuRow = dropdownMenu.querySelector('.row')
        this.arrayItems.forEach((element) => {
            const item = document.createElement('div')
            item.classList.add('item', 'col-4', 'py-1')
            item.setAttribute('data-value', element)
            item.innerHTML = element
            dropdownMenuRow.append(item)
        })
        
        this.target.append(dropdownMenu)
        this.target.style.width = 'auto'
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