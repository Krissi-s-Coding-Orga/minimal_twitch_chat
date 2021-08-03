<style>
    #chat-container {
        position: absolute;
        bottom: 0;
        left: 0;
        height: max-content;
        width: 100%;
    }
</style>

<template>
    <div id="chat-container">
        <message-panel v-for="(data, id) in messages"
            :key="id"
            :message="data.message" 
            :userstate="data.userstate"></message-panel>
    </div>
</template>

<script>
import Vue from 'vue'

import MessagePanel from '../components/panels/MessagePanel.vue';

export default {
  components: { MessagePanel },
    data: function() {
        return {
            'messages': {}
        }
    },
    created() {
        this.$client.on("message", (channel, userstate, message, self) => {
            if (self) return;

            Vue.set(this.messages, userstate.id, {
                "message": message,
                "userstate": userstate
            })
        });
    },
    computed: {
    },
    watch:{
        messages: {
            deep: true
        }
    }
}
</script>