<script setup>
import { ref } from 'vue'

const singles = ref([
  {
    id: 1,
    author: 'Pharaoh',
    src: '/public/singls/pharaoh-benzobak.jfif',
    name: '10-13',
    genre: 'hip-hop',
    vote: '0',
  },
  {
    id: 2,
    author: 'Дайте танк',
    src: '/public/singls/dayte-tank-logika.jfif',
    name: 'Логика',
    genre: 'Инди',
    vote: '0',
  },
  {
    id: 3,
    author: 'Кроссы',
    src: '/public/singls/krosy-the-bes.jfif',
    name: 'The Bess',
    genre: 'Electro',
    vote: '0',
  },
  {
    id: 4,
    author: 'Женя Трофимов, Комната культуры',
    src: '/public/singls/poezda.jfif',
    name: 'Поезда',
    genre: 'Инди',
    vote: '0',
  },
  {
    id: 5,
    author: 'Скриптонит',
    src: '/public/singls/skriptonit-ne-ralab.jfif',
    name: 'Не раслабляся',
    genre: 'hip-hop',
    vote: '0',
  },
  {
    id: 6,
    author: 'Xolidayboy',
    src: '/public/singls/xolidayboy-pazhary.jfif',
    name: 'ПОЖАРЫ',
    genre: 'Инди',
    vote: '0',
  },
])
const currentIndex = ref(0)

const nextSlide = () => {
  if (currentIndex.value < 5) {
    currentIndex.value = (currentIndex.value + 1) % singles.value.length
  }
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + singles.value.length) % singles.value.length
}
</script>
<template>
  <main>
    <hero class="hero">
      <div class="container">
        <div class="hero__wrap">
          <div class="hero__content">
            <h1 class="hero__content-title">choose the best</h1>
            <div class="hero__content-text">
              <p>Vote for the best, reward for the best</p>
            </div>
            <router-link to="/vote" class="hero__content-button"> Vote Now </router-link>
          </div>
        </div>
      </div>
    </hero>
    <section class="songs">
      <div class="container">
        <h1 class="songs-title">Best Singles</h1>
        <div class="slider">
          <div class="slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="singles__block" v-for="sing in singles" :key="singles.id">
              <div class="singles__block-img">
                <img :src="sing.src" :alt="sing.name" />
              </div>
              <div class="singles__about">
                <h4 class="singles__about-titile">
                  {{ sing.name }}
                </h4>
              </div>
            </div>
          </div>
          <button @click="prevSlide">Previous</button>
          <button @click="nextSlide">Next</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
}
.hero {
  width: 100%;
  height: 500px;
  display: flex;
  background: url('/public/hero/hero-bg.svg') no-repeat -100px 0 / cover;
}

.hero__wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.hero__content {
  padding: 150px 0;
  display: flex;
  flex-direction: column;
}

.hero__content-title {
  font-size: 2.5rem;
  text-transform: uppercase;
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-weight: 700;
}

.hero__content-text {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  gap: 10px;
}

.hero__content-text p {
  font-family: 'Special Gothic Expanded One', sans-serif;
  text-transform: capitalize;
}

.hero__content-button {
  background: #000000;
  margin-top: 20px;
  border-radius: 5px;
  width: 150px;
  height: 40px;
  text-align: center;
  align-content: center;
  transition: 0.2s;
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
}

.hero__content-button:hover {
  background: #00000080;
}

.songs {
  margin: 50px 0;
}

.slider {
  position: relative;
  overflow: hidden;
  width: 100%; /* Ширина слайдера */
  height: 400px; /* Высота слайдера */
}

.slides {
  width: 500px;
  display: flex;
  transition: transform 0.5s ease;
}

.slides div {
  min-width: 100%;
}

img {
  width: 300px;
  height: 300px;
  height: auto;
}
</style>
