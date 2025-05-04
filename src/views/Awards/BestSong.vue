<script setup>
import AwardTitleIcon from '@/components/icons/AwardTitleIcon.vue'
import ButtonLoader from '@/components/icons/ButtonLoader.vue'
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axiosApiInstance from '@/api'
import { getDates } from '@/utils/getDates'

const authStore = useAuthStore()

const singles = ref([])
const loader = reactive({})
const dateLoad = ref(true)

Promise.all([getDates('singles').then((data) => (singles.value = data))]).then(() => {
  dateLoad.value = false
})

const voteForSinger = async (single) => {
  loader[single.id] = true
  try {
    const token = authStore.userInfo.token
    const userId = authStore.userInfo.userId
    if (!token || !userId) {
      console.log('User not authenticated')
      return
    }
    const song = singles.value.find((sing) => sing.id === single.id)

    if (song) {
      if (!song.voters) {
        song.voters = {}
      }
      if (song.voters[userId]) {
        console.log('You have already voted for this song.')
        return
      }
      await axiosApiInstance.patch(
        `https://award-vue-default-rtdb.asia-southeast1.firebasedatabase.app/singles/${single.id}.json`,
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
    loader[single.id] = false
  }
}
</script>

<template>
  <div class="loader" v-if="dateLoad">
    <div class="loader-item"></div>
  </div>
  <section class="singles" v-if="singles.length">
    <div class="container">
      <div class="singles__wrap">
        <h1 class="singles-title">
          Best Singles <br />
          <AwardTitleIcon />
        </h1>
        <div class="singles__row">
          <div class="singles__block" v-for="sing in singles" :key="sing.id">
            <div class="singles__block-img">
              <img :src="sing.src" :alt="sing.name" loading="lazy" />
            </div>
            <div class="singles__about">
              <div class="singles__about-text">
                <span>{{ sing.name }} </span><br />
                <span>{{ sing.author }} </span><br />
                <span>Votes: {{ sing.vote }}</span>
              </div>
              <button
                type="button"
                class="singles__about-button"
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
    </div>
    <a href="javascript:history.back()" class="singles__back">
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
.singles {
  position: relative;
  margin: 30px 0 100px;
}

.singles-title {
  font-size: 2.2rem;
  font-weight: 600;
  font-family: var(--second-font);
  text-align: center;
}

.singles__row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.singles__block {
  padding: 20px;
  border-radius: 20px;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;
}

.singles__block-img {
  max-width: 300px;
  width: 100%;
}
.singles__block-img img {
  border-radius: 10px;
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.singles__about {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 100%;
}

.singles__about-text span {
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
}

.singles__about-button {
  margin: 20px 0 0;
  border-radius: 10px;
  width: 100%;
  height: 40px;
  background-color: #000;
  color: #fff;
}

.singles__back {
  position: absolute;
  top: -10px;
  left: 20px;
}

.singles__back svg {
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
