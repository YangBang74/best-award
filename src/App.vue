<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
</script>

<template>
  <div class="wrapper">
    <header>
      <Menu />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
main {
  padding: 55.33px 0 0;
}
</style>
