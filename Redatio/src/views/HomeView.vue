<script setup lang="ts">
import UserInput  from '../components/UserInput.vue'


</script>

<template>
  <main>
    <UserInput />
    <Page />
  </main>
</template>

<script lang="ts">
export default {
  components: {
    UserInput,
  }
}
</script>
