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
            <component v-for="(component, index) in components" :key="'component'+index" :is="component"/>
            {{message}}
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
        isDeleted() {
            return this.message === null
        },
        getFontSize() {
            return config.misc.font_size
        },
        getEmote(messageFragment) {
            for(let emoteId in this.userstate.emotes) {
                let emotePosition = this.userstate.emotes[emoteId][0].split('-')
                if(this.message.indexOf(messageFragment) === emotePosition[0]) {
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
                emote = Vue.component({
                    template: '<img src="https://static-cdn.jtvnw.net/emoticons/v2/' + emoteid + '/default/dark/4.0"/>'
                })
            } else {

            }
        }
    }
}
</script>