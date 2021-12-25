/** @type {import("snowpack").SnowpackUserConfig } */

export default {
    alias: {
        src: './src',
        client: './src/client',
        components: './src/components',
        constants: './src/constants',
        hooks: './src/hooks',
        pages: './src/pages',
        state: './src/state',
        tests: './src/tests',
        types: './src/types',
        utils: './src/utils',
    },
    mount: {
        public: { url: '/', static: true },
        src: { url: '/dist' },
    },
    plugins: [
        '@snowpack/plugin-postcss',
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-dotenv',
        [
            '@snowpack/plugin-typescript',
            {
                args: '--project tsconfig.app.json',
            },
        ],
        ['@snowpack/plugin-webpack'],
    ],
    routes: [
        /* Enable an SPA Fallback in development: */
        { match: 'routes', src: '.*', dest: '/index.html' },
    ],
    optimize: {
        /* Example: Bundle your final build: */
        // "bundle": true,
    },
    packageOptions: {
        /* ... */
    },
    devOptions: {
        port: 3000,
        tailwindConfig: './tailwind.config.js',
    },
    buildOptions: {
        /* ... */
    },
}
