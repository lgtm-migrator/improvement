import cntl from 'cntl'

export default {
    searchContainer: cntl`
        flex 
        items-center 
        px-6 
        py-4 
        md:max-w-3xl 
        md:mx-auto 
        lg:max-w-none 
        lg:mx-0 
        xl:px-0
    `,
    searchIconWrapper: cntl`
        pointer-events-none 
        absolute 
        inset-y-0 
        left-0 
        pl-3 
        flex 
        items-center
    `,
    searchInput: cntl`
        block 
        w-full 
        bg-white 
        border 
        border-gray-300 
        rounded-md 
        py-2 
        pl-10 
        pr-3 
        text-sm 
        placeholder-gray-500 
        focus:outline-none 
        focus:text-gray-900 
        focus:placeholder-gray-400 
        focus:ring-1 
        focus:ring-indigo-500 
        focus:border-indigo-500 
        sm:text-sm
    `,
    mobileMenuBtn: cntl`
        -mx-2 
        rounded-md 
        p-2 
        inline-flex 
        items-center 
        justify-center 
        text-gray-400 
        hover:bg-gray-100 
        hover:text-gray-500 
        focus:outline-none 
        focus:ring-2 
        focus:ring-inset 
        focus:ring-indigo-500
    `,
}
