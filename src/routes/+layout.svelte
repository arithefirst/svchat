<script lang="ts">
  import '../app.css';
  import MainLayout from '$lib/components/mainLayout.svelte';
  let { children } = $props();

  const channels: string[] = [];
</script>

<MainLayout {channels}>
  {@render children()}
</MainLayout>
