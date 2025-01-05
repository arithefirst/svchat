import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [daisyui],
  theme: {
    colors: {
      'svelte': '#FF3E00'
    }
  }
} satisfies Config;
