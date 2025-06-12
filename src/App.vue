<script setup>
import { RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="wrapper">
    <header>
      <Menu />
    </header>
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

main {
  padding: 55.33px 0 0;
  flex: 1;
}
</style>
