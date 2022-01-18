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
        localStorage.setItem('button', button.outerHTML)
        button.remove()

        // Replace the button by the listbox
        const dropdownMenu = document.createElement('div')
        dropdownMenu.classList.add('dropdown-list')
        dropdownMenu.setAttribute('aria-labelledby', `dropdown-${this.filter}`)
        dropdownMenu.innerHTML = 
            `
                <div class="row" data-name="${this.filter}">
                    <p class="dropdown-title fw-bold mb-4">
                        <span class="opacity-50">Rechercher un ${this.filter}</span>
                        <i class="fas fa-chevron-up close-dropdown"></i>
                    </p>
                </div>
            `

        const dropdownMenuRow = dropdownMenu.querySelector('.row')
        this.arrayItems.forEach((element) => {
            const item = document.createElement('div')
            item.classList.add('item', 'col-4', 'py-1')
            item.innerHTML = element
            dropdownMenuRow.append(item)
        })
        
        this.target.append(dropdownMenu)
        this.target.style.width = 'auto'

        console.log(this.target)
    }
}