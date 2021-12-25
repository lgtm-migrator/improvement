import React from 'react'
import { modalSelector } from 'state/slices/modalSlice'
import NewBoardModal from 'components/NewBoardModal'
import { useAppSelector } from 'state/hooks'

type Props = { userUuid: string | undefined }

const ModalProvider = ({ userUuid }: Props) => {
    const { modalOpen, modalName } = useAppSelector(modalSelector)

    if (!userUuid) {
        return <></>
    }

    if (modalOpen && modalName === 'newBoard') {
        return <NewBoardModal open={modalOpen} userUuid={userUuid} />
    } else return <></>
}

export default ModalProvider
