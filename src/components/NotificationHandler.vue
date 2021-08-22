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
import subs from "@/assets/meta_data/subs.json"

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
        this.$client.on("subscription", (channel, username, method, message, userstate) => {
            let title = `${userstate['display-name']} just subscribed`

            console.log('subscription')
            console.log(userstate)
            console.log(method)

            if(method.prime) {
                title = subs.fresh.prime
            } else {
                title = subs.fresh[method.plan]
            }

            title = title.replace(
                    /(\${username})/g,
                    userstate['display-name']
                )

            Vue.set(this.notifications, 
                `sub:${userstate.id}`,
                {
                    content: message,
                    userstate: userstate,
                    title: title
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `sub:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })
        
        this.$client.on("resub", (channel, username, months, message, userstate, method) => {
            let title = `${userstate['display-name']} just resubed`
            let cumulativeMonths = ~~userstate["msg-param-cumulative-months"]

            console.log('resub')
            console.log(userstate)
            console.log(method)
            console.log(months)

            if(method.prime) {
                title = subs.resub.prime
            } else {
                title = subs.resub[method.plan]
            }

            title = title.replace(
                    /(\${username})/g,
                    userstate['display-name']
                )
                .replace(
                    /(\${month})/g,
                    cumulativeMonths
                )

            Vue.set(this.notifications, 
                `resub:${userstate.id}`,
                {
                    content: message,
                    userstate: userstate,
                    title: title
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `resub:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })

        this.$client.on("subgift", (channel, username, months, recipient, methods, userstate) => {
            let senderCount = ~~userstate['msg-param-sender-count']
            let title = subs.gifted[methods.plan]
            let message = subs.gifted.message

            console.log('subgift')
            console.log(userstate)
            console.log(recipient)
            console.log(months)

            title = title.replace(
                    /(\${username})/g,
                    userstate['display-name']
                )
                .replace(
                    /(\${gifted})/g,
                    recipient
                )

            message = message.replace(
                    /(\${count})/g,
                    senderCount
                )

            Vue.set(this.notifications, 
                `giftsub:${userstate.id}`,
                {
                    content: message,
                    userstate: userstate,
                    title: title
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `giftsub:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })

        this.$client.on("giftpaidupgrade", (channel, username, sender, userstate) => {
            let senderCount = ~~userstate["msg-param-sender-count"]
            let giftedCount = ~~userstate["msg-param-recipient-count"]
            let title = subs.giftedContinue[userstate['msg-param-sub-plan']]
            let message = subs.giftedContinue.message

            console.log('giftpaidupgrade')
            console.log(userstate)

            title = title.replace(
                    /(\${username})/g,
                    sender
                )
                .replace(
                    /(\${gifted})/g,
                    username
                )

            message = message.replace(
                    /(\${count})/g,
                    senderCount
                )
                .replace(
                    /(\${month})/g,
                    giftedCount
                )

            Vue.set(this.notifications, 
                `giftsub:${userstate.id}`,
                {
                    content: message,
                    userstate: userstate,
                    title: title
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `giftsub:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })

        this.$client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
            let senderCount = ~~userstate["msg-param-sender-count"]
            let title = subs.gifted[userstate['msg-param-sub-plan']]
            let message = subs.gifted.message

            title = title.replace(
                    /(\${username})/g,
                    userstate['display-name']
                )
                .replace(
                    /(\${count})/g,
                    numbOfSubs
                )

            message = message.replace(
                    /(\${count})/g,
                    senderCount
                )

            Vue.set(this.notifications, 
                `mysterygiftsub:${userstate.id}`,
                {
                    content: message,
                    userstate: userstate,
                    title: title
                })
            setTimeout(() => {
                Vue.delete(this.notifications,
                    `mysterygiftsub:${userstate.id}`)
            }, config.notifications.timeout + 500)
        })

        this.$client.on("cheer", (channel, userstate, message) => {
            if(userstate.bits < config.notifications.min_bits) { return }

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