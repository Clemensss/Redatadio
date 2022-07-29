<template>
    <div v-if="all.wordDict !== {}"> 
        <h1> 
            <span 
                class="Title" 
                :class="{hide: !all.titleD[word.toLowerCase()].hit, 
                        show: all.titleD[word.toLowerCase()].hit}"
                v-for="(word, i) in all.title"
                :key="i"> 
            {{word + ' '}}
            </span>
        </h1>
        <p v-for="(line,index) in all.lines " :key="index">
            <template v-if="line.type==='header'">
                <div class="header">
                    <span 
                        class="Word" 
                        :class="{hide: !all.wordDict[word.toLowerCase()]['hit'], 
                                show: all.wordDict[word.toLowerCase()]['hit'] 
                                        || all.won}"
                        v-for="(word, y) in line.l" :key="y"> 
                        {{word +' '}}
                    </span>
                </div>
            </template>

            <template v-else>
                <span 
                    class="Word" 
                    :class="{hide: !all.wordDict[word.toLowerCase()].hit, 
                             show: all.wordDict[word.toLowerCase()].hit || won}"
                    v-for="(word, y) in line.l" :key="y"> {{word+' '}}</span>
            </template>
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
    }
}
</script>

<style>
:root{
    --hide : rgb(119, 119, 119);
    --bg : rgb(255, 255, 255);
    --fg : rgb(0, 0, 0);
}
.header{
    font-size: large;
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