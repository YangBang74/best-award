<script setup>
import { RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <header>
    <Menu />
  </header>
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style>
main {
  padding: 55.33px 0 0;
  flex: 1;
}
</style>
