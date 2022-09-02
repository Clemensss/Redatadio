<template>
    <div v-if="all.wordDict !== {}"> 
        <p v-for="(line,index) in all.lines " :key="index">
                <div :class=line.type>
                    <span 
                        class="Word" 
                        :class="showOrHide(word)"
                        v-for="(word, y) in line.line" :key="y"> 
                            <template v-if="word.type==='word'">
                                {{' ' + word.el}}
                            </template>
                            <template v-else>
                                {{word.el +' '}}
                            </template>
                    </span>
                </div>

        </p>
    </div>
    <div v-else>
        Carregando...
    </div>

</template>

<script>
export default {
    props : {
        all : Object,
        won : Boolean
    },
    methods :{
        hitOrNot(word){
            if(this.all.wordDict[word.toLowerCase()]){
                return this.all.wordDict[word.toLowerCase()].hit;
            }
            else return false;
        },
        showOrHide(word){
            console.log(this.won);
            if(this.hitOrNot(word.el) 
                || word.type === 'char'
                || this.won){
                    return 'show';
            }
            else{
                return 'hide';
            }
        },
        selection(word){
            this.selectUnselect(this.lastSelection);
            this.selectUnselect(word);
            this.lastSelection = word;
            this.selectionArr = document.getElementsByClassName(word);
            this.selectionIndex = 0;
        },
        selectUnselect(word){
            this.wordDict[word].selected = !this.wordDict[word].selected;
            this.wordDict[word].similar.forEach((s) =>{
                this.wordDict[s].selected = !this.wordDict[s].selected;
            });
        },
        nextSelection(){
            this.selectionIndex.last = this.selectionIndex.curr;
            this.selectionIndex.curr++;
            if(this.selectionIndex.curr === this.selectionArr.length){
                this.selectionIndex=0;
            }
        },
        stopSelect(){
            this.selectionIndex = -1;
            this.selectionArr = [];
        },

    }
}
</script>

<style>
:root{
    --hide : rgb(119, 119, 119);
    --bg : rgb(255, 255, 255);
    --fg : rgb(0, 0, 0);
}
.title{
    font-size: 30px;
    margin-bottom: 4px;
}
.header{
    font-size: 22px;
    border: 2px;
    margin-bottom: 0;
    border-color: rgb(134, 126, 126);
    border-bottom-style:solid; 
}
.header2{
    font-size: 20px;
    font-weight: bold;
}
.hide {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
    margin-right: 1%;
    color: var(--hide);
    background-color: var(--hide);
}
.show{

    color: var(--fg);
    background-color: var(--bg);
}

</style>