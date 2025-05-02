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
.songs {
  margin: 50px 0;
}

.songs-title {
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
  height: 550px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.glide__arrows button {
  min-height: 300px;
  height: 100%; /* remove the full-height stretching */
  align-self: center; /* center vertically */
  background: rgba(0, 0, 0);
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  opacity: 0.1;
  transition: 0.4s;
}

.glide__arrows {
  position: absolute;
  top: 50%; /* center vertically relative to slides */
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  pointer-events: none; /* allow buttons only to capture events */
}

.glide__arrows button {
  pointer-events: auto; /* make buttons clickable */
}
.glide__arrows button:hover {
  opacity: 0.8;
}
</style>
