<script setup>
import { ref, nextTick } from 'vue'
import axiosApiInstance from '@/api'
import Glide from '@glidejs/glide'

const singles = ref([])
const albums = ref([])
let glideInstances = {}
const loader = ref(false)

const initGlide = async (selector) => {
  try {
    if (glideInstances[selector]) {
      glideInstances[selector].destroy()
      glideInstances[selector] = null
    }
    await nextTick()
    glideInstances[selector] = new Glide(selector, {
      type: 'carousel',
      perView: 4,
      gap: 10,
      autoplay: false,
      hoverpause: true,
      breakpoints: {
        1456: { perView: 3 },
        1136: { perView: 2 },
        650: { perView: 1, focusAt: 'center' },
      },
    }).mount()
  } catch (e) {
    console.error(`Glide init failed for ${selector}:`, e)
  }
}

const getDates = async (dbName, targetRef, selector) => {
  loader.value = true
  try {
    const response = await axiosApiInstance.get(
      `https://award-vue-default-rtdb.asia-southeast1.firebasedatabase.app/${dbName}.json`,
    )
    targetRef.value = Object.entries(response.data).map(([key, item]) => ({
      id: key,
      name: item.name,
      author: item.author,
      src: item.src,
      vote: item.vote,
    }))
    await initGlide(selector)
  } catch (err) {
    console.error(`Error fetching ${dbName}:`, err)
  } finally {
    loader.value = false
  }
}

getDates('singles', singles, '.glide-singles')
getDates('album', albums, '.glide-albums')
</script>

<template>
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
  <section class="about">
    <div class="container">
      <div class="about__body">
        <div class="about__img">
          <img src="/about-bg.png" alt="music discket" />
        </div>
        <div class="about__text">
          <h1 class="section-title">About Us</h1>
          <div class="about__body-text">
            <p>
              We’re a music community where your vote picks the best songs and albums. Vote daily,
              watch rankings update live, and help shape a chart made by real listeners — not just
              sales or streams. Discover new artists, support your favorites, and be part of a
              movement that celebrates true musical talent.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="songs">
    <div class="container">
      <div class="singles">
        <h1 class="songs-title">Best Singles</h1>
        <div class="glide glide-singles">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide" v-for="sing in singles" :key="sing.id">
                <div class="singles__block">
                  <div class="singles__block-img">
                    <img :src="sing.src" :alt="sing.name" loading="lazy" />
                  </div>
                  <div class="singles__about">
                    <p>{{ sing.author }}</p>
                    <p>{{ sing.name }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls" v-if="singles.length">
            <button data-glide-dir="<">‹</button>
            <button data-glide-dir=">">›</button>
          </div>
        </div>
      </div>
      <div class="albums">
        <h1 class="songs-title">Best Albums</h1>
        <div class="glide glide-albums">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide" v-for="album in albums" :key="album.id">
                <div class="singles__block">
                  <div class="singles__block-img">
                    <img :src="album.src" :alt="album.name" loading="lazy" />
                  </div>
                  <div class="singles__about">
                    <p>{{ album.author }}</p>
                    <p>{{ album.name }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls" v-if="albums.length">
            <button data-glide-dir="<">‹</button>
            <button data-glide-dir=">">›</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  height: 500px;
  display: flex;
  background: url('/hero/hero-bg.svg') no-repeat center center / cover;
}

.hero__wrap {
  display: flex;
  align-items: center;
  width: 100%;
}

.hero__content {
  padding: 150px 0;
  display: flex;
  flex-direction: column;
}

.hero__content-title {
  font-size: 3rem;
  text-transform: uppercase;
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-weight: 700;
}

.hero__content-text {
  margin-top: 20px;
}

.hero__content-text p {
  font-family: 'Special Gothic Expanded One', sans-serif;
  text-transform: capitalize;
}

.hero__content-button {
  background: #000;
  margin-top: 20px;
  border-radius: 5px;
  width: 150px;
  padding: 10px 0;
  text-align: center;
  transition: background 0.2s;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
}

.hero__content-button:hover {
  background: rgba(0, 0, 0, 0.5);
}

.about {
  margin: 50px 0;
}

.about__body {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.about__text {
  width: 50%;
  h1 {
    text-align-last: left;
  }
}

.about__body-text {
  font-size: 20px;
  line-height: 200%;
}

.about__img {
  width: 50%;
}

.about__img img {
  max-width: 600px;
  width: 100%;
}

.songs {
  margin: 50px 0;
}

.songs-title,
.section-title {
  font-family: var(--second-font);
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.singles__block {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.singles__about {
  border-radius: 0 0 5px 5px;
  background-color: #000;
  padding: 10px 15px;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
}

.singles__block-img {
  width: 100%;
  height: auto;
}

.singles__block-img img {
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: auto;
}

.albums {
  margin: 50px 0;
}

.singles,
.albums {
  height: 500px;
}

.glide {
  position: relative;
  width: 100%;
}
.glide__track {
  overflow: hidden;
}
.glide__slides {
  position: relative;
  display: flex;
}
.glide__slide {
  flex: 0 0 auto;
  width: 10px;
  padding: 10px;
}
.glide__arrows {
  position: absolute;
  top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}
.glide__arrows button {
  height: 442px;
  background: rgba(0, 0, 0);
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  opacity: 0.1;
  transition: 0.4s;
}

.glide__arrows button:hover {
  opacity: 0.8;
}

@media (max-width: 1048px) {
  .about__body-text {
    line-height: 150%;
  }
}

@media (max-width: 768px) {
  .hero__content-title {
    font-size: 2rem;
  }
  .songs-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero__content-title {
    font-size: 1.5rem;
  }
  .songs-title {
    font-size: 1.5rem;
  }
}
</style>
