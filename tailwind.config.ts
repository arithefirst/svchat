import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [daisyui],
  theme: {
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: 'IBM Plex Sans',
      body: 'IBM Plex Sans',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#2083df',
          secondary: '#a78aef',
          accent: '#a854e8',
          neutral: '#081e45',
          'base-100': '#f6f9fe',
        },
        dark: {
          primary: '#2083df',
          secondary: '#2c1075',
          accent: '#6b17ab',
          neutral: '#081e45',
          'base-100': '#010409',
        },
      },
    ],
  },
} satisfies Config;
