import typescript from '@rollup/plugin-typescript';
import dotenv from 'dotenv';
import serve from 'rollup-plugin-serve';
import svg from 'rollup-plugin-svg-import';
import { terser } from 'rollup-plugin-terser';

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
      typescript({
        tsconfig: './tsconfig.json'
      }),
      svg({
        // process SVG to DOM Node or String. Default: false
        stringify: false
      }),
      isProduction ? terser() : null,
      serve('dist/assets')
    ]
  }
];
