import type { Config } from '@jest/types'
import path from 'path'

const configs: Config.InitialOptions = {
    roots: ['<rootDir>/src/'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': path.resolve(
            __dirname,
            'jest/babelTransform.js'
        ),
        '^.+\\.css$': path.resolve(__dirname, 'jest/cssTransform.js'),
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': path.resolve(
            __dirname,
            'jest/fileTransform.js'
        ),
    },
    transformIgnorePatterns: ['node_modules'],
    moduleNameMapper: {
        // https://react-svgr.com/docs/jest/
        // '\\.svg$': '<rootDir>/mocks/svgrMock.tsx',
    },
}

export default configs
