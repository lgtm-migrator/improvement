import cntl from 'cntl'

export default {
    closeMobileMenuBtn: cntl`
        h-12
        w-12
        rounded-full
        flex
        items-center
        justify-center
        focus:outline-none
        focus:ring-2
        focus:ring-white
    `,
    mobileLink: cntl`
        group
        py-2
        px-3
        rounded-md
        flex
        items-center
        text-sm
        font-medium
    `,
}
