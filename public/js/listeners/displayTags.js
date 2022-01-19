import { Tag } from '../templates/Tag.js'

/**
 * Callback function for display tags above listbox section
 * @param {EventObject} event 
 */
export function displayTags (event) {
    const value = event.target.dataset.value
    const list = event.target.parentElement.dataset.name
    let exist = false

    const tagsOnDOM = document.querySelectorAll('.tag')
    tagsOnDOM.forEach((element) => {
        if (value === element.dataset.value && list === element.dataset.list) {
            exist = true
        }
    })

    if (exist === false) {
        const tag = new Tag (value, list)
        tag.build()

        const close = document.querySelectorAll('.close-tag')
        close.forEach((element) => {
            element.addEventListener('click', closeTag)
        })
    }
}

function closeTag (event) {
    event.target.parentElement.remove()
}