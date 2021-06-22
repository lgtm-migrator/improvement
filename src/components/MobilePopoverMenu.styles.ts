import cntl from 'cntl'

export default {
    container: cntl`
        border-t 
        border-gray-200 
        pt-4 
        pb-3
    `,
    profileContainer: cntl`
        max-w-3xl 
        mx-auto 
        px-4 
        flex 
        items-center 
        sm:px-6
    `,
    userNavLink: cntl`
        block 
        rounded-md 
        py-2 
        px-3 
        text-base 
        font-medium 
        text-gray-500 
        hover:bg-gray-50 
        hover:text-gray-900
    `,
}
