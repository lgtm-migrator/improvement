module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            animation: {
                bounce200: 'bounce 1s infinite 200ms',
                bounce400: 'bounce 1s infinite 400ms',
            },
        },
    },
    // https://tailwindcss.com/docs/configuring-variants#ordering-variants
    variants: {
        backgroundColor: [
            'odd',
            'even',
            'hover',
            'group-hover',
            'active',
            'disabled',
            'focus',
        ],
        textColor: ['hover', 'active', 'disabled'],
        cursor: ['disabled'],
        borderColor: ['focus', 'hover', 'active', 'disabled'],
        borderWidth: ['focus', 'hover', 'active', 'disabled'],
    },
    plugins: [require('@tailwindcss/forms')],
}
