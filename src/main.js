import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import './components'
import store from './store'
import vueHeadful from 'vue-headful'
import tmi from 'tmi.js'

export const bus = new Vue()
export let config
export let connecting = true

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use({
    install() {
        Vue.prototype.destroy = Vue.prototype.$destroy;
    },
});

Vue.http.headers.common['Content-Type'] = 'application/json';
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*';
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin';
Vue.http.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, PUT, OPTIONS, DELETE, OPTIONS';

Vue.component('vue-headful', vueHeadful);


fetch('/config.json')
.then(res => res.json())
.then(file => {
    
    config = file
    
    const twitchClient = new tmi.Client({
        channels: [file.channel],
        connection: {
            reconnect: true,
            maxReconnectAttempts: 3,
            timeout: 500
        }
    })
    
    Vue.prototype.$client = twitchClient

    new Vue({
        vuetify,
        store,
        render: h => h(App)
    }).$mount('#app')

    twitchClient.on("connected", (address, port) => {
        console.log(`Connected: ${address}:${port}`)
        connecting = false
    })

    twitchClient.on("connecting", () => {
        connecting = true
    })

    twitchClient.connect()
})
.catch((error) => {
    let p = document.createElement("p");
    let content = document.createTextNode("config.json not found or cannot be decoded!");
    p.appendChild(content);
    document.getElementById('app').append(p);
    window.console.error('Error:', error);
});