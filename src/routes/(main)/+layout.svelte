<script lang="ts">
  import MainLayout from '$lib/components/mainLayout.svelte';
  import type { LayoutProps } from './$types';
  let { data, children }: LayoutProps = $props();
</script>

<MainLayout {data}>
  {@render children()}
</MainLayout>
