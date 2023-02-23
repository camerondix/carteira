/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#14b8a6',
      primaryDark: '#2dd4bf',
      superLightPrimary: '#ccfbf1',
      superLightPrimaryDark: '#f0fdfa',
      lightPrimary: '#5eead4',
      lightPrimaryDark: '#99f6e4',
      darkPrimary: '#115e59',
      darkPrimaryDark: '#0f766e',
      baseColor: 'rgb(255,255,255)',
      baseColorDark: 'rgb(0,0,0)',
      elevatedColor: 'rgb(242,242,247)',
      elevatedColorDark: 'rgb(28,28,30)',
      grayPrimary: 'rgb(0,0,0)',
      grayPrimaryDark: 'rgb(255,255,255)',
      graySecondary: 'rgb(99,99,102)',
      graySecondaryDark: 'rgb(174,174,178)',
      grayTertiary: 'rgb(174,174,178)',
      grayTertiaryDark: 'rgb(99,99,102)',
      grayQuaternary: 'rgb(199,199,204',
      grayQuaternaryDark: 'rgb(72,72,74)',
      red: 'rgb(255,59,48)',
      redDark: 'rgb(255,69,58)',
      green: 'rgb(52,199,89)',
      greenDark: 'rgb(48,209,88)',
      yellow: 'rgb(255,204,0)',
      yellowDark: 'rgb(255,214,10)',
    },
    extend: {},
  },
  plugins: [],
}
