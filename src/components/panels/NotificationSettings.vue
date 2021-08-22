<template>
    <div>
        <v-card>
            <v-toolbar flat dense>
                <v-toolbar-title>
                <span class="subheading"
                    ><v-icon left>mdi-bell</v-icon
                    >Notification Settings</span
                >
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container px-0 py-0>
                    <v-row>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeTimeout"
                                hide-details
                                suffix="sec"
                                type="number"
                                label="Notification timeout"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeHeaderFontSize"
                                hide-details
                                suffix="px"
                                type="number"
                                label="Header Font Size"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeFontSize"
                                hide-details
                                suffix="px"
                                type="number"
                                label="Font Size"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeEmoteSize"
                                hide-details
                                suffix="px"
                                type="number"
                                label="Emote Size"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeMinBits"
                                hide-details
                                type="number"
                                label="Minimum Bits"></v-text-field>
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
    data: () => ({
        themeColor: localStorage.themeColor
    }),
    methods: {
        updateSettings: () => {
            bus.$emit('updateSettings')
        },
        parseNumberWithPx: (toParse) => {
            return Number(toParse.replace('px', ''))
        }
    },
    computed: {
        changeTimeout: {
            get() {
                return localStorage.notificationTimeout / 1000
            },
            set(timeout) {
                localStorage.notificationTimeout = timeout * 1000
                this.updateSettings()
                return localStorage.notificationTimeout / 1000
            }
        },
        changeMinBits: {
            get() {
                return localStorage.notificationMinBits
            },
            set(minBits) {
                localStorage.notificationMinBits = minBits
                this.updateSettings()
                return localStorage.notificationMinBits
            }
        },
        changeHeaderFontSize: {
            get() {
                return this.parseNumberWithPx(localStorage.notificationHeaderFontSize)
            },
            set(fontSize) {
                localStorage.notificationHeaderFontSize = fontSize + 'px'
                this.updateSettings()
                return this.parseNumberWithPx(localStorage.notificationHeaderFontSize)
            }
        },
        changeFontSize: {
            get() {
                return this.parseNumberWithPx(localStorage.notificationFontSize)
            },
            set(fontSize) {
                localStorage.notificationFontSize = fontSize + 'px'
                this.updateSettings()
                return this.parseNumberWithPx(localStorage.notificationFontSize)
            }
        },
        changeBadgeSize: {
            get() {
                return this.parseNumberWithPx(localStorage.notificationBadgeSize)
            },
            set(badgeSize) {
                localStorage.notificationBadgeSize = badgeSize + 'px'
                this.updateSettings()
                return this.parseNumberWithPx(localStorage.notificationBadgeSize)
            }
        },
        changeEmoteSize: {
            get() {
                return this.parseNumberWithPx(localStorage.notificationEmoteSize)
            },
            set(emoteSize) {
                localStorage.notificationEmoteSize = emoteSize + 'px'
                this.updateSettings()
                return this.parseNumberWithPx(localStorage.notificationEmoteSize)
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