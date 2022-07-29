<template>
<div v-on:keyup.enter="onSubmit()">
    <input :value="userInput" @input="onInput">
</div>
</template>

<script>
export default {
    data() {
        return {
            userInput: '',
            submit : ''
            
        }
    },

    methods: {
        onInput(e) {
            this.userInput = e.target.value;
        },
        onSubmit(){
            this.$emit('submit', this.userInput.toLowerCase());
            this.userInput = '';
        }
    }
}
</script>

<style>

</style>