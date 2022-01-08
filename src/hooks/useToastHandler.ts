import { useAppDispatch, useAppSelector } from 'state/hooks'
import {
    toast,
    successToast,
    errorToast,
    warningToast,
    infoToast,
} from 'utils/toast'

const useToastHandler = () => {
    const dispatch = useAppDispatch()
    const toastStatus = useAppSelector((state) => state.toast)

    if (toastStatus.msg) {
        toast(toastStatus.msg, dispatch)
    }

    if (toastStatus.successMsg) {
        successToast(toastStatus.successMsg, dispatch)
    }

    if (toastStatus.errorMsg) {
        errorToast(toastStatus.errorMsg, dispatch)
    }

    if (toastStatus.warningMsg) {
        warningToast(toastStatus.warningMsg, dispatch)
    }

    if (toastStatus.infoMsg) {
        infoToast(toastStatus.infoMsg, dispatch)
    }
}

export default useToastHandler
