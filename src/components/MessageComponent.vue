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
            <template v-for="(data, index) in components">
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
import { config } from "@/main"

export default {
    props: ['channelbadges', 'globalbadges', 'message', 'userstate'],
    data: function() {
        return {
            badges: [],
            components: []
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
            if(typeof(this.channelbadges.badge_sets[badgeType]) !== 'undefined') {
                let badgets = this.channelbadges.badge_sets[badgeType].versions
                if(typeof(badgets) === 'undefined') {
                    badgets = this.channelbadges.badge_sets[badgeType]
                }
                if(typeof(badgets[badgeData]) !== 'undefined') { 
                    return badgets[badgeData].image_url_2x
                }
            }
            if(typeof(this.globalbadges.badge_sets[badgeType]) !== 'undefined') {
                let badgets = this.globalbadges.badge_sets[badgeType].versions
                return badgets[badgeData].image_url_2x
            }
        },
        getEmote(messageFragment) {
            for(let emoteId in this.userstate.emotes) {
                let emotePosition = this.userstate.emotes[emoteId][0].split('-')
                if(this.message.indexOf(messageFragment) === Number(emotePosition[0])) {
                    return emoteId
                }
            }
            return
        }
    },
    created() {
        this.badges = this.userstate.badges
        const messageFragments = this.message.split(' ')
        for(let index in messageFragments) {
            let messageFragment = messageFragments[index]
            let emote = this.getEmote(messageFragment)
            if(typeof(emote) !== 'undefined') {
                this.components.push({
                    type: 'image',
                    data: 'https://static-cdn.jtvnw.net/emoticons/v2/' + emote + '/default/dark/2.0'
                })
            } else if(messageFragment.startsWith('http://') || messageFragment.startsWith('https://')){
                this.components.push({
                    type: 'url',
                    data: messageFragment.trim()
                })
            } else {
                this.components.push({
                    type: 'text',
                    data: messageFragment
                })
            }
        }
    }
}
</script>