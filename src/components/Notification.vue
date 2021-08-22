<template>
    <div class="notification">
        <v-card
            elevation="2">
            <v-toolbar
                flat 
                dense>
                <v-toolbar-title>
                    <span class="title_marquee" :style="{ fontSize:getHeaderFontSize() }">
                        {{title}}
                    </span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-5 message" :style="{ fontSize:getFontSize(), marginBottom:getFontSize() }">
                <div :class="getNotificationClass()">
                    <template v-for="(data, index) in getComponents()">
                        <img v-if="data.type === 'image'" :style="{ height:getEmoteSize() }" :src="data.data" :key="index"/>
                        <a class="message-url" v-else-if="data.type === 'url'" 
                            :key="index" 
                            :href="data.data" 
                            :style="{ color:getThemeColor() }"
                            target="_href">
                                {{data.data}}</a>
                        <template v-else>
                            {{data.data}}
                        </template>
                    </template>
                </div>
            </v-card-text>
            <v-progress-linear :color="getThemeColor()" v-model="determite"></v-progress-linear>
        </v-card>
    </div>
</template>
<script>
import chatUtil from "@/plugins/chatUtil"

import { config } from "@/main"

export default {
    props: ['content', 'title', 'userstate'],
    data() {
        return {
            remaining: 0,
            determite: 100
        }
    },
    methods: {
        getNotificationClass: function() {
            let classes = "message"
            return classes 
        },
        getThemeColor: () => {
            return localStorage.themeColor
        },
        getTimeout: () => {
            return config.notifications.timeout
        },
        getFontSize() {
            return config.notifications.font_size
        },
        getHeaderFontSize() {
            return config.notifications.header_font_size
        },
        getEmoteSize() {
            return config.notifications.emote_size
        },
        getBadgeSize() {
            return config.notifications.badge_size
        },
        getBadgeImage(badgeType, badgeData) {
            return chatUtil.getBadgeUrl(badgeType, badgeData) 
        },
        getComponents() {
            return chatUtil.parseComponents(this.content, this.userstate)
        }
    },
    created() {
        this.remaining = this.getTimeout()
        setInterval(() => {
            this.remaining = this.remaining - 100
            this.determite = (100 / this.getTimeout()) * this.remaining
        }, 100)
    }
}

</script>
