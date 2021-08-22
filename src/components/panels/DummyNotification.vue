<template>
    <div class="notification">
        <v-card
            elevation="2">
            <v-toolbar
                flat 
                dense>
                <v-toolbar-title>
                    <span class="title_marquee" :style="{ fontSize:headerFontSize }">
                        This is a Example Notification with a super long title
                    </span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-5 message" :style="{ fontSize:fontSize, marginBottom:fontSize }">
                This is just another example Example Text 
                <img :style="{ height:emoteSize }" src="https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/2.0"/>
                <a class="message-url" 
                    href="https://github.com/eliteSchwein/minimal_twitch_chat" 
                    :style="{ color:themeColor }"
                    target="_href">
                        https://github.com/eliteSchwein/minimal_twitch_chat</a>
            </v-card-text>
            <v-progress-linear :color="themeColor" v-model="determite"></v-progress-linear>
        </v-card>
    </div>
</template>
<script>
import chatUtil from "@/plugins/chatUtil"

import { bus } from "@/main"

export default {
    data() {
        return {
            themeColor: localStorage.themeColor,
            fontSize: localStorage.notificationFontSize,
            badgeSize: localStorage.notificationBadgeSize,
            emoteSize: localStorage.notificationEmoteSize,
            headerFontSize: localStorage.notificationHeaderFontSize,
            timeout: localStorage.notificationTimeout,
            remaining: 0,
            determite: 50
        }
    },
    methods: {
        getNotificationClass: function() {
            let classes = "message"
            return classes 
        },
        getBadgeImage(badgeType, badgeData) {
            return chatUtil.getBadgeUrl(badgeType, badgeData) 
        },
        getComponents() {
            return chatUtil.parseComponents(this.content, this.userstate)
        }
    },
    created() {
        bus.$on('updateSettings', () => {
            this.themeColor = localStorage.themeColor
            this.fontSize = localStorage.notificationFontSize
            this.badgeSize = localStorage.notificationBadgeSize
            this.emoteSize = localStorage.notificationEmoteSize
            this.headerFontSize = localStorage.notificationHeaderFontSize
            this.timeout = localStorage.notificationTimeout
            this.remaining = this.timeout
            this.$forceUpdate()
        })
        this.remaining = this.timeout
        setInterval(() => {
            this.remaining = this.remaining - 100
            this.determite = (100 / this.timeout) * this.remaining
            if(this.remaining == 0) {
                this.remaining = this.timeout
            }
        }, 100)
    }
}

</script>
