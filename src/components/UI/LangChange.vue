<script setup>
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { locale } = useI18n()
const subMenu = ref(false)
const langRef = ref(null)

function changeLanguage(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
  subMenu.value = false
}

function handleClickOutside(event) {
  if (langRef.value && !langRef.value.contains(event.target)) {
    subMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="lang" ref="langRef" @click="subMenu = !subMenu">
    <div class="lang__title">
      <p v-if="locale === 'en'">
        {{ $t('header.english') }}
      </p>
      <p v-if="locale === 'ru'">{{ $t('header.russian') }}</p>
      <svg
        fill="currentColor"
        height="10px"
        width="10px"
        viewBox="0 0 330 330"
        class="lang__title-arrow"
        :style="{ transform: subMenu ? 'rotate(180deg)' : 'rotate(0deg)' }"
      >
        <path
          id="XMLID_225_"
          d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
        />
      </svg>
    </div>
    <div class="lang__sub" :class="{ active: subMenu }">
      <button @click="changeLanguage('en')">{{ $t('header.english') }}</button>
      <button @click="changeLanguage('ru')">{{ $t('header.russian') }}</button>
    </div>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
  width: 80px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
}

.lang__title {
  display: flex;
  align-items: center;
}

.lang__title svg {
  margin-left: 5px;
}

.lang__sub {
  position: absolute;
  top: 25px;
  background-color: var(--header-sub-bg);
  color: var(--button-hero-bg);
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-radius: 2px;
  width: 80px;
  opacity: 0;
  transition: 0.2s;
  button {
    padding: 5px;
  }
  button:hover {
    background-color: var(--header-sub-hover);
    color: var(--button-text);
  }
}

.lang__sub.active {
  opacity: 1;
}

@media (max-width: 768px) {
  .lang {
    font-size: 20px;
    margin-left: 5px;
    width: 85px;
  }
  .lang__sub {
    position: relative;
    font-weight: 600;
    font-size: 20px;
    background-color: transparent;
    gap: 20px;
  }
}
</style>
