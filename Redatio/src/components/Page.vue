<template>
<div class="Board">
    <DisplayPage class="Page" :all="all" :won="won"></DisplayPage>
    <div class="Score">
        <UserInput @submit="playRound"/>
        <Game class="Game" @word="selection" :wordG="wordShow"></Game>
    </div>
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
            title :  '',
            wordDict: {},
            lines : [],
            wordsArr : [],
            wordShow : {},
            winCounter : {hits: 0, win: 0}
        }
    },
    created(){

        this.fetchPage().then((page) =>{
            this.title =  Object.values(page.query.pages)[0].title;
            this.winCounter.win = this.title.split(' ').length;

            console.log( this.winCounter);

            let text = Object.values(page.query.pages)[0].extract;
            this.parseWikiText('?? ' + this.title + '\n' + text);
        }
        )
    },
    watch:{
    },
    computed:{
        
        won(){
            if(this.winCounter.hits >=  this.winCounter.win){
                return true;
            }
            return false;
        },

        all(){
            return {
            title : this.title,
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
        checkWordChar(word){
            let temp = '';
            let arr  = [];

            word.split('').forEach((c) => {
                if(isLetter(c) || /^\d+$/.test(c)){
                    temp = temp + c;
                }
                else{
                    console.log('caracter');
                    console.log(c);

                    if(temp !== ''){ 
                        arr.push({'el' : temp, 
                                'type': 'word',
                                'title' : false});
                        temp = '';
                    }
                    arr.push({'el': c, 'type': 'char'});
                }
            });

            if(temp !== '')
                arr.push({'el' : temp, 
                        'type': 'word',
                        'title' : false});
            return arr;
        },
        //goes trhough whole text, and separetes beetween words, char
        // and format elements
        parseWikiText(text){
            let linesArr= [];
            let wordsArr = [];

            //get lines
            const lines = text.split('\n');

            console.log(lines);

            lines.forEach(line => {
                console.log(line);

                let wordSplit = line.split(' ');
                let elArr = [];
                let type = '';
                let search = '';

                wordSplit.forEach((el)=>{
                    el === '==' || el === '===' || el === '??' ? 
                    search = el : false;
                });
                console.log("search");
                console.log(search);
                switch(search){
                    case '==':
                        type = 'header';
                        break;
                    case '===':
                        type = 'header2';
                        break;
                    case '??':
                        type = 'title';
                        break;
                    default:
                        type = 'text';
                }
                if(search)
                    wordSplit = wordSplit.filter((e)=>e!== search);

                wordSplit.filter((e) => e !== '')
                        .forEach((word) => {
                            console.log(word);
                                elArr = elArr.concat(this.checkWordChar(word));
                                elArr.forEach((w) =>{
                                    if(type === 'title') w.title = true;
                                });
                });

                wordsArr = wordsArr.concat(elArr);
                linesArr.push({'line' : elArr, 'type' : type});
            });

            console.log(wordsArr);

            this.lines = linesArr;
            this.wordsArr = wordsArr;
        },
        //iterates through text arr withg elements, and puts only words in it
        createWordDict(){
            let wordDict = {};
            //first pass to orginize words
            this.wordsArr.forEach((obj)=>{
                let element = obj.el.toLowerCase();
                if(wordDict[element]){
                    wordDict[element].n++;
                }
                else if(obj.type === 'word' || obj.type === 'number'){
                    wordDict[element] = {
                        original: element, 
                        similar:[],
                        hit:false, 
                        title: obj.title,
                        n:1,
                        selected: false}
                }                
            }
            );
            //second pass to get similar words
            this.wordsArr.forEach((obj)=>{
                let transformed = latinise(obj.el).toLowerCase();
                let word = obj.el.toLowerCase();
                if(word !== transformed && wordDict[transformed]){
                    wordDict[transformed].similar.push(word);
                    wordDict[transformed].n++;
                    wordDict[word].n++;
                }
                else  if(word !== transformed && !wordDict[transformed])
                {
                    wordDict[transformed] = {
                        original: word, 
                        similar:[],
                        hit:false, 
                        n:2,
                        title:false,
                        selected: false}
                    wordDict[transformed].similar.push(word);
                    if(wordDict[word]) wordDict[word].n++;
                }
            });
            this.wordDict = wordDict;
        },
        latinise(word){
            return latinise(word);
        },
        
        changeWordObj(obj, word){
            let transformed = latinise(word).toLowerCase();
            word = word.toLowerCase();
            if(obj[word]){
                obj[word].hit = true;
                if(obj[word].title) this.winCounter.hits++;
                if(transformed === word){
                    if(obj[word].similar !== undefined){
                        if(obj[word].similar !== []){
                            obj[word].similar
                                .forEach((w) =>{
                                    if(obj[w].title) this.winCounter.hits++;
                                    obj[w].hit = true;
                                });
                        }
                    }
                }
            }
            return {wordDict:obj, word:obj[word]};
        },
        hitWord(word){
            let obj = this.changeWordObj(this.wordDict, word);
            this.wordDict = obj.wordDict;
            this.wordShow = obj.word? {w:word, hits:wd.word.n} 
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

function isLetter(c){
    return c.toLowerCase() !== c.toUpperCase();
}
</script>

<style>
.Game{
    overflow: scroll;
    height: 100px;
}
.Page{
    z-index: -1;
}
.Board{
    height:auto;
}
.Score{
    position: -webkit-sticky;
    position: sticky;
    top:0;
    width: 90%;
    height:auto;
    border: 4px;
    border-style:dashed;
    background: white; 
}
</style>