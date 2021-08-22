<style>
</style>

<template>
    <div :class="getMessageClass()" :style="{ fontSize: fontSize, backgroundColor: getBackgroundColor() }">
        <img v-for="(badgeData, index) in badges"
            class="badge"
            :style="{ height: badgeSize, width: badgeSize }"
            :key="index"
            :src="getBadgeImage(index, badgeData)"/>
        <span class="username" :style="{ color: userstate.color }">
            {{userstate['display-name']}}: 
        </span>
        <template v-if="isDeleted()">
            <span class="deleted">
                Message got deleted
            </span>
        </template>
        <template v-else>
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
        </template>
    </div>
</template>

<script>
import chatUtil from "@/plugins/chatUtil"

import { bus } from "@/main"

export default {
    props: ['message', 'userstate'],
    data: function() {
        return {
            themeColor: localStorage.themeColor,
            fontSize: localStorage.fontSize,
            badgeSize: localStorage.badgeSize,
            emoteSize: localStorage.emoteSize,
            badges: []
        }
    },
    methods: {
        getBackgroundColor: function() {
            if(typeof(this.userstate['msg-id']) === 'undefined') {
                return
            }
            if(this.userstate['msg-id'] === 'highlighted-message') {
                return this.themeColor
            }
        },
        getMessageClass: function() {
            let classes = "message"
            if(localStorage.switchBackground === 'true') {
                classes = classes + " message-switching"
            }
            if(this.userstate['message-type'] === 'action') {
                classes = classes + " message-action"
            }
            if(typeof(this.userstate['msg-id']) === 'undefined') {
                return classes 
            }
            if(this.userstate['msg-id'] === 'highlighted-message') {
                classes = classes + " message-highlighted"
            }
            return classes 
        },
        isDeleted() {
            return this.message === null
        },
        getBadgeImage(badgeType, badgeData) {
            return chatUtil.getBadgeUrl(badgeType, badgeData) 
        },
        getComponents() {
            return chatUtil.parseComponents(this.message, this.userstate)
        }
    },
    created() {
        this.badges = this.userstate.badges
        bus.$on('updateSettings', () => {
            this.themeColor = localStorage.themeColor
            this.fontSize = localStorage.fontSize
            this.badgeSize = localStorage.badgeSize
            this.emoteSize = localStorage.emoteSize
            this.$forceUpdate()
        })
    }
}
</script>