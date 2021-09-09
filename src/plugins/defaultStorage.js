import { config } from '../main'

const map = require('./storageMap.json')

export default { loadDefaults }

function loadDefaults() {
    for(const key in map) {
        if(typeof (localStorage.getItem(key)) !== 'undefined') {
            return
        }
        const path = map[key]
        const splitPath = path.split('.')
        const section = config[splitPath[0]][splitPath[1]]

        localStorage.setItem(key, section)
    }
}