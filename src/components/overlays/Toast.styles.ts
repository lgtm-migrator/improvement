import cntl from 'cntl'

export default {
    dismissBtnBase: cntl`
        inline-flex
        rounded-md
        p-1.5
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-offset-green-50
    `,
    dismissSuccessBtn: cntl`
        bg-green-50
        text-green-500
        hover:bg-green-100
        focus:ring-green-600
    `,
    dismissErrorBtn: cntl`
        bg-red-50
        text-red-500
        hover:bg-red-100
        focus:ring-red-600
    `,
    dismissInfoBtn: cntl`
        bg-blue-50
        text-blue-500
        hover:bg-blue-100
        focus:ring-blue-600
    `,
    dismissWarningBtn: cntl`
        bg-yellow-50
        text-yellow-500
        hover:bg-yellow-100
        focus:ring-yellow-600
    `,
    dismissDefaultBtn: cntl`
        bg-indigo-50
        text-indigo-500
        hover:bg-indigo-100
        focus:ring-indigo-600
    `,
}
