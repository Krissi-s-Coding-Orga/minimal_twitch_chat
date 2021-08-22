<template>
    <div id="settings-container">
        <v-row>
            <v-col class="col-12 col-md-6 col-lg-4">
                <connection-settings></connection-settings>
            </v-col>
            <v-col class="col-12 col-md-6 col-lg-4">
                <color-settings></color-settings>
            </v-col>
            <v-col class="col-12 col-md-6 col-lg-4">
                <v-btn :color="themeColor" width="100%" @click="closeSettings()">Close settings</v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import ColorSettings from '../components/panels/ColorSettings.vue'
import { bus } from "@/main"
import ConnectionSettings from '../components/panels/ConnectionSettings.vue';
export default {
  components: { ColorSettings, ConnectionSettings },
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
