<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axiosApiInstance from '@/api'

const authStore = useAuthStore()

const loader = ref({})
const voteForSong = async (single) => {
  loader.value[single.id] = true
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
    loader.value[single.id] = false
  }
}
</script>

<template>
  <div class="singles__vote">
    <p>Votes: {{ sing.vote }}</p>
    <button @click="voteForSong(sing)" class="singles__vote-button" :disabled="loader[sing.id]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="25px"
        height="25px"
        v-if="loader[sing.id]"
      >
        <radialGradient
          id="a12"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stop-color="#fff"></stop>
          <stop offset=".3" stop-color="#fff" stop-opacity=".9"></stop>
          <stop offset=".6" stop-color="#fff" stop-opacity=".6"></stop>
          <stop offset=".8" stop-color="#fff" stop-opacity=".3"></stop>
          <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>
        <circle
          transform-origin="center"
          fill="none"
          stroke="url(#a12)"
          stroke-width="15"
          stroke-linecap="round"
          stroke-dasharray="200 1000"
          stroke-dashoffset="0"
          cx="100"
          cy="100"
          r="70"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="0.8"
            values="360;0"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
        <circle
          transform-origin="center"
          fill="none"
          opacity=".2"
          stroke="#fff"
          stroke-width="15"
          stroke-linecap="round"
          cx="100"
          cy="100"
          r="70"
        ></circle>
      </svg>
      <p v-else>Vote</p>
    </button>
  </div>
</template>
<style scoped>
.singles__vote-button {
  margin: 10px 0;
  background: #ffffff;
  border-radius: 5px;
  width: 90%;
  height: 30px;
  text-align: center;
  align-content: center;
  transition: 0.2s;
  color: #000000;
  font-weight: 600;
}
.singles__vote-button:hover {
  background: #00000080;
  color: #ffffff;
}
</style>
