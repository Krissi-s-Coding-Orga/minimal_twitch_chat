import Vue from 'vue'

import ColorSettings from './ColorSettings.vue'
import ChatSettings from './ChatSettings.vue'
import ConnectionSettings from './ConnectionSettings.vue'
import DummyNotification from './DummyNotification.vue'
import NotificationSettings from './NotificationSettings.vue'

Vue.component('color-settings', ColorSettings)
Vue.component('chat-settings', ChatSettings)
Vue.component('connection-settings', ConnectionSettings)
Vue.component('dummy-notification', DummyNotification)
Vue.component('notification-settings', NotificationSettings)

export default {

}