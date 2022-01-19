export class Tag {
    constructor (tag, list) {
        this.tag = tag
        this.list = list
    }

    build () {
        const tagDOM = document.createElement('div')
        tagDOM.classList.add('tag', 'w-auto', 'py-2', 'px-3', 'rounded')
        tagDOM.setAttribute('data-value', this.tag)
        tagDOM.setAttribute('data-list', this.list)
        tagDOM.innerHTML = 
            `
                ${this.tag}
                <i class="far fa-times-circle close-tag"></i>
            `
        
        const tagsDOM = document.querySelector('.tags-location')
        tagsDOM.append(tagDOM)
    }
}