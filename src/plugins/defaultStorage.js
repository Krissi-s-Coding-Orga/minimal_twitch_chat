import { config } from '../main'

const map = require('./storageMap.json')

export default { loadDefaults }

function loadDefaults() {
    console.log('load defaults')
    for(const key in map) {
        if(localStorage.getItem(key) === null) {
            const path = map[key]
            const splitPath = path.split('.')
            const section = config[splitPath[0]][splitPath[1]]

            localStorage.setItem(key, section)
        }
    }
}