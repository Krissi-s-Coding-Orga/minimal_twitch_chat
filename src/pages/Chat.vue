<style>
</style>

<template>
  <div id="chat-container" :class="getContainerClasses()">
    <v-btn
      class="mx-2"
      id="settings_button"
      v-show="settingsTimeout > 0"
      fab
      dark
      :color="getThemeColor()"
      @click="openSettings()"
    >
      <v-icon dark>
        mdi-wrench
      </v-icon>
    </v-btn>
    <div id="chat-content" @scroll="handleScroll(this)" :class="getContentClasses()">
      <message-component
        v-for="(data, id) in messages"
        :key="id"
        :message="data.message"
        :userstate="data.userstate"
      ></message-component>
    </div>
    <v-btn id="reactive-button" v-if="userScrolled" @click="renableAutoScroll()" elevation="0" :style="{ backgroundColor: getThemeColor() }">
        Auto Scroll
    </v-btn>
  </div>
</template>

<script>
import Vue from "vue"

import chatUtil from "@/plugins/chatUtil"

import { config, bus } from "@/main"

import MessageComponent from "../components/MessageComponent.vue"

export default {
  components: { MessageComponent },
  data: function() {
    return {
      colordata: {},
      messages: {},
      userScrolled: false,
      scrollInterval: 0,
      settingsInterval: 0,
      settingsTimeout: 0,
      freshMessage: false,
      default_colors: [
        "#FF0000",
        "#0000FF",
        "#00FF00",
        "#B22222",
        "#FF7F50",
        "#9ACD32",
        "#FF4500",
        "#2E8B57",
        "#DAA520",
        "#D2691E",
        "#5F9EA0",
        "#1E90FF",
        "#FF69B4",
        "#8A2BE2",
        "#00FF7F",
      ],
    };
  },
  created() {
    this.$client.on("message", async (channel, userstate, message, self) => {
      if (self) return

      await chatUtil.retrieveBadges(userstate['room-id'])

      this.freshMessage = true

      if (Object.keys(this.messages).length > config.misc.max_messages) {
        Vue.delete(this.messages, Object.keys(this.messages)[0]);
      }

      if (userstate.color === null) {
        userstate.color = this.generateUserColor(userstate["user-id"]);
      }

      Vue.set(this.messages, userstate.id, {
        channel: channel,
        message: message,
        userstate: userstate,
        byuser: userstate["user-id"],
      })

      if(this.userScrolled) { return }
      
      setTimeout(() => {
        this.freshMessage = true
        let element = document.getElementById("chat-content")
        if(config.misc.invert_chat) {
          element.scrollTop = -element.scrollHeight
          return
        }
        element.scrollTop = element.scrollHeight
      },100)
    })

    this.$client.on(
      "messagedeleted",
      (channel, username, deletedMessage, userstate) => {
        const messageId = userstate["target-msg-id"];
        this.deleteMessage(messageId)
      }
    )

    this.$client.on("clearchat", () => {
      this.messages = {};
    })

    this.$client.on(
      "timeout",
      (channel, username, reason, duration, userstate) => {
        const userId = userstate["target-user-id"];
        this.handleBan(userId);
      }
    )

    this.$client.on("ban", (channel, username, reason, userstate) => {
      const userId = userstate["target-user-id"];
      this.handleBan(userId);
    })

    window.addEventListener('mousemove', () => {
      this.settingsTimeout = 4
    })

    this.settingsInterval = setInterval(() => {
      if(this.settingsTimeout > 0) {
        this.settingsTimeout--
      }
    }, 1000)
  },
  destroyed() {
      clearInterval(this.scrollInterval)
      clearInterval(this.settingsInterval)
  },
  methods: {
    openSettings: () => {
      bus.$emit('openSettings')
    },
    getContentClasses: () => {
      let classes = ''
      if(config.misc.invert_chat) {
        classes = `${classes} invert-chat-content`
      }
      return classes
    },
    getContainerClasses: () => {
      let classes = ''
      if(config.misc.invert_chat) {
        classes = `${classes} invert-chat-container`
      }
      return classes
    },
    getThemeColor: function() {
        return localStorage.themeColor
    },
    renableAutoScroll() {
        this.freshMessage = true
        let element = document.getElementById("chat-content")
        if(config.misc.invert_chat) {
          element.scrollTop = -element.scrollHeight
          this.userScrolled = false
          return
        }
        element.scrollTop = element.scrollHeight
        this.userScrolled = false
    },
    handleScroll () {
        let element = document.getElementById("chat-content")
        let currentMax = element.scrollHeight - element.scrollTop
        if(config.misc.invert_chat) {
          currentMax = element.scrollTop - element.scrollHeight
        }
        if(this.freshMessage) { 
          this.freshMessage = false
          return 
        }
        if(currentMax.toFixed() <= element.clientHeight + config.misc.trigger_offset) {
          this.userScrolled = true
        }
    },
    generateUserColor(userid) {
      if (typeof this.colordata[userid] !== "undefined") {
        return this.colordata[userid];
      }

      const index = Math.floor(Math.random() * this.default_colors.length);
      const color = this.default_colors[index];
      this.colordata[userid] = color;
      return color;
    },
    handleBan(userId) {
      for (let messageId in this.messages) {
        let messageData = this.messages[messageId];
        if (messageData.byuser === userId) {
          this.deleteMessage(messageId);
        }
      }
    },
    deleteMessage(messageId) {
      if (config.misc.hide_deleted_message) {
        Vue.delete(this.messages, messageId);
      } else {
        const oldMessage = this.messages[messageId];
        Vue.set(this.messages, messageId, {
          message: null,
          userstate: oldMessage.userstate,
          byuser: oldMessage.byuser,
        });
      }
    },
  },
  computed: {}
};
</script>
