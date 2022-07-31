import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: './test/env/test-env.ts',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.svg$': './test/fileTransformer.ts'
  },
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
export default config;
