// This component injects a script that prevents flickering when the site loads
// by immediately setting the theme based on localStorage or system preference

export function ThemeScript() {
  const themeScript = `
    (function() {
      function getStoredTheme() {
        return localStorage.getItem('theme')
      }

      function getPreferredTheme() {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
          return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }

      function setTheme(theme) {
        if (theme === 'system') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }

        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        document.documentElement.style.setProperty('--initial-color-mode', theme)
      }

      const theme = getPreferredTheme()

      setTheme(theme)

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getStoredTheme() === 'system') {
          setTheme(getPreferredTheme())
        }
      })
    })()
  `;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  );
}
