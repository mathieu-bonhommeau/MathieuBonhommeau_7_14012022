/**
 * Class for create an alert message when any recipe is found
 */
 export class Message {
    constructor (message) {
        this.message = message
    }

    build () {
        console.log(this.message)
        const messageLocation = document.querySelector('.messages-location')

        const messageDOM = document.createElement('div')
        messageDOM.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
        messageDOM.setAttribute('role', 'alert')
        messageDOM.innerHTML = 
            `
                ${this.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `

        messageLocation.append(messageDOM)
    }
}