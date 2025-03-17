<script lang="ts">
  import { blur } from 'svelte/transition';
</script>

<div transition:blur class="fixed left-0 top-0 z-40 h-screen w-screen bg-primary/20 backdrop-blur-sm"></div>
<div transition:blur class="fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2">
  <div class="loader"></div>
  <p class="text-secondary-foreground">Loading...</p>
</div>

<style>
  .loader {
    --s: 28px;
    height: var(--s);
    aspect-ratio: 2.5;
    --_g: hsl(var(--secondary-foreground)) 90%, #0000;
    --_g0: no-repeat radial-gradient(farthest-side, var(--_g));
    --_g1: no-repeat radial-gradient(farthest-side at top, var(--_g));
    --_g2: no-repeat radial-gradient(farthest-side at bottom, var(--_g));
    background: var(--_g0), var(--_g1), var(--_g2), var(--_g0), var(--_g1), var(--_g2);
    background-size:
      20% 50%,
      20% 25%,
      20% 25%;
    animation: l45 1s infinite;
  }
  @keyframes l45 {
    0% {
      background-position:
        calc(0 * 100% / 3) 50%,
        calc(1 * 100% / 3) calc(50% + calc(var(--s) / 8)),
        calc(1 * 100% / 3) calc(50% - calc(var(--s) / 8)),
        calc(3 * 100% / 3) 50%,
        calc(2 * 100% / 3) calc(50% + calc(var(--s) / 8)),
        calc(2 * 100% / 3) calc(50% - calc(var(--s) / 8));
    }
    33% {
      background-position:
        calc(0 * 100% / 3) 50%,
        calc(1 * 100% / 3) 100%,
        calc(1 * 100% / 3) 0,
        calc(3 * 100% / 3) 50%,
        calc(2 * 100% / 3) 100%,
        calc(2 * 100% / 3) 0;
    }
    66% {
      background-position:
        calc(1 * 100% / 3) 50%,
        calc(0 * 100% / 3) 100%,
        calc(0 * 100% / 3) 0,
        calc(2 * 100% / 3) 50%,
        calc(3 * 100% / 3) 100%,
        calc(3 * 100% / 3) 0;
    }
    90%,
    100% {
      background-position:
        calc(1 * 100% / 3) 50%,
        calc(0 * 100% / 3) calc(50% + calc(var(--s) / 8)),
        calc(0 * 100% / 3) calc(50% - calc(var(--s) / 8)),
        calc(2 * 100% / 3) 50%,
        calc(3 * 100% / 3) calc(50% + calc(var(--s) / 8)),
        calc(3 * 100% / 3) calc(50% - calc(var(--s) / 8));
    }
  }
</style>
