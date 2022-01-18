/**
 * Class for api/json connection - Use a singleton 
 */
export class Datas {
    constructor (path) {
        if (Datas.exists) {
            return Datas.instance
        }

        this._path = path

        Datas.exists = true
        Datas.instance = this

        return this
    }

    async getFullDatas () {
       return fetch(this._path)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((value) => {
            return value
        })
        .catch((error) => {
            console.log(`Un problème est survenu: ${error}`)
        })
    }
}