import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/singleton.ts'],
};

export default config;
