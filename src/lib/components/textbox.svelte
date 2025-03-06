<script lang="ts">
  import { autoResize } from '$lib/functions/autoresize.svelte';
  import { onMount } from 'svelte';
  interface Props {
    msg: string;
    textareaRef: HTMLTextAreaElement;
    formRef: HTMLFormElement;
  }

  let { msg = $bindable<string>(''), textareaRef = $bindable<HTMLTextAreaElement>(), formRef = $bindable<HTMLFormElement>() }: Props = $props();

  onMount(() => {
    // Submit on textarea enter
    textareaRef?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formRef?.requestSubmit();
      }
    });
  });
</script>

<div
  class="group flex h-fit w-full rounded-md border border-input px-3 shadow-sm
  focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed
  disabled:opacity-50 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-ring"
>
  <textarea
    placeholder="Type Here"
    class="peer flex h-10 min-h-10 w-full resize-none overflow-hidden bg-transparent
        py-2 text-sm outline-none placeholder:text-muted-foreground"
    bind:value={msg}
    bind:this={textareaRef}
    use:autoResize
  ></textarea>
</div>
