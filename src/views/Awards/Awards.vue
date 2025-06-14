<script setup>
import AwardTitleIcon from '@/components/icons/AwardTitleIcon.vue'
import BackButton from '@/components/UI/BackButton.vue'
import PageLoader from '@/components/UI/PageLoader.vue'
import { getDates } from '@/services/getDates'
import { ref, nextTick } from 'vue'
import Glide from '@glidejs/glide'

const singles = ref([])
const albums = ref([])
const singers = ref([])
let glideInstances = {}
const loader = ref(true)

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

Promise.all([
  getDates('singers').then((data) => ((singers.value = data), initGlide('.glide-singers'))),
  getDates('singles').then((data) => ((singles.value = data), initGlide('.glide-singles'))),
  getDates('album').then((data) => ((albums.value = data), initGlide('.glide-albums'))),
]).then(() => {
  loader.value = false
})
</script>

<template>
  <PageLoader v-if="loader" />
  <div class="awards">
    <section class="singers" v-if="singers.length">
      <div class="container">
        <h1 class="songs-title">
          {{ $t('awards.singer') }} <br />
          <AwardTitleIcon />
        </h1>
        <div class="glide glide-singers">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide" v-for="sing in singers" :key="sing.id">
                <router-link to="/awards/best-singer" class="singles__block">
                  <div class="singles__block-img">
                    <img :src="sing.src" :alt="sing.name" loading="lazy" />
                  </div>
                  <div class="singles__about">
                    <p>{{ sing.author }}</p>
                    <p>{{ sing.name }}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls" v-if="singles.length">
            <button data-glide-dir="<">‹</button>
            <button data-glide-dir=">">›</button>
          </div>
        </div>
      </div>
    </section>
    <section class="singles" v-if="singles.length">
      <div class="container">
        <h1 class="songs-title">
          {{ $t('awards.single') }} <br />
          <AwardTitleIcon />
        </h1>
        <div class="glide glide-singles">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide" v-for="sing in singles" :key="sing.id">
                <router-link to="/awards/best-song" class="singles__block">
                  <div class="singles__block-img">
                    <img :src="sing.src" :alt="sing.name" loading="lazy" />
                  </div>
                  <div class="singles__about">
                    <p>{{ sing.author }}</p>
                    <p>{{ sing.name }}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls" v-if="singles.length">
            <button data-glide-dir="<">‹</button>
            <button data-glide-dir=">">›</button>
          </div>
        </div>
      </div>
    </section>
    <section class="albums" v-if="albums.length">
      <div class="container">
        <h1 class="songs-title">
          {{ $t('awards.album') }} <br />
          <AwardTitleIcon />
        </h1>
        <div class="glide glide-albums">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide" v-for="album in albums" :key="album.id">
                <router-link to="/awards/best-album" class="singles__block">
                  <div class="singles__block-img">
                    <img :src="album.src" :alt="album.name" loading="lazy" />
                  </div>
                  <div class="singles__about">
                    <p>{{ album.author }}</p>
                    <p>{{ album.name }}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls" v-if="albums.length">
            <button data-glide-dir="<">‹</button>
            <button data-glide-dir=">">›</button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <BackButton />
</template>
<style scoped>
section {
  margin: 75px 0;
}

.songs-title {
  font-family: var(--second-font);
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.singles__block {
  position: relative;
  width: 100%;
  max-width: 350px;
}

.singles__about {
  border-radius: 0 0 5px 5px;
  background-color: #000;
  padding: 10px 15px;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
}

.singles__about p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  min-height: 418px;
  height: 100%;
  align-self: center;
  background: rgba(0, 0, 0);
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  opacity: 0.1;
  transition: 0.4s;
}

.singers .glide__arrows button {
  min-height: 394px;
}

.glide__arrows {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  pointer-events: none;
}

.glide__arrows button {
  pointer-events: auto;
}
.glide__arrows button:hover {
  opacity: 0.8;
}

.singles__block-img img {
  width: 350px;
  height: 350px;
  object-fit: cover;
}
</style>
