window.addEventListener('load', () => {
  new EventSource('/esbuild').addEventListener('change', () => location.reload());
});
