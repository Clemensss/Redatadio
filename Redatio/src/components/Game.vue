<script setup>
import { computed } from '@vue/runtime-core'
</script>
<template>
    <div class="Score">
        <table>
            <tr>
                <th>Palavra</th>
                <th>Acertos</th>
            </tr>
            <tr v-for="(w,i) in list" :key="i">
                <template v-if="w">
                <td> {{w.w}} </td>
                <td> {{w.hits}} </td>
                </template>
            </tr>
        </table>
    </div> 
</template>

<script>
export default {
    props :{
        wordG : Object
    },
    data(){
        return {
            list : []
        }
    },
    watch:{   
        wordG(word){
            console.log("game");
            if(word)
            this.list.push({w:word.w, hits:word.hits});
        }
    }
}
</script>
<style scoped>
    .Score{
        top: 0;
        position: sticky;
        border: 5px;
        border-style:dashed; 
        height: 100%;
        max-height: 300px;
        overflow: scroll;
    }
    table {
        width: 100%;
    }
    th {
        font-weight: bold;
    }
    table, th, td {
        border: 2px solid;
    }
    tr {
        margin:
    }
</style>