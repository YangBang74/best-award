<script setup>
import AwardTitleIcon from '@/components/icons/AwardTitleIcon.vue'
import { ref, onMounted } from 'vue'
import lastFm from '@/services/lastFm'

const topTracks = ref([])
const topArtists = ref([])

const getCharts = async () => {
  try {
    topTracks.value = await lastFm.getTopTracks()
    topArtists.value = await lastFm.getTopArtists()
  } catch (e) {
    console.log(e.message)
  }
}

onMounted(() => {
  getCharts()
})

const formatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'short',
})
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero__wrap">
        <div class="hero__content">
          <h1 class="hero__content-title">{{ $t('home.hero-title') }}</h1>
          <div class="hero__content-text">
            <p>{{ $t('home.hero-text') }}</p>
          </div>
          <router-link to="/awards" class="hero__content-button">
            {{ $t('home.hero-button') }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section class="about">
    <div class="container">
      <div class="about__body">
        <div class="about__img">
          <img src="/about.png" alt="music discket" />
        </div>
        <div class="about__text">
          <h1 class="section-title">{{ $t('home.about-title') }}</h1>
          <div class="about__body-text">
            <p>
              {{ $t('home.about-text') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="awards">
    <div class="container">
      <h1 class="section-title">{{ $t('home.award-title') }}</h1>
      <div class="awards__body">
        <router-link to="/awards/best-song" class="awards__body-block">
          <p>{{ $t('home.awards-song') }}</p>
          <award-title-icon />
        </router-link>
        <router-link to="/awards/best-album" class="awards__body-block">
          <p>{{ $t('home.awards-album') }}</p>
          <award-title-icon />
        </router-link>
        <router-link to="/awards/best-singer" class="awards__body-block">
          <p>{{ $t('home.awards-singer') }}</p>
          <award-title-icon />
        </router-link>
      </div>
    </div>
  </div>
  <section class="chart">
    <div class="container">
      <h1 class="section-title">{{ $t('home.top-title') }}</h1>
      <div class="chart__body">
        <div class="top__list">
          <div class="top__list-title">{{ $t('home.top-tracks') }}</div>
          <a
            v-for="(track, index) in topTracks.slice(0, 10)"
            :key="track.name"
            class="top__item"
            :href="track.url"
            target="_blank"
          >
            <div class="top__item-num">
              <span>{{ index + 1 }}. </span>
            </div>
            <div class="top__item-decrip">
              <p>{{ track.artist.name }} — {{ track.name }}</p>
              <p>{{ $t('home.top-listen') }} {{ formatter.format(track.playcount) }}</p>
            </div>
          </a>
        </div>
        <div class="top__list">
          <div class="top__list-title">{{ $t('home.top-artists') }}</div>
          <a
            v-for="(artist, index) in topArtists.slice(0, 10)"
            :key="artist.name"
            :href="artist.url"
            target="_blank"
            class="top__item"
          >
            <div class="top__item-num">
              <span>{{ index + 1 }}. </span>
            </div>
            <div class="top__item-decrip">
              <p>
                {{ artist.name }} — {{ $t('home.top-favorit') }}
                {{ formatter.format(artist.listeners) }}
              </p>
              <p>{{ $t('home.top-listen') }} {{ formatter.format(artist.playcount) }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
  <section class="recomend">
    <div class="container">
      <h1 class="section-title">{{ $t('home.recomend') }}</h1>
      <div class="recomend__body">
        <a href="https://music.yandex.ru/" target="_blank" class="recoment__body-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <path
              fill="#ffca28"
              d="M43.79,18.14l-5.07,4.06C38.9,23.11,39,24.04,39,25c0,7.72-6.28,14-14,14s-14-6.28-14-14	c0-7.04,5.22-12.88,12-13.86V5.1C12.9,6.11,5,14.65,5,25c0,11.03,8.97,20,20,20s20-8.97,20-20C45,22.59,44.57,20.28,43.79,18.14z"
            ></path>
            <circle cx="25" cy="25" r="7" fill="#f4511e"></circle>
            <path
              fill="#f4511e"
              d="M39.99,11.77l-3.41,5.37c-1.79-2.63-4.46-4.63-7.58-5.56V5.4C33.33,6.28,37.17,8.57,39.99,11.77z"
            ></path>
            <rect width="3" height="16" x="29" y="9" fill="#f4511e"></rect>
          </svg>
        </a>
        <a href="https://music.apple.com/" target="_blank" class="recomend__block-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 48 48"
          >
            <path
              fill="#f50057"
              d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5 V37z"
            ></path>
            <path
              fill="#fff"
              d="M19.775,14.821C19.321,14.926,19,15.33,19,15.796V29c0,0.552-0.448,1-1,1h-1c-2.209,0-4,1.343-4,3	s1.791,3,4,3s4-1.343,4-3V21.334c0-0.466,0.321-0.87,0.775-0.974l7.306-1.686C29.551,18.565,30,18.922,30,19.404V26	c0,0.552-0.448,1-1,1h-1c-2.209,0-4,1.343-4,3s1.791,3,4,3s4-1.343,4-3V13.257c0-0.643-0.598-1.119-1.225-0.974L19.775,14.821z"
            ></path>
          </svg>
        </a>
        <a href="https://open.spotify.com/" target="_blank" class="recomend__block-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 48 48"
          >
            <linearGradient
              id="tS~Tu1dsT5kMXF2Lct~HUa_G9XXzb9XaEKX_gr1"
              x1="24.001"
              x2="24.001"
              y1="-4.765"
              y2="56.31"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#4caf50"></stop>
              <stop offset=".489" stop-color="#4aaf50"></stop>
              <stop offset=".665" stop-color="#43ad50"></stop>
              <stop offset=".79" stop-color="#38aa50"></stop>
              <stop offset=".892" stop-color="#27a550"></stop>
              <stop offset=".978" stop-color="#11a050"></stop>
              <stop offset="1" stop-color="#0a9e50"></stop>
            </linearGradient>
            <path
              fill="url(#tS~Tu1dsT5kMXF2Lct~HUa_G9XXzb9XaEKX_gr1)"
              d="M24.001,4c-11.077,0-20,8.923-20,20s8.923,20,20,20c11.076,0,20-8.923,20-20	S35.077,4,24.001,4z"
            ></path>
            <path
              d="M21.224,15.938c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 c-0.145,1.023-0.877,1.755-1.899,1.755c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217 c-2.631,0-5.262,0.293-7.6,0.877c-0.293,0-0.585,0.146-1.023,0.146c-0.075,0.011-0.149,0.016-0.221,0.016 c-0.905,0-1.533-0.821-1.533-1.77c0-1.023,0.585-1.607,1.315-1.754C14.939,16.231,17.862,15.938,21.224,15.938 M20.785,22.369 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461c0,0.878-0.585,1.608-1.462,1.608 c-0.438,0-0.73-0.144-1.023-0.291c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733 c-0.439,0.144-0.585,0.144-0.877,0.144c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607 C15.523,22.808,17.716,22.369,20.785,22.369 M21.223,28.654c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314c-0.146,0.586-0.731,1.023-1.315,1.023c-0.292,0-0.585-0.145-0.877-0.292 c-2.777-1.607-6.139-2.484-9.792-2.484c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146 c-0.731,0-1.169-0.586-1.169-1.17c0-0.73,0.438-1.17,1.023-1.314C16.4,28.945,18.739,28.654,21.223,28.654 M21.224,14.938 c-3.789,0-6.666,0.371-9.317,1.202c-1.254,0.279-2.06,1.341-2.06,2.722c0,1.553,1.112,2.77,2.533,2.77 c0.095,0,0.192-0.005,0.291-0.017c0.319-0.007,0.574-0.065,0.764-0.107c0.068-0.015,0.13-0.035,0.193-0.038h0.123l0.116-0.03 c2.219-0.554,4.763-0.847,7.358-0.847c5.073,0,10.075,1.152,13.381,3.081l0.09,0.053l0.099,0.033 c0.109,0.036,0.195,0.073,0.273,0.105c0.251,0.105,0.563,0.236,1.065,0.236c1.483,0,2.671-1.075,2.889-2.615l0.01-0.07v-0.071 c0-1.171-0.564-2.13-1.549-2.635C33.238,16.313,27.314,14.938,21.224,14.938L21.224,14.938z M20.785,21.369 c-3.291,0-5.651,0.508-7.711,1.057l-0.058,0.015l-0.055,0.022c-1.194,0.476-1.799,1.329-1.799,2.536 c0,1.357,1.104,2.461,2.462,2.461c0.371,0,0.626-0.009,1.189-0.194c1.572-0.429,3.714-0.683,5.827-0.683 c4.441,0,8.562,1.037,11.603,2.921l0.038,0.024l0.04,0.02c0.334,0.168,0.792,0.397,1.471,0.397c1.404,0,2.462-1.121,2.462-2.608 c0-0.996-0.53-1.886-1.387-2.334C31.04,22.659,26.04,21.369,20.785,21.369L20.785,21.369z M21.223,27.654 c-2.547,0-4.969,0.297-7.404,0.907c-1.096,0.27-1.78,1.145-1.78,2.284c0,1.217,0.953,2.17,2.169,2.17 c0.172,0,0.334-0.037,0.522-0.079c0.101-0.023,0.288-0.065,0.357-0.067l0.101-0.003l0.122-0.023 c2.023-0.467,3.963-0.704,5.768-0.704c3.422,0,6.635,0.812,9.291,2.35l0.025,0.015l0.026,0.013 c0.334,0.168,0.792,0.399,1.327,0.399c1.05,0,2.032-0.766,2.285-1.781l0.03-0.119v-0.123c0-1.202-0.595-1.76-1.178-2.147 l-0.022-0.014l-0.022-0.013C29.455,28.713,25.437,27.654,21.223,27.654L21.223,27.654z"
              opacity=".05"
            ></path>
            <path
              d="M21.224,15.938c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 c-0.145,1.023-0.877,1.755-1.899,1.755c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217 c-2.631,0-5.262,0.293-7.6,0.877c-0.293,0-0.585,0.146-1.023,0.146c-0.075,0.011-0.149,0.016-0.221,0.016 c-0.905,0-1.533-0.821-1.533-1.77c0-1.023,0.585-1.607,1.315-1.754C14.939,16.231,17.862,15.938,21.224,15.938 M20.785,22.369 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461c0,0.878-0.585,1.608-1.462,1.608 c-0.438,0-0.73-0.144-1.023-0.291c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733 c-0.439,0.144-0.585,0.144-0.877,0.144c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607 C15.523,22.808,17.716,22.369,20.785,22.369 M21.223,28.654c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314c-0.146,0.586-0.731,1.023-1.315,1.023c-0.292,0-0.585-0.145-0.877-0.292 c-2.777-1.607-6.139-2.484-9.792-2.484c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146 c-0.731,0-1.169-0.586-1.169-1.17c0-0.73,0.438-1.17,1.023-1.314C16.4,28.945,18.739,28.654,21.223,28.654 M21.224,15.438 c-3.747,0-6.582,0.366-9.188,1.186c-1.042,0.222-1.689,1.078-1.689,2.238c0,1.273,0.893,2.27,2.033,2.27 c0.084,0,0.169-0.005,0.257-0.016c0.28-0.004,0.506-0.055,0.689-0.096c0.119-0.027,0.222-0.05,0.299-0.05h0.061l0.06-0.015 c2.258-0.564,4.844-0.862,7.479-0.862c5.158,0,10.254,1.177,13.633,3.149l0.045,0.026l0.05,0.016 c0.123,0.041,0.221,0.082,0.309,0.119c0.231,0.097,0.47,0.197,0.871,0.197c1.247,0,2.209-0.878,2.394-2.185l0.005-0.035v-0.035 c0-0.985-0.473-1.787-1.298-2.201C33.083,16.794,27.24,15.438,21.224,15.438L21.224,15.438z M20.785,21.869 c-3.054,0-5.24,0.416-7.583,1.04l-0.029,0.008l-0.028,0.011c-0.637,0.254-1.484,0.745-1.484,2.071c0,0.943,0.75,1.961,1.962,1.961 c0.34,0,0.541-0.008,1.033-0.169c1.637-0.447,3.827-0.708,5.983-0.708c4.533,0,8.747,1.064,11.867,2.996 c0.345,0.175,0.725,0.366,1.286,0.366c1.119,0,1.962-0.906,1.962-2.108c0-0.823-0.442-1.554-1.154-1.909 C30.885,23.141,25.965,21.869,20.785,21.869L20.785,21.869z M21.223,28.154c-2.506,0-4.888,0.292-7.283,0.892 c-0.864,0.213-1.401,0.902-1.401,1.799c0,0.821,0.624,1.67,1.669,1.67c0.116,0,0.246-0.029,0.411-0.067 c0.148-0.033,0.351-0.079,0.466-0.079h0.057l0.056-0.013c2.06-0.476,4.038-0.717,5.88-0.717c3.51,0,6.809,0.836,9.542,2.417 c0.331,0.168,0.712,0.359,1.127,0.359c0.827,0,1.601-0.603,1.8-1.402l0.015-0.06v-0.061c0-1.012-0.493-1.424-0.954-1.73 C29.277,29.189,25.348,28.154,21.223,28.154L21.223,28.154z"
              opacity=".07"
            ></path>
            <path
              fill="#fff"
              d="M31.747,33.915c-0.292,0-0.585-0.145-0.877-0.292c-2.777-1.607-6.139-2.484-9.792-2.484 c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146c-0.731,0-1.169-0.586-1.169-1.17 c0-0.73,0.438-1.17,1.023-1.314c2.338-0.586,4.677-0.877,7.161-0.877c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314C32.916,33.478,32.331,33.915,31.747,33.915z M33.793,28.945c-0.438,0-0.73-0.144-1.023-0.291 c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733c-0.439,0.144-0.585,0.144-0.877,0.144 c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607c2.192-0.584,4.385-1.023,7.454-1.023 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461C35.255,28.215,34.67,28.945,33.793,28.945z M36.132,23.101 c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217c-2.631,0-5.262,0.293-7.6,0.877 c-0.293,0-0.585,0.146-1.023,0.146c-1.023,0.146-1.754-0.73-1.754-1.754c0-1.023,0.585-1.607,1.315-1.754 c2.777-0.877,5.7-1.17,9.062-1.17c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 C37.886,22.369,37.154,23.101,36.132,23.101z"
            ></path>
          </svg>
        </a>
        <a href="https://soundcloud.com/" target="_blank" class="recomend__block-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 48 48"
          >
            <linearGradient
              id="Ke5cRwe9ua_Q0F8Xn-Y0ua_fL0lnkfCeZWT_gr1"
              x1="24.083"
              x2="24.083"
              y1="8.738"
              y2="34.67"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#ffac00"></stop>
              <stop offset=".966" stop-color="#fe651e"></stop>
            </linearGradient>
            <path
              fill="url(#Ke5cRwe9ua_Q0F8Xn-Y0ua_fL0lnkfCeZWT_gr1)"
              d="M10,33.018c0.596,0,1.265,0,2,0V19.041c-1.11,1.001-1.699,2.212-2,3.121V33.018z M21,18.105	c-0.675-0.316-1.752-0.715-3-0.837v15.749c0.976,0,1.98,0,3,0V18.105z M14,33.018c0.943,0,1.95,0,3,0V17.24	c-1.173,0.03-2.171,0.23-3,0.558V33.018z M4,23.953c-1.178,0.896-2,2.35-2,4.039c0,1.586,0.795,2.987,2,3.905V23.953z M40.995,22.016c-1.444,0-2.283,0.521-2.283,0.521s-0.839-8.488-9.271-8.488c-4.906,0-6.83,2.704-7.441,3.897v15.071	c8.825,0,18.297,0,18.297,0s5.869-0.094,5.869-5.453C46.166,23.439,42.439,22.016,40.995,22.016z M8,23.1	c-0.395-0.051-0.842-0.088-1.341-0.088c-0.223,0-0.441,0.037-0.659,0.073v9.767c0.423,0.104,0.861,0.166,1.311,0.166	c0.151,0,0.393,0,0.689,0V23.1z"
            ></path>
          </svg>
        </a>
        <a href="https://deezer.com" target="_blank" class="recomend__block-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 48 48"
          >
            <rect width="8" height="5" x="3" y="33" fill="#f98613"></rect>
            <rect width="8" height="5" x="14" y="17" fill="#f1bc18"></rect>
            <rect width="8" height="5" x="14" y="25" fill="#ed6630"></rect>
            <rect width="8" height="5" x="14" y="33" fill="#d64d45"></rect>
            <rect width="8" height="5" x="25" y="25" fill="#bd3369"></rect>
            <rect width="8" height="5" x="25" y="33" fill="#6d2f87"></rect>
            <rect width="8" height="5" x="36" y="9" fill="#19aa5c"></rect>
            <rect width="8" height="5" x="36" y="17" fill="#129b8a"></rect>
            <rect width="8" height="5" x="36" y="25" fill="#1084b6"></rect>
            <rect width="8" height="5" x="36" y="33" fill="#1168cf"></rect>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.hero {
  width: 100%;
  height: 500px;
  display: flex;
  background: var(--hero-bg) no-repeat -100px 0 / cover;
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
  color: var(--hero-color);
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
  background: var(--button-hero-bg);
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

.section-title {
  font-family: var(--second-font);
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 600;
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
  text-align: center;
  width: 50%;
}

.about__img img {
  max-width: 500px;
  width: 100%;
}

.awards {
  margin: 75px 0;
}

.awards__body {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  row-gap: 40px;
}

.awards__body-block {
  color: var(--text-color);
  font-weight: 600;
  padding: 18px 0 0;
  border-radius: 30px 0 30px 0;
  border: 2px solid var(--text-color);
  height: 100px;
  min-width: 300px;
  text-align: center;
}

.awards__body-block svg {
  width: 200px;
}

.awards__body-block:hover {
  background: var(--award-card-bg);
  color: var(--award-card-text);
}

.recomend {
  margin: 50px 0;
}

.recomend__body {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 40px;
}

.recomend__body a svg {
  width: 75px;
  height: 75px;
}

.chart {
  margin: 50px 0;
}

.chart__body {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.top__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 35%;
}

.top__list-title {
  font-size: 24px;
  font-weight: 600;
}

.top__item {
  align-items: center;
  padding: 10px;
  height: 80px;
  max-width: 350px;
  background-color: #e9e9e9;
  border-radius: 10px;
  display: flex;
  justify-content: start;
  gap: 10px;
}

.top__item:nth-child(2n) {
  background-color: #ffd8d8;
}
@media (max-width: 1048px) {
  .about__body-text {
    line-height: 150%;
  }
  .chart__body {
    justify-content: start;
  }
  .top__list {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .hero__content-title {
    font-size: 2rem;
  }
  .section-title {
    font-size: 2rem;
  }
  .about__body {
    flex-direction: column-reverse;
  }
  .about__text {
    width: 100%;
  }
  .about__img {
    width: 100%;
  }
  .chart__body {
    flex-direction: column;
    justify-content: center;
  }
  .top__list {
    width: auto;
    margin: 0 auto;
  }
  .top__item {
    width: 100vh;
  }
}

@media (max-width: 480px) {
  .hero__content-title {
    font-size: 1.5rem;
  }
  .songs-title {
    font-size: 1.5rem;
  }
  .recomend__body {
    gap: 20px;
  }
}

@media (max-width: 360px) {
  .top__item {
    max-width: 280px;
  }
}
</style>
