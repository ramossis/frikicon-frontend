import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const frikiTheme = {
  dark: true,
  colors: {
    background: '#1a100c',
    surface: '#2b1b14',
    'surface-bright': '#3a251b',
    'surface-variant': '#23150f',
    primary: '#e09f3e', // Gold Amber
    'primary-darken-1': '#b87c24',
    secondary: '#00b4d8', // Vibrant Cyan / Teal
    'secondary-darken-1': '#0077b6',
    accent: '#ff6b35', // Fire Orange
    error: '#ef4444',
    info: '#38bdf8',
    success: '#10b981',
    warning: '#f59e0b',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'frikiTheme',
    themes: {
      frikiTheme,
    },
  },
})
