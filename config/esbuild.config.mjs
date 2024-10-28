import esbuild from 'esbuild';

const commonOptions = {
  entryPoints: ['example/index.js'],
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
};

if (process.env.NODE_ENV === 'production') {
  await esbuild.build({
    ...commonOptions,
    minify: true,
    sourcemap: false,
  }).catch(() => process.exit(1));
} else {
  commonOptions.entryPoints.push('example/index.html', 'example/data.json');
  let ctx = await esbuild.context({
    ...commonOptions,
    minify: false,
    sourcemap: true,
  })

  let { host, port } = await ctx.serve({
    servedir: commonOptions.outdir,
  });
  console.log(`Serving on http://${host}:${port}`);

  await ctx.watch();
  console.log('watching');
}