import cntl from 'cntl'

export default {
    userMenuBtn: cntl`
        bg-white 
        rounded-full 
        flex 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-indigo-500
    `,
    menuItems: cntl`
        origin-top-right 
        absolute 
        z-10 
        right-0 
        mt-2 
        w-48 
        rounded-md 
        shadow-lg 
        bg-white 
        ring-1 
        ring-black 
        ring-opacity-5 
        py-1 
        focus:outline-none
    `,
}
