<template>
<div >
    <DisplayPage :all="all" :won="won"></DisplayPage>
    <UserInput @submit="playRound"/>
    <Game :wordG="wordShow"></Game>
</div>
</template>

<script>
import Game from './Game.vue'
import DisplayPage from './DisplayPage.vue'
import UserInput from './UserInput.vue'
import {latinise} from '../../latinize'

export default {
    components:{
        Game,
        UserInput,
        DisplayPage
    },
    data(){
        return {
            title : '',
            titleD: {},
            wordDict: {},
            lines : [],
            wordShow : {},
        }
    },
    created(){

        this.fetchPage().then((page) =>{
            let t= Object.values(page.query.pages)[0].title;
            let obj = this.parseWikiText(Object.values(page.query.pages)[0].extract);
            this.title = t.split(' ');
            this.title.forEach((word) => {
                this.titleD[word.toLowerCase()]= {original: word, hit:false}
            });

            console.log(this.title);
            this.wordDict = obj.wordDict;
            this.lines = obj.lines;
        }
        )
    },
    computed:{
        won(){
            for(const word of Object.values(this.titleD)){
                if(!word.hit){
                    return false;
                }
            }
            return true;
        },
        all(){
            return {
            title : this.title,
            titleD: this.titleD,
            wordDict: this.wordDict,
            lines : this.lines,
            }
        }
    },

    methods: {
        async fetchPage(){
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

            const page = await fetch(url, {
                    method : "GET",
                    mode: 'cors',
                    headers: headers
                }).then(res=> res.json());

            console.log(page);
            return page;
        },
        parseWikiText(text){
            let linesArr= [];
            let wordDict={};
            let words = [];

            const lines = text.split('\n');

            console.log(lines);
            lines.forEach(el => {
                console.log(el);
                if(el[0]==="="){
                    let h = el.split(' ').filter((e)=>e!=="==")
                    if(h[0]!=="Referências"){
                        words = words.concat(h);
                        linesArr.push(
                            {l : h, 
                            type: 'header'});
                    }
                }
                else if(!/^[a-zA-Z]+$/.test(el) && el){
                    let t = el.split(' ');
                    words = words.concat(t);
                    linesArr.push({l : t, type : 'text'});
                }
            });

            console.log(words);
            wordDict = this.createWordDict(words);

            return {wordDict : wordDict, lines: linesArr}
        },
        createWordDict(words){
            let wordDict = {};
            words.forEach((word)=>{
                word = word.toLowerCase();
                if(wordDict[word]){
                    wordDict[word].n++;
                }
                else{
                    wordDict[word] = {
                        original: word, 
                        similar:[],
                        hit:false, 
                        n:1}
                }                
            }
            );
            words.forEach((word)=>{
                word = word.toLowerCase();
                let transformed = latinise(word).toLowerCase();
                if(word !== transformed && wordDict[transformed]){
                    wordDict[transformed].similar.push(word);
                }
            });
            return wordDict;
        },
        latinise(word){
            return latinise(word);
        },
        changeWordObj(obj, word){
            let transformed = latinise(word).toLowerCase();
            word = word.toLowerCase();
            if(obj[word]){
                obj[word].hit = true;
                if(transformed === word){
                    if(obj[word].similar !== undefined){
                        if(obj[word].similar !== []){
                            obj[word].similar
                                .forEach((w) =>{
                                    obj[w].hit = true;
                                });
                        }
                    }
                }
            }
            return {obj:obj, word:obj[word]};
        },
        hitWord(word){
            let wd = this.changeWordObj(this.wordDict, word),
                td = this.changeWordObj(this.titleD, word);
            this.wordDict = wd.obj;
            this.titleD   = td.obj;
            this.wordShow = wd.word? {w:word, hits:wd.word.n} 
                            : {w: word, hits:0};
        },
        playRound(word){
            console.log(word);

            if(word){
                this.hitWord(word);
            }
        },
    }
}
</script>

<style>
</style>