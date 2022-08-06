import typescript from '@rollup/plugin-typescript';
import dotenv from 'dotenv';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import InlineSvg from 'rollup-plugin-inline-svg';

dotenv.config();

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  typescript({
    tsconfig: './tsconfig.json'
  }),
  InlineSvg()
];

const development_config = {
  input: 'src/index.ts',
  output: {
    name: 'Scrollery',
    file: 'client/assets/scrollery.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [...plugins, serve('client/assets')]
};

const production_config = [
  {
    input: 'src/index.ts',
    plugins: [...plugins],
    output: [
      {
        file: 'dist/scrollery.min.js',
        format: 'iife',
        sourcemap: false,
        name: 'Scrollery',
        plugins: [terser()]
      },
      {
        file: 'dist/scrollery.js',
        format: 'iife',
        name: 'Scrollery',
        sourcemap: false
      }
    ]
  }
];

export default isProduction ? production_config : development_config;
