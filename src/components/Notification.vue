<template>
    <div class="notification">
        <v-card
            elevation="2">
            <v-toolbar
                flat 
                dense>
                <v-toolbar-title>
                    <span class="title_marquee" :style="{ fontSize: headerFontSize }">
                        {{title}}
                    </span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-5 message" :style="{ fontSize: fontSize, marginBottom: fontSize }">
                <div :class="getNotificationClass()">
                    <template v-for="(data, index) in getComponents()">
                        <img v-if="data.type === 'image'" :style="{ height: emoteSize }" :src="data.data" :key="index"/>
                        <a class="message-url" v-else-if="data.type === 'url'" 
                            :key="index" 
                            :href="data.data" 
                            :style="{ color: themeColor }"
                            target="_href">
                                {{data.data}}</a>
                        <template v-else>
                            {{data.data}}
                        </template>
                    </template>
                </div>
            </v-card-text>
            <v-progress-linear :color="themeColor" v-model="determite"></v-progress-linear>
        </v-card>
    </div>
</template>
<script>
import chatUtil from "@/plugins/chatUtil"

import { bus } from "@/main"

export default {
    props: ['content', 'title', 'userstate'],
    data() {
        return {
            themeColor: localStorage.themeColor,
            fontSize: localStorage.notificationFontSize,
            badgeSize: localStorage.notificationBadgeSize,
            emoteSize: localStorage.notificationEmoteSize,
            headerFontSize: localStorage.notificationHeaderFontSize,
            timeout: localStorage.notificationTimeout,
            remaining: 0,
            determite: 100
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
        })
        this.remaining = this.timeout
        setInterval(() => {
            this.remaining = this.remaining - 100
            this.determite = (100 / this.timeout) * this.remaining
        }, 100)
    }
}

</script>
