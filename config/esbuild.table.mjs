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

// Add the table
commonOptions.entryPoints.push('example/table/index.js', 'example/table/index.html');

// Build the table, and optionally serve it in development
if (process.env.NODE_ENV === 'production') {
  await esbuild.build({
    ...commonOptions,
    minify: true,
    sourcemap: false,
  }).catch(() => process.exit(1));
} else if (process.env.NODE_ENV === 'development') {
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
