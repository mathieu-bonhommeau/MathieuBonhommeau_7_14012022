
/************************** Initialisation for test */
const nb = 100000
const index = []
for (let i = 0; i < nb; i++) {
	index.push(Math.floor(Math.random() * nb))
}

const needle = Math.floor(Math.random() * nb)

let min = 0
let max = index.length -1
let cursor = ''
let notNeedle = true
let recipesId = ''



/************************** Solution Dichotomous search */
while (notNeedle) {
    cursor = Math.floor((max-min)/2 + min)
  
    // If the search is found, we stop the loop 
    if (this.needle === index[cursor]) {
      recipesId = index[cursor]
      notNeedle = false
    }
  
    // If the search is not found, we continue
    if (needle < index[cursor]) {
      max = cursor
    } else if (needle > index[cursor]) {
      min = cursor
    }
  
    // if max - min = 1, this means that the search doesn't exist in index because there cannot be an element between min and max 
    if (max - min === 1) {
      notNeedle = false
    }
  }


/************************** Solution naive */
recipesId = index.find(element => {
	return element === needle
})