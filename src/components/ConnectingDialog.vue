<style scoped>
</style>

<template>
    <v-dialog v-model="connectingBack" persistent :width="400">
        <v-card>
            <v-toolbar flat dense :color="getThemeColor()">
                <v-toolbar-title>
                    <span class="subheading">
                        <v-icon class="mdi mdi-connection" left></v-icon>Connecting to Chat...
                    </span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-5">
                <v-progress-linear :color="getThemeColor()" indeterminate></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { connecting, config } from "@/main"

export default {
    data: () => ({
        connectingBack: true
    }),
    methods: {
        getThemeColor: function() {
            return config.color
        }
    },
    created() {
        setInterval(()=> {
            this.connectingBack = connecting
        }, 1000)
    }
}
</script>