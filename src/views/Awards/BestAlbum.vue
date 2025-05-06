<script setup>
import AwardTitleIcon from '@/components/icons/AwardTitleIcon.vue'
import ButtonLoader from '@/components/icons/ButtonLoader.vue'
import BackButton from '@/components/UI/BackButton.vue'
import PageLoader from '@/components/UI/PageLoader.vue'
import { ref, reactive } from 'vue'
import { getDates } from '@/services/getDates'
import { vote } from '@/services/voteService'

const albumsDates = ref([])
const loader = reactive({})
const dateLoad = ref(true)
const disabled = reactive({})

Promise.all([getDates('album').then((data) => (albumsDates.value = data))]).then(() => {
  dateLoad.value = false
})

const handleVote = async (album) => {
  loader[album.id] = true
  try {
    await vote(album, 'album', disabled, albumsDates)
  } finally {
    loader[album.id] = false
  }
}
</script>

<template>
  <PageLoader v-if="dateLoad" />
  <section class="albums" v-if="albumsDates.length">
    <div class="container">
      <div class="albums__wrap">
        <h1 class="albums-title">
          Best albums <br />
          <AwardTitleIcon />
        </h1>
        <div class="albums__row">
          <div class="albums__block" v-for="sing in albumsDates" :key="sing.id">
            <div class="albums__block-img">
              <img :src="sing.src" :alt="sing.name" loading="lazy" />
            </div>
            <div class="albums__about">
              <div class="albums__about-text">
                <span>{{ sing.name }} </span><br />
                <span>{{ sing.author }} </span><br />
                <span>Votes: {{ sing.vote }}</span>
              </div>
              <button
                type="button"
                class="albums__about-button"
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
.albums {
  position: relative;
  margin: 30px 0 100px;
}

.albums-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--text-color);
  font-family: var(--second-font);
  text-align: center;
}

.albums__row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.albums__block {
  padding: 20px;
  border-radius: 20px;
  background-color: var(--vote-card-bg);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;
}

.albums__block-img {
  max-width: 300px;
  width: 100%;
}
.albums__block-img img {
  border-radius: 10px;
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.albums__about {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 100%;
}

.albums__about-text span {
  color: #000;
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
}

.albums__about-button {
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
