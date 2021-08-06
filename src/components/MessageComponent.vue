<style>
</style>

<template>
    <div class="message">
        <div v-if="isDeleted()" class="message_font" :style="{ fontSize:getFontSize() }">
            <span class="username" :style="{ color: userstate.color }">
                {{userstate['display-name']}}: 
            </span>
            <span class="deleted">
                Message got deleted
            </span>
        </div>
        <div v-else class="message-font" :style="{ fontSize:getFontSize() }">
            <span class="username" :style="{ color: userstate.color }">
                {{userstate['display-name']}}: 
            </span>
            
            <template v-for="(data, index) in components">
                <img v-if="data.type === 'image'" :style="{ height:getEmoteSize(), width:getEmoteSize() }" :src="data.data" :key="index"/>
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
    </div>
</template>



<script>
import { config } from "@/main"

export default {
    props: ['channel', 'message', 'userstate'],
    data: function() {
        return {
            components: []
        }
    },
    methods: {
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
        console.log(this.userstate.badges)
        console.log(this.userstate.room_id)
        const messageFragments = this.message.split(' ')
        for(let index in messageFragments) {
            let messageFragment = messageFragments[index]
            let emote = this.getEmote(messageFragment)
            if(typeof(emote) !== 'undefined') {
                this.components.push({
                    type: 'image',
                    data: 'https://static-cdn.jtvnw.net/emoticons/v2/' + emote + '/default/dark/4.0'
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