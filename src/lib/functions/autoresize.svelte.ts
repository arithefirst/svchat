export function autoResize(node: HTMLElement) {
  function resize() {
    node.style.height = 'auto';
    node.style.height = node.scrollHeight + 'px';
  }

  $effect(() => {
    resize();
    node.addEventListener('input', resize);
    return () => {
      node.removeEventListener('input', resize);
    };
  });
}
