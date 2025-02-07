<script lang="ts">
  import MainLayout from '$lib/components/mainLayout.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.css';
  import type { LayoutProps } from './$types';
  let { data, children }: LayoutProps = $props();
</script>

<ModeWatcher />
<MainLayout data={data.form} channels={data.channels}>
  {@render children()}
</MainLayout>
