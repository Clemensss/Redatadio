<script setup>
import { computed } from '@vue/runtime-core'
</script>
<template>
        <table>
            <tr>
                <th>Palavra</th>
                <th>Acertos</th>
            </tr>
            <tr v-for="(w,i) in list" :key="i"
            :class="{selected : list[i].selected, 
                    normal : !list[i].selected}"
            v-on:click = "select(i)">
                <template v-if="w">
                <td> {{w.w}} </td>
                <td> {{w.hits}} </td>
                </template>
            </tr>
        </table>
</template>

<script>
export default {
    props :{
        wordG : Object
    },
    data(){
        return {
            list : [],
            lastIndex: 0
        }
    },
    methods:{
        select(i){
            this.list[this.lastIndex].selected = false;
            this.$emit('word', this.list[i].w)
            this.list[i].selected = true;
            this.lastIndex = i;
        },
    },
    watch:{   
        wordG(word){
            console.log("game");
            if(word)
            this.list.push({w:word.w, hits:word.hits, selected:false});
        }
    }
}
</script>
<style scoped>
    
    table {
        width: 100%;
    }
    th {
        font-weight: bold;
    }
    th, td {
        height:25px;
    }
    table, th, td {
        border: 2px solid;
    }
    tr {
        margin-left:5%;
    }
    .normal{
        background-color: inherit;
        color: inherit;
    }
    .selected{
        background-color:rgb(201, 177, 100);
        color: black;
    }
</style>