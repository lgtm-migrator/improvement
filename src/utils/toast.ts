import React from 'react'
import { toast as toastify, ToastOptions } from 'react-toastify'

import { Toast } from 'components/overlays/Toast'
import type { AppDispatch } from 'state/store'
import {
    clearMsg,
    clearErrorMsg,
    clearSuccessMsg,
    clearWarningMsg,
    clearInfoMsg,
} from 'state/slices/toastSlice'

// https://fkhadra.github.io/react-toastify/introduction/

// These are used in App.tsx to fire the toasts when they are triggered
// by one of the redux actions defined in toastSlice.ts.
// Do not use these directly but instead use the redux actions
// to trigger a toast from any component without having to add
// <ToastContainer /> component everywhere

export const toast = (
    msg: string,
    dispatch: AppDispatch,
    toastConfig?: ToastOptions
): React.ReactText => {
    dispatch(clearMsg())

    return toastify(Toast({ type: 'default', msg }), toastConfig)
}

export const errorToast = (
    errMsg: string,
    dispatch: AppDispatch,
    toastConfig?: ToastOptions
): React.ReactText => {
    dispatch(clearErrorMsg())

    return toastify.error(Toast({ type: 'error', msg: errMsg }), toastConfig)
}

export const successToast = (
    successMsg: string,
    dispatch: AppDispatch,
    toastConfig?: ToastOptions
): React.ReactText => {
    dispatch(clearSuccessMsg())

    return toastify.success(
        Toast({ type: 'success', msg: successMsg }),
        toastConfig
    )
}

export const warningToast = (
    warningMsg: string,
    dispatch: AppDispatch,
    toastConfig?: ToastOptions
): React.ReactText => {
    dispatch(clearWarningMsg())

    return toastify.warn(
        Toast({ type: 'warning', msg: warningMsg }),
        toastConfig
    )
}

export const infoToast = (
    infoMsg: string,
    dispatch: AppDispatch,
    toastConfig?: ToastOptions
): React.ReactText => {
    dispatch(clearInfoMsg())

    return toastify.info(Toast({ type: 'info', msg: infoMsg }), toastConfig)
}
