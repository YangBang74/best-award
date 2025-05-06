import { ref, watch } from 'vue'

const theme = ref(
  localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
)

setHtmlAttributes(theme.value)

watch(theme, (newTheme) => {
  setHtmlAttributes(newTheme)
  localStorage.setItem('theme', newTheme)
})

function setHtmlAttributes(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  }
}

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return {
    theme,
    toggleTheme,
  }
}
