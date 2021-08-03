<style>
@import "./assets/styles/fonts.css";

</style>

<template>
    <v-app>
        <vue-headful title="Minimal Twitch Chat"/>
        <chat></chat>
        <reconnect-dialog></reconnect-dialog>
        <connecting-dialog></connecting-dialog>
    </v-app>
</template>

<script>

import Chat from "./pages/Chat.vue"
import { config } from "./main"
import ConnectingDialog from './components/ConnectingDialog.vue'
import ReconnectDialog from './components/ReconnectDialog.vue'

export default {
    components: {
        Chat,
        ConnectingDialog,
        ReconnectDialog
    },
    created() {
        this.$vuetify.theme.dark = config.colors.dark_mode
    }
}

</script>
