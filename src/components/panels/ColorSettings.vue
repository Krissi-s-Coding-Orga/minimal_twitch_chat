<template>
    <div>
        <v-card>
            <v-toolbar flat dense>
                <v-toolbar-title>
                <span class="subheading"
                    ><v-icon left>mdi-palette</v-icon
                    >Color Settings</span
                >
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container px-0 py-0>
                    <v-row>
                        <v-col class="py-2">
                            <v-switch v-model="toggleDarkMode" label="Dark Mode" hide-details class="mt-0" :color="themeColor"></v-switch>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-2">
                            <span>Theme Color:</span>
                            <v-color-picker
                                dot-size="25"
                                hide-inputs
                                hide-mode-switch
                                v-model="switchThemeColor"
                            ></v-color-picker>
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
            themeColor:localStorage.themeColor
        }),
        methods: {
            updateSettings: () => {
                bus.$emit('updateSettings')
            },
        },
        computed: {
            toggleDarkMode: {
                get() {
                    return localStorage.darkMode === 'true';
                },
                set(enable) {
                    if(enable)
                        localStorage.setItem('darkMode', true)
                    else
                        localStorage.setItem('darkMode', false)
                    this.updateSettings()
                    return localStorage.darkMode === 'true'
                }
            },
            switchThemeColor: {
                get() {
                    return localStorage.themeColor;
                },
                set(color) {
                    localStorage.themeColor = color
                    this.themeColor = color
                    this.updateSettings()
                    return localStorage.themeColor
                }
            }
        }
    }
</script>