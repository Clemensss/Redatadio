<script setup>
import Page from './Page.vue'
</script>

<template>
<div>
    <input :value="userInput" @input="onInput">
    <Page :word="{userInput}"/>
</div>
</template>

<script>
export default {
    components:{
        Page
    },
    data() {
        return {
            userInput: ''
            
        }
    },
    methods: {
        onInput(e) {
            this.userInput = e.target.value
        }
    }
}
</script>

<style>

</style>