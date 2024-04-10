
window.addEventListener('load', () => {
    console.log('esbuild');
    new EventSource('/esbuild').addEventListener('change', () => location.reload());
});
