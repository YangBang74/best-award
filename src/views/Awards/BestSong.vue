<script setup>
import AwardTitleIcon from '@/components/icons/AwardTitleIcon.vue'
import ButtonLoader from '@/components/icons/ButtonLoader.vue'
import BackButton from '@/components/UI/BackButton.vue'
import PageLoader from '@/components/UI/PageLoader.vue'
import { ref, reactive } from 'vue'
import { getDates } from '@/services/getDates'
import { vote } from '@/services/voteService'

const singlesDate = ref([])
const loader = reactive({})
const dateLoad = ref(true)
const disabled = reactive({})

Promise.all([getDates('singles').then((data) => (singlesDate.value = data))]).then(() => {
  dateLoad.value = false
})

const handleVote = async (single) => {
  loader[single.id] = true
  try {
    await vote(single, 'singles', disabled, singlesDate)
  } finally {
    loader[single.id] = false
  }
}
</script>

<template>
  <PageLoader v-if="dateLoad" />
  <section class="singles" v-if="singlesDate.length">
    <div class="container">
      <div class="singles__wrap">
        <h1 class="singles-title">
          Best Singles <br />
          <AwardTitleIcon />
        </h1>
        <div class="singles__row">
          <div class="singles__block" v-for="sing in singlesDate" :key="sing.id">
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
    </div>
    <BackButton />
  </section>
</template>
<style lang="css" scoped>
button:disabled {
  background-color: var(--button-disabled);
  pointer-events: none;
}
.singles {
  position: relative;
  margin: 30px 0 100px;
}

.singles-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--color-text);
  font-family: var(--second-font);
  text-align: center;
}

.singles__row {
  display: flex;
  color: #000;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.singles__block {
  padding: 20px;
  border-radius: 20px;
  background-color: var(--vote-card-bg);
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

.singles__about-button:hover {
  background-color: var(--award-botton-hover);
}
</style>
