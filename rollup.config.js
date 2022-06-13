import typescript from '@rollup/plugin-typescript';
import dotenv from 'dotenv';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

dotenv.config();

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'Scrollery',
      dir: 'dist',
      format: 'iife',
      sourcemap: isProduction ? false : true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      }),
      isProduction ? terser() : null,
      serve('dist')
    ]
  }
];
