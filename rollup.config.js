import typescript from '@rollup/plugin-typescript';
import dotenv from 'dotenv';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import InlineSvg from 'rollup-plugin-inline-svg';
import css from 'rollup-plugin-import-css';

dotenv.config();

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'Scrollery',
      dir: 'dist/assets',
      format: 'iife',
      sourcemap: isProduction ? false : true
    },
    plugins: [
      css({ output: 'scrollery.css' }),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      InlineSvg(),
      isProduction ? terser() : null,
      serve('dist/assets')
    ]
  }
];
