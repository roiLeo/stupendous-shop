export default function () {
  const colorMode = useColorMode()

  const isDarkMode = computed<boolean>(
    () => colorMode.preference === 'dark'
  )

  const toggleColorMode = (): void => {
    if (isDarkMode.value) {
      colorMode.preference = 'light'
    } else {
      colorMode.preference = 'dark'
    }
  }

  return {
    isDarkMode,
    isLightMode: computed(() => !isDarkMode.value),
    toggleColorMode,
  }
}
