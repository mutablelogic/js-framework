import { EventType } from '../src/core/EventType';

window.addEventListener('load', () => {
  // Set toast when error or done
  const provider = document.querySelector('#provider');
  const toast = document.querySelector('#toast');
  provider.addEventListener(EventType.ERROR, (e) => {
    toast.visible = true;
    toast.duration = 10;
    toast.color = 'error';
    toast.innerHTML = `ERROR: ${e.message}<js-close></js-close>`;
  });
});
