export function autoResize(node: HTMLElement) {
  function resize() {
    node.style.height = '40px';
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
