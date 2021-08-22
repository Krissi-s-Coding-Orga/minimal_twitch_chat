<style>
@import "./assets/styles/fonts.css";
@import "./assets/styles/layout.css";
@import "./assets/styles/message.css";
@import "./assets/styles/settings.css";

</style>

<template>
    <v-app>
        <vue-headful title="Minimal Twitch Chat"/>
        <settings v-show="showSettings"></settings>
        <chat></chat>
        <reconnect-dialog></reconnect-dialog>
        <connecting-dialog></connecting-dialog>
        <notification-handler></notification-handler>
    </v-app>
</template>

<script>

import Chat from "./pages/Chat.vue"
import NotificationHandler from "./components/NotificationHandler.vue"
import { config, bus } from "./main"
import ConnectingDialog from './components/ConnectingDialog.vue'
import ReconnectDialog from './components/ReconnectDialog.vue'
import Settings from './pages/Settings.vue'

export default {
    components: {
        Chat,
        ConnectingDialog,
        ReconnectDialog,
        NotificationHandler,
        Settings
    },
    data: function() {
        return {
            showSettings: false
        };
    },
    created() {
        if(typeof(localStorage.channel) === 'undefined') {
            localStorage.channel = config.channel

            localStorage.darkMode = config.colors.dark_mode
            localStorage.themeColor = config.colors.color
            localStorage.switchBackground = config.colors.change_background

            localStorage.notificationTimeout = config.notifications.timeout
            localStorage.notificationFontSize = config.notifications.font_size
            localStorage.notificationBadgeSize = config.notifications.badge_size
            localStorage.notificationEmoteSize = config.notifications.emote_size
            localStorage.notificationHeaderFontSize = config.notifications.header_font_size
            localStorage.notificationMinBits = config.notifications.min_bits

            localStorage.hideDeletedMessages = config.misc.hide_deleted_message
            localStorage.invertChat = config.misc.invert_chat
            localStorage.fontSize = config.misc.font_size
            localStorage.emoteSize = config.misc.emote_size
            localStorage.badgeSize = config.misc.badge_size
            localStorage.maxMessages = config.misc.max_messages
            localStorage.triggerOffset = config.triggerOffset
        }
        this.$vuetify.theme.dark = localStorage.darkMode == 'true'
        setInterval(() => {
            this.$vuetify.theme.dark = localStorage.darkMode == 'true'
        },500)
        bus.$on('openSettings', () => {
            this.showSettings = true
        })
        bus.$on('closeSettings', () => {
            this.showSettings = false
        })
    }
}

</script>
