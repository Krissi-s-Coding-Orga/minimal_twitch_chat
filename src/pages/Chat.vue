<style>
</style>

<template>
  <div id="chat-container">
    <div id="chat-content" @scroll="handleScroll(this)">
      <message-panel
        v-for="(data, id) in messages"
        :key="id"
        :message="data.message"
        :userstate="data.userstate"
      ></message-panel>
    </div>
    <v-btn id="reactive-button" v-if="userScrolled" @click="reenableAutoScroll()">
        Auto Scroll
    </v-btn>
  </div>
</template>

<script>
import Vue from "vue";

import { config } from "@/main";

import MessagePanel from "../components/panels/MessagePanel.vue";

export default {
  components: { MessagePanel },
  data: function() {
    return {
      colordata: {},
      messages: {},
      userScrolled: false,
      scrollInterval: 0,
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
    this.$client.on("message", (channel, userstate, message, self) => {
      if (self) return;

      this.freshMessage = true

      if (Object.keys(this.messages).length > 60) {
        Vue.delete(this.messages, Object.keys(this.messages)[0]);
      }

      if (userstate.color === null) {
        userstate.color = this.generateUserColor(userstate["user-id"]);
      }

      Vue.set(this.messages, userstate.id, {
        message: message,
        userstate: userstate,
        byuser: userstate["user-id"],
      })
      if(!this.userScrolled) {
        setTimeout(() => {
                let element = document.getElementById("chat-content");
                element.scrollTop = element.scrollHeight
        },100)
      }
    });
    this.$client.on(
      "messagedeleted",
      (channel, username, deletedMessage, userstate) => {
        const messageId = userstate["target-msg-id"];
        this.deleteMessage(messageId);
      }
    );
    this.$client.on("clearchat", () => {
      this.messages = {};
    });
    this.$client.on(
      "timeout",
      (channel, username, reason, duration, userstate) => {
        const userId = userstate["target-user-id"];
        this.handleBan(userId);
      }
    );
    this.$client.on("ban", (channel, username, reason, userstate) => {
      const userId = userstate["target-user-id"];
      this.handleBan(userId);
    });
  },
  destroyed() {
      clearInterval(this.scrollInterval)
  },
  methods: {
    reenableAutoScroll() {
        this.freshMessage = true
        this.userScrolled = false
        let element = document.getElementById("chat-content");
        element.scrollTop = element.scrollHeight
    },
    handleScroll () {
        let element = document.getElementById("chat-content")
        let currentMax = element.scrollHeight - element.scrollTop
        if(currentMax.toFixed() <= element.clientHeight + 50) {
            if(this.freshMessage) {
                this.freshMessage = false
                return
            }
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
