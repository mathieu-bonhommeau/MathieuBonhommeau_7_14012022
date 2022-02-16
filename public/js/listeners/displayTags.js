import { Tag } from '../templates/Tag.js'
import { closeListbox } from '../listeners/displayListbox.js'

/**
 * Callback function for display tags above listbox section
 * @param {EventObject} event 
 */
export function displayTags (event) {
    // Get the value of keyword choosed
    const value = event.target.dataset.value
    // Get the name of the listbox
    const list = event.target.parentNode.parentElement.dataset.name
    let exist = false

    const tagsOnDOM = document.querySelectorAll('.tag')

    // Check if the tag is already displayed on the DOM
    tagsOnDOM.forEach((element) => {
        if (value === element.dataset.value && list === element.dataset.list) {
            exist = true
        }
    })

    // If no exists on the DOM, we build the tag
    if (exist === false) {
        const tag = new Tag (value, list)
        tag.build()

        const close = document.querySelectorAll('.close-tag')
        close.forEach((element) => {
            element.addEventListener('click', closeTag)
        })
    }
    closeListbox(list)
    
}

function closeTag (event) {
    event.target.parentElement.remove()
}