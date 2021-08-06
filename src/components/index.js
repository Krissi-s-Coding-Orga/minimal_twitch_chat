import connectingDialog from './ConnectingDialog'
import reconnectDialog from './ReconnectDialog'
import messageComponent from './MessageComponent'

Vue.component('message-component', MessageComponent)

export default {
    messageComponent,
    connectingDialog,
    reconnectDialog
}