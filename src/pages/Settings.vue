<template>
    <div id="settings-container">
        <v-row>
            <v-col class="col-12 col-md-6 col-lg-4">
                <connection-settings></connection-settings>
                <color-settings class="mt-6"></color-settings>
            </v-col>
            <v-col class="col-12 col-md-6 col-lg-4">
              <notification-settings></notification-settings>
              <dummy-notification class="mt-6"></dummy-notification>
            </v-col>
            <v-col class="col-12 col-md-6 col-lg-4">
                <chat-settings></chat-settings>
                <dummy-chat class="mt-6"></dummy-chat>
                <v-btn :color="themeColor" width="100%" @click="closeSettings()" class="mt-6">Close settings</v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import { bus } from "@/main"

import ColorSettings from '../components/panels/ColorSettings.vue'
import ConnectionSettings from '../components/panels/ConnectionSettings.vue'
import NotificationSettings from '../components/panels/NotificationSettings.vue'
import DummyNotification from '../components/panels/DummyNotification.vue'
import ChatSettings from '../components/panels/ChatSettings.vue'
import DummyChat from "../components/panels/DummyChat.vue"

export default {
  components: { 
    ColorSettings,
    ConnectionSettings,
    NotificationSettings,
    DummyChat,
    DummyNotification,
    ChatSettings 
  },
  data: () => ({
    themeColor:localStorage.themeColor
  }),
  methods: {
    closeSettings: () => {
      bus.$emit('closeSettings')
    },
  },
  computed: {
  },
  created() {
    bus.$on('updateSettings', () => {
      this.themeColor = localStorage.themeColor
    })
  }
};
</script>
