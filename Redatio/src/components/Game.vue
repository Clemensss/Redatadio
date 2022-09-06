<script setup>
import { computed } from '@vue/runtime-core'
</script>
<template>
    <div class="tableView">
        <table>
            <tr>
                <th>Palavra</th>
                <th>Acertos</th>
            </tr>
            <tr v-for="(listObj,i) in list" :key="i"
            :class="{selected : list[i].selected, 
                    normal : !list[i].selected}"
            v-on:click = "select(i)">
                <template v-if="listObj">
                <td> {{listObj.word}} </td>
                <td> {{listObj.obj.n}} </td>
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
            list : [],
            lastIndex: 0
        }
    },
    methods:{
        select(i){
            this.list[this.lastIndex].selected = false;
            this.$emit('wordObj', [this.list[i].obj, this.list[i].word])
            console.log('emiting...')
            this.list[i].selected = true;
            this.lastIndex = i;
        },
    },
    watch:{   
        wordG(wordSendArr){
            console.log("game");
            if(wordSendArr !== [])
            this.list.push({word:wordSendArr[0], 
                        obj:wordSendArr[1], selected:false});
        }
    }
}
</script>
<style scoped>
    
    .tableView{
        height:inherit;
        overflow: scroll;
    }
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