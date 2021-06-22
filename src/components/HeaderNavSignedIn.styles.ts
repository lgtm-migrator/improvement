import cntl from 'cntl'

export default {
    openMobileMenuBtn: cntl`
        border-r 
        border-gray-200 
        px-4 
        text-gray-500 
        focus:outline-none 
        focus:ring-2 
        focus:ring-inset 
        focus:ring-indigo-500 
        md:hidden
    `,
    searchInput: cntl`
        h-full 
        w-full 
        border-transparent 
        py-2 
        pl-8 
        pr-3 
        text-base 
        text-gray-900 
        placeholder-gray-500 
        focus:outline-none 
        focus:ring-0 
        focus:border-transparent 
        focus:placeholder-gray-400
    `,
}
