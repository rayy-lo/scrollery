import typescript from '@rollup/plugin-typescript';
import dotenv from 'dotenv';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import InlineSvg from 'rollup-plugin-inline-svg';
import css from 'rollup-plugin-import-css';

dotenv.config();

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === 'production';

const development_config = [
  {
    input: 'src/index.ts',
    output: {
      name: 'Scrollery',
      file: 'dist/assets/scrollery.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      css({ output: 'scrollery.css' }),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      InlineSvg(),
      serve('dist/assets')
    ]
  }
];

const production_config = [
  {
    input: 'src/index.ts',
    output: {
      name: 'Scrollery',
      file: 'build/scrollery.min.js',
      format: 'iife',
      sourcemap: false
    },
    plugins: [
      css({ output: 'scrollery.min.css', minify: true }),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      InlineSvg(),
      terser()
    ]
  }
];

export default isProduction ? production_config : development_config;
