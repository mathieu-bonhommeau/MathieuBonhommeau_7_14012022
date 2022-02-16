import { FilterItems } from '../filters/FilterItems.js'
import { DropdownList } from '../templates/DropdownList.js'
import { displayTags } from '../listeners/displayTags.js'
import { FilterIndex } from '../filters/FilterIndex.js'

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

    // Event listener for filter keywords in listbox
    const input = document.querySelector('.dropdown-input')
    input.addEventListener('keyup', (event) => {

        // Get value from dropdown input
        const needle = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")

        const keywords = Array.from(items)

        const keywordsSimplyfied = keywords.map(keyword => {
            keyword = keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            return keyword.replace(/\b.{0,2}\b/g, ',').replace(/[^a-z0-9,]{1}/g, '').split(/,{1,}/g)
        })

        // Build an index with with all avaible words in keywords
        let index = FilterIndex.buildKeywordsIndex(keywordsSimplyfied)
        index = Array.from(index).sort()

        // Transform array with keywords and ids to a array with  level with only ids
        const keywordsFiltered = FilterItems.filter(index, needle)
            .map(element => element.pop())
            .flat()
            .map(element => keywords[element])

        document.querySelector('.items-content').innerHTML = ''

        // Replace items by filtered items
        dropdownItems.arrayItems = new Set(keywordsFiltered)
        dropdownItems.buildItems()
    })

    // Event listener for add a tag above listboxs container when click on an listbox element
    const itemsDOM = document.querySelectorAll('.items-content')
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
    buttonDOM.parentElement.classList.replace('open', 'close')
    buttonDOM.setAttribute('aria-expanded', 'false')

}
