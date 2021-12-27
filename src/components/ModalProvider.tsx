import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { modalSelector } from 'state/slices/modalSlice'
import NewBoardModal from 'components/NewBoardModal'
import { useAppSelector } from 'state/hooks'

type Props = { userUuid: string | undefined }

const ModalProvider = ({ userUuid }: Props) => {
    const { modalOpen, modalName } = useAppSelector(modalSelector)
    const path = useLocation().pathname
    const navigate = useNavigate()
    const parentPath = path.substring(0, path.lastIndexOf('/modal'))

    useEffect(() => {
        return () => {
            const originalPath = parentPath ? parentPath : '/'
            navigate(originalPath)
        }
    }, [modalOpen, parentPath])

    if (!userUuid) {
        return <></>
    }

    if (modalOpen && modalName === 'newBoard') {
        return <NewBoardModal open={modalOpen} userUuid={userUuid} />
    } else return <></>
}

export default ModalProvider
