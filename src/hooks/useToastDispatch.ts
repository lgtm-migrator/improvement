import { BaseQueryError } from 'client/baseQuery'
import { useEffect } from 'react'
import { useAppDispatch } from 'state/hooks'
import {
    setErrorToast,
    setSuccessToast,
    setWarningToast,
    setInfoToast,
    setToast,
} from 'state/slices/toastSlice'

type ToastHookProps = {
    msg?: string
    infoMsg?: string
    warningMsg?: string
    successMsg?: string
    errorMsg?: string
    apiError?: unknown
}

const useToastDispatch = ({
    msg,
    infoMsg,
    warningMsg,
    successMsg,
    errorMsg,
    apiError,
}: ToastHookProps): void => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (msg) {
            dispatch(setToast(msg))
        }
        if (infoMsg) {
            dispatch(setInfoToast(infoMsg))
        }
        if (warningMsg) {
            dispatch(setWarningToast(warningMsg))
        }
        if (successMsg) {
            dispatch(setSuccessToast(successMsg))
        }
        if (errorMsg) {
            dispatch(setErrorToast(errorMsg))
        }
        if (apiError) {
            const apiErrorObj = apiError as BaseQueryError

            dispatch(setErrorToast(apiErrorObj.msg))
        }
    }, [dispatch, successMsg, apiError, errorMsg, msg, infoMsg, warningMsg])
}

export default useToastDispatch
