<template>
    <div>
        <v-card>
            <v-toolbar flat dense>
                <v-toolbar-title>
                <span class="subheading"
                    ><v-icon left>mdi-message-text</v-icon
                    >Chat Settings</span
                >
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container px-0 py-2>
                    <v-row>
                        <v-col class="py-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeMaxMessages"
                                hide-details
                                type="number"
                                label="Max Messages"
                                outlined></v-text-field>
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
                    <v-row>
                        <v-col class="py-2">
                            <v-switch v-model="toggleInvertChat" label="Invert Chat" hide-details class="mt-0" :color="themeColor"></v-switch>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2">
                            <v-switch v-model="toggleHideDeleted" label="Hide deleted Messages" hide-details class="mt-0" :color="themeColor"></v-switch>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2">
                            <v-switch v-model="toggleSwitchingBackground" label="Switch Message Background" hide-details class="mt-0" :color="themeColor"></v-switch>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2 mt-2">
                            <v-text-field
                                :color="themeColor"
                                v-model="changeTriggerOffset"
                                hide-details
                                type="number"
                                suffix="px"
                                label="Scroll Trigger Offset (DEV)"
                                outlined></v-text-field>
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
        emoteSize: localStorage.emoteSize,
        badgeSize: localStorage.badgeSize,
        fontSize: localStorage.fontSize,
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
        toggleInvertChat: {
            get() {
                return localStorage.invertChat === 'true';
            },
            set(enable) {
                localStorage.setItem('invertChat', enable)
                this.updateSettings()
                return localStorage.invertChat === 'true'
            }
        },
        toggleHideDeleted: {
            get() {
                return localStorage.hideDeletedMessages === 'true';
            },
            set(enable) {
                localStorage.setItem('hideDeletedMessages', enable)
                this.updateSettings()
                return localStorage.hideDeletedMessages === 'true'
            }
        },
        toggleSwitchingBackground: {
            get() {
                return localStorage.switchBackground === 'true';
            },
            set(enable) {
                localStorage.setItem('switchBackground', enable)
                this.updateSettings()
                return localStorage.switchBackground === 'true'
            }
        },
        changeMaxMessages: {
            get() {
                return localStorage.maxMessages
            },
            set(messages) {
                localStorage.maxMessages = messages
                this.updateSettings()
                return localStorage.maxMessages
            }
        },
        changeTriggerOffset: {
            get() {
                return Number(localStorage.triggerOffset)
            },
            set(offset) {
                localStorage.triggerOffset = offset
                this.updateSettings()
                return Number(localStorage.triggerOffset)
            }
        },
        changeFontSize: {
            get() {
                return this.parseNumberWithPx(localStorage.fontSize)
            },
            set(fontSize) {
                localStorage.fontSize = fontSize + 'px'
                this.fontSize = fontSize + 'px'
                this.updateSettings()
                return this.parseNumberWithPx(localStorage.fontSize)
            }
        },
        changeBadgeSize: {
            get() {
                return this.parseNumberWithPx(localStorage.badgeSize)
            },
            set(badgeSize) {
                localStorage.badgeSize = badgeSize + 'px'
                this.badgeSize = badgeSize + 'px'
                this.updateSettings()
                return this.parseNumberWithPx(localStorage.badgeSize)
            }
        },
        changeEmoteSize: {
            get() {
                return this.parseNumberWithPx(localStorage.emoteSize)
            },
            set(emoteSize) {
                localStorage.emoteSize = emoteSize + 'px'
                this.emoteSize = emoteSize + 'px'
                this.updateSettings()
                return this.parseNumberWithPx(localStorage.emoteSize)
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