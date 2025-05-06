<script setup>
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrap">
        <div class="footer__text">©2025 Yan Khanov.</div>

        <nav class="footer__links">
          <button class="theme-switch">
            <input
              type="checkbox"
              class="checkbox"
              id="checkbox"
              :checked="theme === 'dark'"
              @change="toggleTheme"
            />
            <label for="checkbox" class="label">
              <svg
                class="moon"
                width="24"
                height="24"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                class="sun"
                width="24"
                height="24"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 12L23 12"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 2V1"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 23V22"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 20L19 19"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 4L19 5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 20L5 19"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 4L5 5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 12L2 12"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="ball"></div>
            </label>
          </button>
          <a href="https://github.com/YangBang74" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path
                d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"
              ></path>
            </svg>
            GitHub
          </a>
          <a href="https://t.me/itisyang" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path
                d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"
              ></path>
            </svg>
            Telegram
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer {
  border-top: 1px solid var(--border-buttom);
  background-color: var(--foter-bg);
  text-align: center;
  font-weight: 500px;
}

.footer__wrap {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.footer__text {
  padding: 10px 0;
}

.footer__links {
  display: flex;
  gap: 15px;
}

a {
  color: var(--footer-svg-color);
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

a:hover {
  color: var(--text-color);
}

.theme-switch {
  display: flex;
  justify-content: center;
  align-items: center;
}

.theme-switch .checkbox {
  opacity: 0;
  position: absolute;
}

.theme-switch .label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 50px;
  position: relative;
  height: 40px;
  width: 80px;
  cursor: pointer;
  box-shadow: var(--switch-shadow);
  transition: var(--transition);
}

.theme-switch .label:hover .moon,
.theme-switch .label:hover .sun {
  transform: rotate(360deg);
}

.theme-switch .ball {
  transition: var(--transition);
  background-color: var(--text-color);
  position: absolute;
  border-radius: 50%;
  top: 5px;
  left: 5px;
  height: 30px;
  width: 30px;
}

.theme-switch .moon {
  color: #f1c40f;
  transform-origin: center center;
  transition: all 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  transform: rotate(0);
}

.theme-switch .sun {
  color: #ff6b00;
  transform-origin: center center;
  transition: all 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  transform: rotate(0);
}

.theme-switch .ball {
  transform: translatex(0);
}

.dark .theme-switch .ball {
  transform: translatex(40px);
}

@media (prefers-color-scheme: dark) {
  .theme-switch .ball {
    transform: translatex(40px);
  }

  .light .theme-switch .ball {
    transform: translatex(0);
  }
}
</style>
