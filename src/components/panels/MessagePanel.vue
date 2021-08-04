<style>
.deleted {
    font-style: italic;
    color: grey;
}
.message {
    padding-left: 10px;
    padding-right: 10px;
}
</style>

<template>
    <div class="message">
        <h2 v-if="isDeleted()" class="message_font" :style="{ fontSize:getFontSize() }">
            <span class="username" :style="{ color: userstate.color }">
                {{userstate['display-name']}}:
            </span>
            <span class="deleted">
                Message got deleted
            </span>
        </h2>
        <h2 v-else class="message_font" :style="{ fontSize:getFontSize() }">
            <span class="username" :style="{ color: userstate.color }">
                {{userstate['display-name']}}:
            </span>
            
            <template v-for="(data, index) in components">
                <img v-if="data.type === 'image'" :src="data.data" :style="{ height:getEmoteSize() }" :key="index"/>
                <a v-else-if="data.type === 'url'" 
                    :key="index" 
                    :href="data.data" 
                    :style="{ color:getThemeColor() }"
                    target="_href">
                        {{data.data}}</a>
                <template v-else>
                    {{data.data}}
                </template>
            </template>
        </h2>
    </div>
</template>



<script>
import { config } from "@/main"

export default {
    props: ['message', 'userstate'],
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
                    data: messageFragment
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