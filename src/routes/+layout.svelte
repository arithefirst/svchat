<script lang="ts">
  import '../app.css';
  import type { LayoutProps } from './$types';
  import MainLayout from '$lib/components/mainLayout.svelte';
  let { data, children }: LayoutProps = $props();
  const channels = data.channels;
</script>

<MainLayout {channels}>
  {@render children()}
</MainLayout>
