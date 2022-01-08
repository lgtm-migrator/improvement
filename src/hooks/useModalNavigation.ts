import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from 'state/hooks'
import { modalSelector } from 'state/slices/modalSlice'

const useModalNavigation = () => {
    const navigate = useNavigate()
    const { modalOpen, modalRoute } = useAppSelector(modalSelector)

    useEffect(() => {
        if (modalOpen) {
            navigate(modalRoute)
        }
    }, [modalOpen])

    return { modalOpen, modalRoute }
}

export default useModalNavigation
