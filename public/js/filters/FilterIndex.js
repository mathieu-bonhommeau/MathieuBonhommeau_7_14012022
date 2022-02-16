/**
 * Class for create an index of all string search possibilities with avaible ids 
 */
 export class FilterIndex {

    static buildKeywordsIndex (keywords) {

        const map = new Map()

        keywords.forEach((keyword, i) => {
            // For each word in a keyword
            keyword.forEach(word => {
                if (word === "") {
                    return
                }

                if (map.get(word) === undefined) {
                    map.set(word, [i])
                
                } else {
                    map.get(word).push(i)
                }
            })
        })
        
        return map
    }
}