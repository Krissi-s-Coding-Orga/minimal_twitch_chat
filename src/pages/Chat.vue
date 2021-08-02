<style>
    #chat-container {
        position: absolute;
        bottom: 0;
        left: 0;
        height: max-content;
        width: 100%;
    }
</style>

<template>
    <div id="chat-container">
    </div>
</template>

<script>
export default {
    created() {
        this.$client.on("message", (channel, userstate, message, self) => {
            if (self) return;
            console.log(message)
            console.log(userstate)
        });
    }
}
</script>