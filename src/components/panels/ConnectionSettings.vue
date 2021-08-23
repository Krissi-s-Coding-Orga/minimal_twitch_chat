<template>
    <div>
        <v-card>
            <v-toolbar flat dense>
                <v-toolbar-title>
                <span class="subheading"
                    ><v-icon left>mdi-twitch</v-icon
                    >Connection Settings</span
                >
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container px-0 py-2>
                    <v-row>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="switchChannel"
                                hide-details
                                label="Twitch Channel"
                                outlined></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2">
                            <v-btn :color="themeColor" width="100%" @click="reconnectClient()">Reconnect Chat</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
    import { bus } from "@/main"
    
    export default {
        components: {
        },
        data: () => ({
            themeColor: localStorage.themeColor
        }),
        methods: {
            reconnectClient: () => {
                bus.$emit('reconnectClient')
            },
        },
        computed: {
            switchChannel: {
                get() {
                    return localStorage.channel;
                },
                set(channel) {
                    localStorage.channel = channel
                    return localStorage.channel
                }
            }
        },
        created() {
            bus.$on('updateSettings', () => {
                this.themeColor = localStorage.themeColor
            })
        }
    }
</script>