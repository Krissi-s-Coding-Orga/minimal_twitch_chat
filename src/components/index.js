import Vue from 'vue'

import panels from './panels'
import connectingDialog from './ConnectingDialog'
import reconnectDialog from './ReconnectDialog'
import messageComponent from './MessageComponent'
import notificationHandler from './NotificationHandler'
import notification from './Notification'

Vue.component('message-component', messageComponent)

export default {
    panels,
    messageComponent,
    connectingDialog,
    reconnectDialog,
    notificationHandler,
    notification
}