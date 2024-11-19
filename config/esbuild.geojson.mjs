import esbuild from 'esbuild';

const commonOptions = {
  outdir: 'dist',
  format: 'esm',
  bundle: true,
  loader: {
    '.svg': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.otf': 'file',
    '.html': 'copy',
    '.json': 'copy',
  },
  logLevel: 'info',
  entryPoints: [],
};

if (process.env.NODE_ENV === 'production') {
  commonOptions.entryPoints.push('src/index.js');
  await esbuild.build({
    ...commonOptions,
    entryPoints: ['src/index.js'],
    minify: true,
    sourcemap: false,
  }).catch(() => process.exit(1));
} else {
  commonOptions.entryPoints.push('example/geojson/index.html', 'example/geojson/index.js', 'example/geojson/data.json');
  let ctx = await esbuild.context({
    ...commonOptions,
    minify: false,
    sourcemap: true,
  })

  let { host, port } = await ctx.serve({
    servedir: commonOptions.outdir,
  });
  await ctx.watch();
}
