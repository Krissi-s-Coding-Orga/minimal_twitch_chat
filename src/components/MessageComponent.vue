<style>
</style>

<template>
    <div :class="getMessageClass()" :style="{ fontSize:getFontSize(),backgroundColor:getBackgroundColor() }">
        <img v-for="(badgeData, index) in badges"
            class="badge"
            :style="{ height:getBadgeSize(), width:getBadgeSize() }"
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
        </template>
    </div>
</template>

<script>
import chatUtil from "@/plugins/chatUtil"

import { config } from "@/main"

export default {
    props: ['message', 'userstate'],
    data: function() {
        return {
            badges: []
        }
    },
    methods: {
        getBackgroundColor: function() {
            if(typeof(this.userstate['msg-id']) === 'undefined') {
                return
            }
            if(this.userstate['msg-id'] === 'highlighted-message') {
                return this.getThemeColor()
            }
        },
        getMessageClass: function() {
            let classes = "message"
            if(config.colors.change_background) {
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
        getThemeColor: function() {
            return config.colors.color
        },
        isDeleted() {
            return this.message === null
        },
        getFontSize() {
            return config.misc.font_size
        },
        getEmoteSize() {
            return config.misc.emote_size
        },
        getBadgeSize() {
            return config.misc.badge_size
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
    }
}
</script>