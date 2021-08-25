import React from 'react'
import cntl from 'cntl'
import { overrideTailwindClasses } from 'tailwind-override'

const btnBaseClasses = cntl`
    inline-flex
    items-center
    border
    border-transparent
    shadow-sm
    font-medium
    rounded-md
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
`

enum BtnSizeEnum {
    s = 'px-3 py-2 leading-4 text-sm',
    m = 'px-4 py-2 text-sm',
    l = 'px-4 py-2 text-base',
    xl = 'px-6 py-3 text-base',
}

type BtnSizes = 's' | 'm' | 'l' | 'xl'

enum BtnColorsEnum {
    primary = 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    secondary = 'text-gray-700 border-gray-300 bg-white hover:bg-gray-50',
}

type BtnColors = 'primary' | 'secondary'

const btnDisabledStyles = cntl`
    disabled:cursor-not-allowed
    disabled:bg-gray-200
    disabled:text-gray-400
`

type CustomBtnProps = {
    size: BtnSizes
    color: BtnColors
    text: string
    btnRef: React.MutableRefObject<null>
    icon: React.ReactElement
    iconSpot: 'before' | 'after'
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    Partial<CustomBtnProps>

const Button: React.FC<BtnProps> = ({
    size = 's',
    color = 'primary',
    text = '',
    className = '',
    type = 'button',
    btnRef,
    icon,
    iconSpot = 'before',
    ...props
}) => {
    const btnSize = size in BtnSizeEnum && BtnSizeEnum[size]
    const btnColor = color in BtnColorsEnum && BtnColorsEnum[color]

    // className is last which allows for overriding styles according to last class
    const btnClasses = overrideTailwindClasses(
        `${btnBaseClasses} ${btnColor} ${btnSize} ${btnDisabledStyles} ${className}`
    )

    return (
        <button
            ref={btnRef}
            type={type} // eslint-disable-line react/button-has-type
            {...props} // eslint-disable-line react/jsx-props-no-spreading
            className={btnClasses}
        >
            {icon && iconSpot === 'before' && icon}
            {text}
            {icon && iconSpot === 'after' && icon}
        </button>
    )
}

export default Button
