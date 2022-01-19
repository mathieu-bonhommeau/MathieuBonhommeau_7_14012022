import { FilterItems } from '../datas/FilterItems.js'
import { DropdownList } from '../templates/DropdownList.js'
import { displayTags } from '../listeners/displayTags.js'

/**
 * Function for display list of datas in dropdowns
 * @param {array} datas 
 * @param {HTMLObject} listbox 
 */
export function displayListbox (datas, listbox) {
    let items = []

    // Filter datas in term of name of dropdown choosed
    if (listbox.dataset.name === 'ingredients') {
        items = FilterItems.getIngredients(datas)
    }
    if (listbox.dataset.name === 'appliances') {
        items = FilterItems.getAppliances(datas)
    }
    if (listbox.dataset.name === 'ustensils') {
        items = FilterItems.getUstensils(datas)
    }

    // Build listbox with datas
    const dropdownItems = new DropdownList(items, listbox)
    dropdownItems.build()

    // Event listener for close listbox when click on the arrow up
    const closeDropdown = document.querySelector('.close-dropdown')
    closeDropdown.addEventListener('click', (event) => {
        event.stopPropagation()
        const listbox = document.querySelector('.dropdown-list .row').dataset.name
        closeListbox(listbox)
    })

    // Event listener for add a tag above listboxs container when click on an listbox element
    const itemsDOM = document.querySelectorAll('.item')
    itemsDOM.forEach((element) => {
        element.addEventListener('click', displayTags)
    })
    
}

/**
 * Function for close listbox-dropdown
 * @param {Object} event 
 */
export function closeListbox (listbox) {
    // Remove the list
    document.querySelector('.dropdown-list').remove()
    
    // Clear localstorage
    sessionStorage.clear()

    // Add the button in the DOM
    const buttonDOM = document.querySelector(`.dropdown-filters[data-name="${listbox}"] button`)
    buttonDOM.style.display = 'inline-block'
    buttonDOM.parentElement.style.width = '170px'

}

