<script setup>
import AwardTitleIcon from '@/components/icons/AwardTitleIcon.vue'
import ButtonLoader from '@/components/icons/ButtonLoader.vue'
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axiosApiInstance from '@/api'
import { getDates } from '@/utils/getDates'

const authStore = useAuthStore()

const singers = ref([])
const loader = reactive({})
const dateLoad = ref(true)

Promise.all([getDates('singers').then((data) => (singers.value = data))]).then(() => {
  dateLoad.value = false
})

const voteForSinger = async (singer) => {
  loader[singer.id] = true
  try {
    const token = authStore.userInfo.token
    const userId = authStore.userInfo.userId
    if (!token || !userId) {
      console.log('User not authenticated')
      return
    }
    const song = singers.value.find((sing) => sing.id === singer.id)

    if (song) {
      if (!song.voters) {
        song.voters = {}
      }
      if (song.voters[userId]) {
        console.log('You have already voted for this song.')
        return
      }
      await axiosApiInstance.patch(
        `https://award-vue-default-rtdb.asia-southeast1.firebasedatabase.app/singers/${singer.id}.json`,
        {
          vote: song.vote + 1,
          voters: { ...song.voters, [userId]: true },
        },
      )
      song.vote += 1
      song.voters[userId] = true
    }
  } catch (err) {
    console.error('Error voting for song:', err)
  } finally {
    loader[singer.id] = false
  }
}
</script>

<template>
  <div class="loader" v-if="dateLoad">
    <div class="loader-item"></div>
  </div>
  <section class="singers" v-if="singers.length">
    <div class="container">
      <div class="singers__wrap">
        <h1 class="singers-title">
          Best Singers <br />
          <AwardTitleIcon />
        </h1>
        <div class="singers__block" v-for="sing in singers" :key="sing.id">
          <div class="singers__block-img">
            <img :src="sing.src" :alt="sing.name" loading="lazy" />
          </div>
          <div class="singers__about">
            <div class="singers__about-text">
              <h2>{{ sing.name }}</h2>
              <p>{{ sing.about }}</p>
              <b>Votes: {{ sing.vote }}</b>
            </div>
            <button
              type="button"
              class="singers__about-button"
              @click="voteForSinger(sing)"
              :disabled="loader[sing.id]"
            >
              <ButtonLoader v-if="loader[sing.id]" />
              <p v-else>Vote</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:history.back()" class="singers__back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="256"
        height="256"
        viewBox="0 0 256 256"
        xml:space="preserve"
      >
        <g
          style="
            stroke: none;
            stroke-width: 0;
            stroke-dasharray: none;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 10;
            fill: none;
            fill-rule: nonzero;
            opacity: 1;
          "
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 25.203 45 c 0 0.586 0.205 1.173 0.616 1.644 L 39.08 61.839 c 0.908 1.041 2.487 1.148 3.527 0.24 c 1.04 -0.909 1.146 -2.489 0.24 -3.527 L 31.021 45 l 11.826 -13.553 c 0.907 -1.04 0.799 -2.62 -0.24 -3.527 c -1.04 -0.907 -2.619 -0.8 -3.527 0.24 L 25.819 43.356 C 25.408 43.827 25.203 44.414 25.203 45 z"
            style="
              stroke: none;
              stroke-width: 1;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: currentColor;
              fill-rule: nonzero;
              opacity: 1;
            "
            transform=" matrix(1 0 0 1 0 0) "
            stroke-linecap="round"
          />
          <path
            d="M 25.203 45 c 0 1.381 1.119 2.5 2.5 2.5 h 34.593 c 1.381 0 2.5 -1.119 2.5 -2.5 s -1.119 -2.5 -2.5 -2.5 H 27.703 C 26.322 42.5 25.203 43.619 25.203 45 z"
            style="
              stroke: none;
              stroke-width: 1;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: currentColor;
              fill-rule: nonzero;
              opacity: 1;
            "
            transform=" matrix(1 0 0 1 0 0) "
            stroke-linecap="round"
          />
          <path
            d="M 0 45 c 0 24.813 20.187 45 45 45 c 24.813 0 45 -20.187 45 -45 C 90 20.187 69.813 0 45 0 C 20.187 0 0 20.187 0 45 z M 85 45 c 0 22.056 -17.944 40 -40 40 C 22.944 85 5 67.056 5 45 C 5 22.944 22.944 5 45 5 C 67.056 5 85 22.944 85 45 z"
            style="
              stroke: none;
              stroke-width: 1;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: currentColor;
              fill-rule: nonzero;
              opacity: 1;
            "
            transform=" matrix(1 0 0 1 0 0) "
            stroke-linecap="round"
          />
        </g>
      </svg>
    </a>
  </section>
</template>
<style lang="css" scoped>
.singers {
  position: relative;
  margin: 30px 0 100px;
}

.singers-title {
  font-size: 2.2rem;
  font-weight: 600;
  font-family: var(--second-font);
  text-align: center;
}

.singers__block {
  padding: 20px;
  border-radius: 20px;
  background-color: #eeeeee;
  display: flex;
  gap: 20px;
  margin: 30px 0;
}

.singers__block-img {
  max-width: 300px;
  width: 100%;
}
.singers__block-img img {
  border-radius: 10px;
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.singers__about {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 100%;
}

.singers__about-text h2 {
  font-size: 20px;
  font-weight: 600;
}

.singers__about-text p {
  margin: 10px 0;
}

.singers__about-button {
  border-radius: 10px;
  width: 100%;
  height: 40px;
  background-color: #000;
  color: #fff;
}

.singers__back {
  position: absolute;
  top: -10px;
  left: 20px;
}

.singers__back svg {
  width: 40px;
  height: 40px;
}

.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-item {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #04346b;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }
  62.5% {
    clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
  }
}
@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>
