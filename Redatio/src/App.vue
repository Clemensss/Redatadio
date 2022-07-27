<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import  HomeView from './views/HomeView.vue'
</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <HomeView />
</template>

<style scoped>
</style>
