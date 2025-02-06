<script lang="ts">
  import '../app.css';
  import type { LayoutProps } from './$types';
  import MainLayout from '$lib/components/mainLayout.svelte';
  import { ModeWatcher } from 'mode-watcher';
  let { data, children }: LayoutProps = $props();
  const channels = data.channels;
</script>

<ModeWatcher />
<MainLayout {channels}>
  {@render children()}
</MainLayout>
