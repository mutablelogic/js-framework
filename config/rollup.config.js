import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'js/index.js',
  output: {
    file: 'dist/js/index.js',
    format: 'iife',
  },
  plugins: [
    nodeResolve(),
    postcss({
      extensions: ['.css'],
    }),
  ],
  external: [
    'popper.js',
  ],
};
