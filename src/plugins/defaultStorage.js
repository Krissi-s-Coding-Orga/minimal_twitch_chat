import { config } from '../main'

const map = require('./storageMap.json')

export default { loadDefaults }

function loadDefaults() {
    console.log('load defaults')
    for(const key in map) {
        if(localStorage.getItem(key) !== null) {
            return
        }
        const path = map[key]
        const splitPath = path.split('.')
        const section = config[splitPath[0]][splitPath[1]]

        console.log(path)
        console.log(section)

        localStorage.setItem(key, section)
    }
}