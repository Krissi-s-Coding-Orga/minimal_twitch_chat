import Vue from 'vue'

import connectingDialog from './ConnectingDialog'
import reconnectDialog from './ReconnectDialog'
import messageComponent from './MessageComponent'

Vue.component('message-component', messageComponent)

export default {
    messageComponent,
    connectingDialog,
    reconnectDialog
}