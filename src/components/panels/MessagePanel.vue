<style>

</style>

<template>
    <div>
        <span class="username" :style="{ color: userstate.color }">{{userstate.display-name}}:</span> {{message}}
    </div>
</template>

<script>
export default {
    props: ['message', 'userstate']
}
</script>