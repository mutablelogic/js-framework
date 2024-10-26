import { FeatureModel } from "../src/geojson/FeatureModel";

window.addEventListener('load', () => {
  const provider = document.querySelector('#provider');
  const table = document.querySelector('#table');
  table.model = new FeatureModel(provider);
  provider.path = 'data.json';
});
