import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import smartAsset from 'rollup-plugin-smart-asset';
import url from 'postcss-url';

export default {
  input: 'js/index.js',
  output: {
    sourcemap: true,
    file: 'dist/js/index.js',
    format: 'iife',
  },
  plugins: [
    nodeResolve(),
    postcss({
      extensions: ['.css'],
      plugins: [
        url({
          url: 'inline',
        }),
      ],
    }),
    smartAsset({
      url: 'copy',
      keepImport: true,
      useHash: false,
      keepName: true,
      assetsPath: '../fonts',
      extensions: ['.woff', '.woff2'],
    }),
  ],
  external: [
    'popper.js',
  ],
};
