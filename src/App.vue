<style>
@import "./assets/styles/fonts.css";
@import "./assets/styles/layout.css";
@import "./assets/styles/message.css";

</style>

<template>
    <v-app>
        <vue-headful title="Minimal Twitch Chat"/>
        <chat></chat>
        <reconnect-dialog></reconnect-dialog>
        <connecting-dialog></connecting-dialog>
        <notification-handler></notification-handler>
    </v-app>
</template>

<script>

import Chat from "./pages/Chat.vue"
import NotificationHandler from "./components/NotificationHandler.vue"
import { config } from "./main"
import ConnectingDialog from './components/ConnectingDialog.vue'
import ReconnectDialog from './components/ReconnectDialog.vue'

export default {
    components: {
        Chat,
        ConnectingDialog,
        ReconnectDialog,
        NotificationHandler
    },
    created() {
        this.$vuetify.theme.dark = config.colors.dark_mode
    }
}

</script>
