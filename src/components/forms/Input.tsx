import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

const invalidStyles =
    'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'

type CustomInputProps = {
    type?: string
    name: string
    valid?: boolean
    labelTxt?: string
    placeHolder?: string
    invalidMsg?: string
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & CustomInputProps

const Input: React.FC<InputProps> = ({
    type = 'text',
    name,
    valid = true,
    labelTxt,
    placeHolder = '',
    invalidMsg,
    value,
    onChange,
    onBlur,
}) => {
    return (
        <div>
            {labelTxt && (
                <label
                    htmlFor={name}
                    className="flex text-sm font-medium text-gray-500"
                >
                    {labelTxt}
                </label>
            )}
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    type={type}
                    name={name}
                    id={name}
                    className={`block w-full pr-10 sm:text-sm rounded-md ${
                        !valid && invalidStyles
                    }`}
                    placeholder={placeHolder}
                    aria-invalid="true"
                    aria-describedby={`${name}-error`}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {!valid && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>
            {!valid && invalidMsg && (
                <small
                    className="flex mt-1 text-xs text-red-600"
                    id={`${name}-error`}
                >
                    {invalidMsg}
                </small>
            )}
        </div>
    )
}

export default Input
