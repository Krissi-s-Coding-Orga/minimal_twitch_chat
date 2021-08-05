<style>
</style>

<template>
    <v-dialog v-model="showDialog" persistent :width="400">
        <v-card>
            <v-toolbar flat dense :color="getThemeColor()">
                <v-toolbar-title>
                    <span class="subheading">
                        <v-icon class="mdi mdi-connection" left></v-icon>Reconnect to Chat?
                    </span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-3">
                <v-container class="px-0 py-0">
                    <v-row>
                        <v-col class="pt-6">
                            Lost Connection to the Chat
                            <p>{{reason}}</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-right">
                            <v-btn 
                                :color="getThemeColor()"
                                outlined
                                class="middle"
                                @click="reconnect"> Reconnect</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { config } from "@/main"
export default {
    data: function() {
        return {
            showDialog: false,
            reason: ""
        }
    },
    methods: {
        reconnect() {
            this.showDialog = false
            this.$client.connect()
        },
        getThemeColor: function() {
            return config.colors.color
        }
    },
    created() {
        this.$client.on("disconnected", (reason) => {
            this.reason = reason
            this.showDialog = true
            console.log(`lost connection: ${this.reason}`)
        });
        this.$client.on("connected", () => {
            this.showDialog = false
        })
    }
}
</script>