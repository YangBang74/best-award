<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

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
</script>
<template>
  <main>
    <section class="hero">
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
    </section>
    <section class="songs">
      <div class="container">
        <h1 class="songs-title">Best Singles</h1>
        <div class="slider" :slider-scrol>
          <div class="slides">
            <div class="singles__block" v-for="sing in singles" :key="singles.id">
              <div class="singles__block-img">
                <img :src="sing.src" :alt="sing.name" />
              </div>
              <div class="singles__about">
                <div class="singles__about-titile">
                  <p>{{ sing.author }}</p>
                  {{ sing.name }}
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="slider-button slider__prev"><</button>
          <button type="button" class="slider-button slider__next">></button>
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
  background: url('/hero/hero-bg.svg') no-repeat -100px 0 / cover;
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
  overflow-x: auto;
  width: 100%; /* Ширина слайдера */
  height: 450px; /* Высота слайдера */
}

.slides {
  width: 300px;
  display: flex;
  gap: 30px;
  transition: transform 0.5s ease;
}

.slider {
  margin: 30px 0;
}

.songs-title {
  font-size: 48px;
}

.singles__block {
  position: relative;
}

.singles__about {
  border-radius: 0 0 5px 5px;
  background-color: #000;
  padding: 10px 0 10px 15px;
  font-weight: 600;
  font-size: 12px;
  color: #fff;
}

.singles__about p {
  margin-bottom: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 180px;
}

.singles__block-img {
  width: 200px;
  height: 200px;
  img {
    border-radius: 5px 5px 0 0;
    height: 100%;
    width: 100%;
  }
}

.slider-button {
  border-radius: 1px solid #000;
  border-radius: 4px;
  background-color: transparent;
  width: 30px;
  height: 30px;
}
</style>
