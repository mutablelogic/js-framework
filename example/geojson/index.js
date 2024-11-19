// This file defines all the styles and elements used for the web components
import '../../src/index';
import '../esbuild';
import hala from './hala-white-132x132.svg';
import { EventType } from '../../src/core/EventType';

window.addEventListener('load', () => {
  // Brand
  const icon = document.querySelector('#icon');
  if (icon) {
    icon.src = hala;
  }

  // Set toast when error or done
  const provider = document.querySelector('#provider');
  const toast = document.querySelector('#toast');

  provider.addEventListener(EventType.ERROR, (e) => {
    toast.visible = true;
    toast.duration = 10;
    toast.color = 'error';
    toast.innerHTML = `${e.detail}<js-close></js-close>`;
  });

  provider.addEventListener(EventType.DONE, (e) => {
    toast.visible = true;
    toast.duration = 10;
    toast.color = 'info';
    toast.innerHTML = 'Data Reloaded&nbsp;&nbsp;<js-close></js-close>';
  });
});
