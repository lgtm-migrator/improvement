import cntl from 'cntl'

export default {
    signUpContainer: cntl`
        min-h-screen
        bg-gray-50
        flex flex-col
        justify-center
        py-12
        sm:px-6
        lg:px-8
    `,
    logoAndHeaderContainer: cntl`
        sm:mx-auto
        sm:w-full
        sm:max-w-md
    `,
    headerLogo: cntl`
        mx-auto
        h-12
        w-auto
    `,
    headerTxt: cntl`
        mt-6
        text-center
        text-3xl
        font-extrabold
        text-gray-900
    `,
    signUpBoxContainer: cntl`
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
    `,
    signUpFormWrapper: cntl`
        bg-white
        py-8
        px-4
        shadow
        sm:rounded-lg
        sm:px-10
    `,
    signUpForm: cntl`
        space-y-6
    `,
    inputLabel: cntl`
        block
        text-sm
        font-medium
        text-gray-700
    `,
    usernameInput: cntl`
        appearance-none
        block
        w-full
        px-3
        py-2
        border
        border-gray-300
        rounded-md
        shadow-sm
        placeholder-gray-400
        focus:outline-none
        focus:ring-indigo-500
        focus:border-indigo-500
        sm:text-sm
        mt-1
    `,
    passwordInput: cntl`
        appearance-none
        block
        w-full
        px-3
        py-2
        border
        border-gray-300
        rounded-md
        shadow-sm
        placeholder-gray-400
        focus:outline-none
        focus:ring-indigo-500
        focus:border-indigo-500
        sm:text-sm
        mt-1
    `,
    signUpSubmitBtn: cntl`
        w-full
        flex
        justify-center
        py-2
        px-4
        border
        border-transparent
        rounded-md
        shadow-sm
        text-sm
        font-medium
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
    `,
}
