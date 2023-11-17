import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    'constants/(.*)$': '<rootDir>/src/constants/$1',
    'helpers/(.*)$': '<rootDir>/src/helpers/$1',
    'models/(.*)$': '<rootDir>/src/models/$1',
    'algorithms/(.*)$': '<rootDir>/src/algorithms/$1',
    'components/(.*)$': '<rootDir>/src/components/$1',
  }
};

export default config;
