import { FilterItems } from '../datas/FilterItems.js'
import { DropdownList } from '../templates/DropdownList.js'

/**
 * Callback function for display list of datas in dropdowns
 * @param {array} datas 
 * @param {HTMLObject} listbox 
 */
export function displayItems (datas, listbox) {
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
    closeDropdown.addEventListener('click', close)
}

/**
 * Callback function for close listbox-dropdown
 * @param {Object} event 
 */
function close (event) {
    event.stopPropagation()
    
    // Remove the list
    const listbox = document.querySelector('.dropdown-list .row').dataset.name
    document.querySelector('.dropdown-list').remove()
    
    // Retrieve HTML in localstorage for recreate the dropdown button
    const button = localStorage.getItem('button')
    // Clear localstorage
    localStorage.clear()

    // Add the button in the DOM
    const buttonDOM = document.querySelector(`.dropdown-filters[data-name="${listbox}"]`)
    buttonDOM.innerHTML = button
    buttonDOM.style.width = '170px'

}

