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
        selectedIf(word){
            if(this.all.wordDict[word.toLowerCase()]){
                return this.all.wordDict[word.toLowerCase()].selected;
            }
            else return false;
        },
        showOrHide(word){
            if(word.type === 'char'){
                return 'show';
            }
            else if(this.hitOrNot(word.el) 
                || this.won){
                    return this.selectedIf(word.el) ? 
                        word.el.toLowerCase() + ' selected' :
                        word.el.toLowerCase() + ' show' ;
            }
            else{
                return word.el.toLowerCase() + ' hide';
            }
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
.selected{
    background-color: rgb(218, 198, 89);
}
.focused{
    background-color: rgb(115, 218, 89);
}

</style>