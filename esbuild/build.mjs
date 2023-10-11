import {build, transformSync} from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import {typescript} from 'svelte-preprocess-esbuild';

import nodePackage from './../package.json' assert {type: 'json'};

import * as process from 'process';
import path from 'path';
import {fileURLToPath} from 'url';
import {sassPlugin} from 'esbuild-sass-plugin'

import pkg from 'npm-dts';
const {Generator} = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

new Generator({
  entry: 'src/js/index.ts',
  output: 'lib/_types/index.d.ts',
}).generate();

const sharedConfig = {
  entryPoints: [path.resolve(__dirname, '../src/js', 'index.ts')],
  mainFields: ['svelte', 'browser', 'module', 'main'],
  conditions: ['svelte', 'browser'],
  bundle: true,
  minify: true,
  external: Object.keys(nodePackage.dependencies),
  plugins: [
    sassPlugin({
      loadPaths: [path.resolve(__dirname, '../src/scss')],
      type: 'css',
    }),
    sveltePlugin({
      preprocess: [
        typescript()
      ],
    }),
  ],
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: 'lib/index.js',
}).catch((e) => {
  console.log(e);
  process.exit(1);
});

build({
  ...sharedConfig,
  outfile: 'lib/index.esm.js',
  platform: 'neutral', // for ESM
  format: 'esm',
}).catch((e) => {
  console.log(e);
  process.exit(1);
});
