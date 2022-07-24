import { minify } from "terser";

const code = `
function setInitialColorMode() {
  function getInitialColorMode() {
    const persistedPreferenceMode = window.localStorage.getItem("theme");
    const hasPersistedPreference = typeof persistedPreferenceMode === "string";
    if (hasPersistedPreference) {
      return persistedPreferenceMode;
    }
    // Check the current preference
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof preference.matches === "boolean";
    if (hasMediaQueryPreference) {
      return preference.matches ? "dark" : "light";
    }
    return "light";
  }
  const currentColorMode = getInitialColorMode();
  const element = document.documentElement;
  element.style.setProperty("--initial-color-mode", currentColorMode);
  if (currentColorMode === "dark")
    document.documentElement.setAttribute("data-theme", "dark");
}`;

export default async function themeInitializerScript(): Promise<string> {
  const runner = `(function() {
    ${code}
    setInitialColorMode();
  })()
  `;

  if (process.env.NODE_ENV === "development") return runner;
  else return minify(runner).then(({ code }) => code as unknown as string);
}
