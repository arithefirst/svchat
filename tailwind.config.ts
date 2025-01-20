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
          "primary": "#5fb979",
          "secondary": "#9fdfb3",
          "accent": "#66db89",
          "neutral": "#1b3222",
          "base-100": "#f2f8f4",
        },
        dark: {
          "primary": "#46a05f",
          "secondary": "#206034",
          "accent": "#249947",
          "neutral": "#1b3222",
          "base-100": "#070d09",
        },
      },
    ],
  },
} satisfies Config;
