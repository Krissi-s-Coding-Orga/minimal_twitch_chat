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
import { bus } from "./main"
import defaultStorage from "./plugins/defaultStorage"
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
        defaultStorage.loadDefaults()
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
