<template>
<div >
    <h1>{{title}}</h1>
    <div v-if="lines"> 
        <p v-for="(line,index) in lines" :key="index">
            <template v-if="line.type==='header'">
                <div class="header">
                    <span 
                        class="Word" 
                        :class="{hide: !wordDict[word].hit, show: wordDict[word].hit}"
                        v-for="(word, y) in line.l" :key="y"> 
                        {{word +' '}}
                    </span>
                </div>
            </template>

            <template v-else>
                <span 
                    class="Word" 
                    :class="{hide: !wordDict[word], show: wordDict[word]}"
                    v-for="(word, y) in line.l" :key="y"> {{word+' '}}</span>
            </template>
        </p>
    </div>
    <div v-else>
        Carregando...
    </div>
    <Game :word="{wordShow}"/>
</div>
</template>

<script>
import Game from './Game.vue'
export default {
    components:{
        Game
    },
    props:{
        word : String
    },
    data(){
        return {
            title: null,
            pageText : null,
            wordDict : {},
            wordShow : {},
            lines: [],
        }
    },
    created(){
        this.fetchPage();
    },
    mounted(){
    },
    watch : {
        word(word){
            this.playRound(word);
        }
    },
    methods: {
        async fetchPage(){  
            let page = null;
            let url = "https://pt.wikipedia.org/w/api.php?" + 
                    "format=json"+
                    "&action=query"+
                    "&generator=random"+
                    "&origin=*"+
                    "&grnnamespace=0"+
                    "&prop=extracts"+
                    "&explaintext=1"+
                    "&rvprop=content";
            let headers ={};

            try {
                let res = await fetch(url, {
                    method : "GET",
                    mode: 'cors',
                    headers: headers
                });
                page = await res.json();
            } catch(error) {
                console.log(error);
            }
            console.log(page);
            this.title = Object.values(page.query.pages)[0].title;
            this.parseWikiText(Object.values(page.query.pages)[0].extract);
        },
        changeWord(word){
            this.wordDict[word].hit = true;
        },
        playRound(word){
            if(this.wordDict[word]){
                this.changeWord(word);
                this.wordShow = { w:word, hits: this.wordDict[word].n};
            }
        },
        parseWikiText(text){
            const lines = text.split('\n');
            let words = [];
            for ( let i = 0; i < lines.length; i++){
                console.log(lines[i]);
                if(lines[i][0]==="="){
                    let h = lines[i].split(' ').filter((el)=>el!=="==")
                    if(h[0]!=="Referências"){
                        words.concat(h);
                        this.lines.push(
                            {l : h, 
                            type: 'header'});
                    }
                }
                else{
                    let t = lines[i].split(' ');
                    words.concat(t);
                    this.lines.push({l : t, type : 'text'});
                }
            }
            words.forEach((el)=>{
                if(this.wordDict[el]){
                    this.wordDict[el].n++;
                }
                else{
                    this.wordDict[el] = {hit:false, n:1}
                }                
            }
            );
            

        }
    }
}
</script>

<style>
:root{
    --hide : rgb(119, 119, 119);
}
.header{
    font-size: large;
}
.Word.hide {
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
</style>