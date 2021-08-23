<template>
    <div>
        <v-card
            elevation="2">
            <v-toolbar
                flat 
                dense>
                <v-toolbar-title>
                    <v-icon left>mdi-forum</v-icon>
                    <span> Chat Example </span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-5" :style="{ fontSize:fontSize }" :class="containerClass">
                <div :class="contentClass">
                    <div :class="defaultMessageClasses">
                        <img 
                            class="badge"
                            :style="{ height: badgeSize, width: badgeSize }"
                            src="https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2"/>
                        <img 
                            class="badge"
                            :style="{ height: badgeSize, width: badgeSize }"
                            src="https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/2"/>
                        <span class="username" style="color: #eb34a8">
                            Moddy
                        </span> 
                        This Chat is great!
                    </div>
                    <div :class="defaultMessageClasses">
                        <span class="username" style="color: #3a34eb">
                            Nerd
                        </span> 
                        Yeah its awesome and powered by
                        <a class="message-url" 
                        href="https://github.com/eliteSchwein/minimal_twitch_chat"
                        target="_href"
                        :style="{ color: themeColor }">
                            https://github.com/eliteSchwein/minimal_twitch_chat
                        </a>
                    </div>
                    <div :class="defaultMessageClasses">
                        <span class="username" style="color: #37eb34">
                            Proton
                        </span> 
                        Please write more :)
                    </div>
                    <div :class="defaultMessageClasses + ' message-action'">
                        <span class="username" style="color: #eb34a8">
                            Devlon
                        </span> 
                        I am Important /me
                    </div>
                    <div :class="defaultMessageClasses + ' message-highlighted'" :style="{ background: themeColor }">
                        <span class="username" style="color: #ebd234">
                            User
                        </span> 
                        no you aren`t 
                        <img :style="{ height: emoteSize }" src="https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/2.0">
                    </div>
                    <div :class="defaultMessageClasses">
                        <img 
                            class="badge"
                            :style="{ height: badgeSize, width: badgeSize }"
                            src="https://static-cdn.jtvnw.net/badges/v1/1d4b03b9-51ea-42c9-8f29-698e3c85be3d/2"/>
                        <span class="username" style="color: #820000">
                            Spammer
                        </span> 
                        <span class="deleted" v-show="hideDeletedMessages === 'false'">
                            Message got deleted
                        </span>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import { bus } from "@/main"

export default {
    data() {
        return {
            themeColor: localStorage.themeColor,
            fontSize: localStorage.fontSize,
            badgeSize: localStorage.badgeSize,
            emoteSize: localStorage.emoteSize,
            invertChat: localStorage.invertChat,
            switchingBackground: localStorage.switchBackground === 'true',
            hideDeletedMessages: localStorage.hideDeletedMessages,
            defaultMessageClasses: 'message',
            containerClass: 'dummy-chat-container',
            contentClass: ''
        }
    },
    methods: {
        updateClasses: function() {
            if(this.switchingBackground) {
                this.defaultMessageClasses = 'message message-switching'
            } else {
                this.defaultMessageClasses = 'message'
            }
            if(this.invertChat) {
                this.containerClass = 'dummy-chat-container invert-chat-container'
                this.contentClass = 'invert-chat-content'
            } else {
                this.containerClass = 'dummy-chat-container'
                this.contentClass = ''
            }
        }
    },
    created() {
        bus.$on('updateSettings', () => {
            this.themeColor = localStorage.themeColor
            this.fontSize = localStorage.fontSize
            this.badgeSize = localStorage.badgeSize
            this.emoteSize = localStorage.emoteSize
            this.invertChat = localStorage.invertChat === 'true'
            this.switchingBackground = localStorage.switchBackground === 'true'
            this.hideDeletedMessages = localStorage.hideDeletedMessages
            this.updateClasses()
        })
        this.updateClasses()
    }
}
</script>