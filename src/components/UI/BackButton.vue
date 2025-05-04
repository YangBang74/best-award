<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(true)
let lastScrollY = window.scrollY

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY < lastScrollY) {
    show.value = true
  } else if (currentScrollY > lastScrollY) {
    show.value = false
  }

  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const goBack = () => {
  window.history.back()
}
</script>
<template>
  <transition name="fade-slide">
    <button v-if="show" @click="goBack" aria-label="Go back" class="back-button">
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
    </button>
  </transition>
</template>
<style lang="css" scoped>
.back-button {
  position: fixed;
  top: 70px;
  left: 20px;
  color: #000000;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.back-button:hover {
  transform: scale(1.1);
  color: #6e6e6e;
}

@media (max-width: 600px) {
  .back-button {
    width: 40px;
    height: 40px;
  }
}

/* Анимация */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
