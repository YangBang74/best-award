<script setup>
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
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
        width="20"
        height="20"
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
        width="20"
        height="20"
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
        <path d="M12 2V1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 23V22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M20 20L19 19"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M20 4L19 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 20L5 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 4L5 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1 12L2 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="ball"></div>
    </label>
  </button>
</template>
<style lang="css" scoped>
.theme-switch {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid var(--border-color);
}

.theme-switch:hover {
  border: 1px solid var(--border-color-hover);
}

.theme-switch .checkbox {
  opacity: 0;
  position: absolute;
}

.theme-switch .label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  border-radius: 50px;
  position: relative;
  height: 30px;
  width: 65px;
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
  top: 4px;
  left: 6px;
  height: 22px;
  width: 22px;
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
  transform: translatex(30px);
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
