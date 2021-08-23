import React from 'react'

import {
    CheckCircleIcon,
    ExclamationIcon,
    InformationCircleIcon,
    XCircleIcon,
    XIcon,
} from '@heroicons/react/solid'
import { ToastContainer as BaseToastcontainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from './Toast.styles'

// https://fkhadra.github.io/react-toastify/introduction/

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default'

type ToastProps = {
    type: ToastType
    msg: string
}

const contextBgClass: { [key in string]: string } = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    info: 'bg-blue-50',
    warning: 'bg-yellow-50',
    default: 'bg-indigo-50',
}

const contextTextClass: { [key in string]: string } = {
    success: 'text-green-700',
    error: 'text-red-700',
    info: 'text-blue-700',
    warning: 'text-yellow-700',
    default: 'text-indigo-700',
}

const contextDismissBtnStyles: { [key in string]: string } = {
    success: `${styles.dismissBtnBase} ${styles.dismissSuccessBtn}`,
    error: `${styles.dismissBtnBase} ${styles.dismissErrorBtn}`,
    info: `${styles.dismissBtnBase} ${styles.dismissInfoBtn}`,
    warning: `${styles.dismissBtnBase} ${styles.dismissWarningBtn}`,
    default: `${styles.dismissBtnBase} ${styles.dismissDefaultBtn}`,
}

const ToastIcon: React.FC<{ type: ToastType }> = ({ type }) => {
    switch (type) {
        case 'success':
            return (
                <CheckCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                />
            )
        case 'error':
            return (
                <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                />
            )
        case 'info':
            return (
                <InformationCircleIcon
                    className="h-5 w-5 text-blue-400"
                    aria-hidden="true"
                />
            )
        case 'warning':
            return (
                <ExclamationIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                />
            )
        default:
            return <div />
    }
}

export const Toast: React.FC<ToastProps> = ({ type, msg }) => {
    return (
        <div className={`rounded-md p-4 ${contextBgClass[type || 'default']}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <ToastIcon type={type} />
                </div>
                <div className="ml-3">
                    <p
                        className={`text-sm font-medium ${
                            contextTextClass[type || 'default']
                        }`}
                    >
                        {msg}
                    </p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            data-testid="dismiss-toast-btn"
                            type="button"
                            className={
                                contextDismissBtnStyles[type || 'default']
                            }
                        >
                            <span className="sr-only">Dismiss</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ToastContainer = (): React.ReactElement => (
    <BaseToastcontainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
        toastClassName={(props) =>
            `${
                contextBgClass[props?.type || 'default']
            } relative flex p-0 rounded-md justify-between overflow-hidden cursor-pointer`
        }
    />
)

export default ToastContainer
