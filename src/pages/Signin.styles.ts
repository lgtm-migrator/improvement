import cntl from 'cntl'

export default {
    signInContainer: cntl`
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        py-12
        px-4
        sm:px-6
        lg:px-8
    `,
    logoAndHeaderContainer: cntl`
        max-w-md 
        w-full 
        space-y-8
    `,
    headerLogo: cntl`
        mx-auto h-12 w-auto
    `,
    headerText: cntl`
        mt-6 
        text-center 
        text-3xl 
        font-extrabold 
        text-gray-900
    `,
    signInForm: cntl`
        mt-8
        space-y-6
    `,
    inputsContainer: cntl`
        rounded-md 
        shadow-sm 
        -space-y-px
    `,
    usernameInputLabel: cntl`
        appearance-none
        rounded-none
        relative
        block
        w-full
        px-3
        py-2
        border
        border-gray-300
        placeholder-gray-500
        text-gray-900
        rounded-t-md
        focus:outline-none
        focus:ring-indigo-500
        focus:border-indigo-500
        focus:z-10
        sm:text-sm
    `,
    passwordInputLabel: cntl`
        appearance-none
        rounded-none
        relative
        block
        w-full
        px-3
        py-2
        border
        border-gray-300
        placeholder-gray-500
        text-gray-900
        rounded-b-md
        focus:outline-none
        focus:ring-indigo-500
        focus:border-indigo-500
        focus:z-10 sm:text-sm
    `,
    signInSubmitBtn: cntl`
        group
        relative
        w-full
        flex
        justify-center
        py-2
        px-4
        border
        border-transparent
        text-sm
        font-medium
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
    `,
    iconWrapper: cntl`
        absolute 
        left-0 
        inset-y-0 
        flex 
        items-center 
        pl-3
    `,
    lockIcon: cntl`
        h-5 
        w-5 
        text-indigo-500 
        group-hover:text-indigo-400
    `,
}