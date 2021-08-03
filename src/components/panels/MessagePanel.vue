<style>

</style>

<template>
    <div>
        <span class="username" :style="{ color: userstate.color }">{{userstate['display-name']}}:</span> 
        <h2 v-if="delected">Message got deleted</h2>
        <h2 v-else>{{message}}</h2>
    </div>
</template>

<script>
export default {
    props: ['message', 'userstate'],
    methods: {
        isDeleted() {
            return this.message === null
        }
    }
}
</script>