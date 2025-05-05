<script setup>
import AwardTitleIcon from '@/components/icons/AwardTitleIcon.vue'
import ButtonLoader from '@/components/icons/ButtonLoader.vue'
import BackButton from '@/components/UI/BackButton.vue'
import { ref, reactive } from 'vue'
import { getDates } from '@/services/getDates'
import { vote } from '@/services/voteService'

const singersData = ref([])
const loader = reactive({})
const dateLoad = ref(true)
const disabled = reactive({})

Promise.all([getDates('singers').then((data) => (singersData.value = data))]).then(() => {
  dateLoad.value = false
})

const handleVote = async (singers) => {
  loader[singers.id] = true
  try {
    await vote(singers, 'singers', disabled, singersData)
  } finally {
    loader[singers.id] = false
  }
}
</script>

<template>
  <div class="loader" v-if="dateLoad">
    <div class="loader-item"></div>
  </div>
  <section class="singers" v-if="singersData.length">
    <div class="container">
      <div class="singers__wrap">
        <h1 class="singers-title">
          Best Singers <br />
          <AwardTitleIcon />
        </h1>
        <div class="singers__block" v-for="sing in singersData" :key="sing.id">
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
              @click="handleVote(sing)"
              :disabled="(loader[sing.id], disabled[sing.id])"
            >
              <ButtonLoader v-if="loader[sing.id]" />
              <p v-else>Vote</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <BackButton />
  </section>
</template>
<style lang="css" scoped>
button:disabled {
  background-color: var(--button-disabled);
  pointer-events: none;
}
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
  margin-top: 20px;
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
