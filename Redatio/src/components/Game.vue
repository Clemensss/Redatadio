<script setup>
import { computed } from '@vue/runtime-core'
</script>
<template>
    
</template>

<script>
export default {
    props :{
        word : Object
    },
    data(){
        return {
            list : []
        }
    },
    computed:{   
        t(){
            this.list.push(this.word.key);
        }
    }
}
</script>