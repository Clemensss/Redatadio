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
            let cleanInput = this.userInput.toLowerCase().trim();
            if(cleanInput.split(' ').length === 1){
                this.$emit('submit', cleanInput);
                this.userInput = '';
            }
            else{

            }
        }
    }
}
</script>

<style>

</style>