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
                <v-container px-0 py-2>
                    <v-row>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeTimeout"
                                hide-details
                                suffix="sec"
                                type="number"
                                label="Notification timeout"
                                outlined></v-text-field>
                        </v-col>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeMinBits"
                                hide-details
                                type="number"
                                label="Minimum Bits"
                                outlined></v-text-field>
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
                                label="Header Font Size"
                                outlined
                                :style="{ fontSize: headerFontSize }"></v-text-field>
                        </v-col>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeFontSize"
                                hide-details
                                suffix="px"
                                type="number"
                                label="Font Size"
                                outlined 
                                :style="{ fontSize: fontSize }"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2 input_with_icon">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeEmoteSize"
                                hide-details
                                suffix="px"
                                type="number"
                                label="Emote Size"
                                outlined></v-text-field>
                            <img src="https://static-cdn.jtvnw.net/emoticons/v2/425618/default/dark/2.0" :style="{ height: emoteSize }" class="settings_icon_example">
                        </v-col>
                        <v-col class="py-2 input_with_icon">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeBadgeSize"
                                hide-details
                                suffix="px"
                                type="number"
                                label="Badge Size"
                                outlined></v-text-field>
                            <img src="https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/2" :style="{ height: badgeSize }" class="settings_icon_example">
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
        themeColor: localStorage.themeColor,
        emoteSize: localStorage.notificationEmoteSize,
        badgeSize: localStorage.notificationBadgeSize,
        fontSize: localStorage.notificationFontSize,
        headerFontSize: localStorage.notificationHeaderFontSize,
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
                this.headerFontSize = fontSize + 'px'
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
                this.fontSize = fontSize + 'px'
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
                this.badgeSize = badgeSize + 'px'
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
                this.emoteSize = emoteSize + 'px'
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