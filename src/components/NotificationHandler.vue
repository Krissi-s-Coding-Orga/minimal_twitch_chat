<style>

</style>
<template>
    <div id="notifications">
        <notification 
            v-for="(value,index) in notifications" 
            :key="index" 
            :content="value.content"
            :userstate="value.userstate"
            :title="value.title"
            :id="`snackbar-${index}`"/>
    </div>
</template>
<script>
import Vue from "vue"

import { config } from "@/main"

import Notification from "./Notification.vue"

export default {
    components: { Notification },
    data: function() {
        return {
            notifications: {},
            showSnackbar: true
        }
    },
    methods: {
        getTimeout: () => {
            return config.notifications.timeout
        }
    },
    created() {
        
        this.$client.on("message", async (channel, userstate, message, self) => {
        if (self) return
            if(message.startsWith('!notify')) {
                Vue.set(this.notifications, 
                    `debug:${userstate.id}`,
                    {
                        content: message,
                        userstate: userstate,
                        title: `Debug from ${userstate['display-name']}`
                    })
                setTimeout(() => {
                    Vue.delete(this.notifications,
                        `debug:${userstate.id}`)
                }, config.notifications.timeout + 500)
            }
        })
        
        this.$client.on("subscription", (channel, username, method, message, userstate) => {
            console.log(userstate)
            console.log(method)

            Vue.set(this.notifications, 
                `sub:${userstate.id}`,
                {
                    content: message,
                    userstate: userstate,
                    title: `${userstate['display-name']} just subscribed`
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `sub:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })
        
        this.$client.on("resub", (channel, username, months, message, userstate, methods) => {
            console.log(userstate)
            console.log(methods)
            let cumulativeMonths = ~~userstate["msg-param-cumulative-months"]

            Vue.set(this.notifications, 
                `resub:${userstate.id}`,
                {
                    content: message,
                    userstate: userstate,
                    title: `${userstate['display-name']} subscribed for the ${cumulativeMonths} Month`
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `resub:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })

        this.$client.on("subgift", (channel, username, months, recipient, userstate, methods) => {
            console.log(userstate)
            console.log(methods)
            let senderCount = ~~userstate["msg-param-sender-count"]

            Vue.set(this.notifications, 
                `giftsub:${userstate.id}`,
                {
                    content: '',
                    userstate: userstate,
                    title: `${userstate['display-name']} gifted ${senderCount} Subs`
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `giftsub:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })

        this.$client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
            console.log(userstate)
            console.log(methods)
            let senderCount = ~~userstate["msg-param-sender-count"]

            Vue.set(this.notifications, 
                `mysterygiftsub:${userstate.id}`,
                {
                    content: '',
                    userstate: userstate,
                    title: `${userstate['display-name']} gifted ${senderCount} Mystery Subs`
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `mysterygiftsub:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })

        this.$client.on("cheer", (channel, userstate, message) => {
            if(userstate.bits < config.misc.min_bits) { return }

            Vue.set(this.notifications, 
                `cheer:${userstate.id}`,
                {
                    content: message,
                    userstate: userstate,
                    title: `${userstate.bits} Bits from ${userstate['display-name']}`
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `cheer:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })
    }
}
</script>