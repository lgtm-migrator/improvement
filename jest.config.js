const path = require('path')

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['./src/setupTests.ts'],
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
