const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const plugins =
    process.env.NODE_ENV === 'production'
        ? [tailwindcss, autoprefixer, cssnano]
        : [tailwindcss, autoprefixer]

module.exports = { plugins }
