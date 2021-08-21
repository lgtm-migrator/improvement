import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'

import Modal from 'components/overlays/Modal'
import Button from 'components/elements/Button'
import Input from 'components/forms/Input'
import { closeModal } from 'state/slices/modalSlice'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { useCreateNewBoardMutation } from 'client/improvementApiClient'
import { setNewBoardForm, resetNewBoardForm } from 'state/slices/formSlice'
import styles from './NewBoardModal.styles'

const NewBoardModal: React.FC<{ userUuid: string }> = ({ userUuid }) => {
    const { boardName } = useAppSelector((state) => state.forms.newBoard)
    const [error, setError] = useState(false)

    const dispatch = useAppDispatch()
    const [createBoard] = useCreateNewBoardMutation()

    return (
        <Modal handleModalClose={handleModalClose}>
            <div className={styles.newBoardModalContent}>
                <div>
                    <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                        >
                            Create a new board
                        </Dialog.Title>
                        <div className="mt-2">
                            <Input
                                name="board"
                                labelTxt="Board Name"
                                placeHolder="Name for new board..."
                                invalidMsg="Board name can't be empty"
                                value={boardName}
                                valid={!error}
                                onChange={handleInputChange}
                                onBlur={(e) => handleBlur(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <Button
                        text="Create"
                        onClick={handleCreateBoard}
                        className="justify-center sm:col-start-2"
                        disabled={!boardName}
                    />
                    <Button
                        id="cancel-create-board"
                        text="Cancel"
                        color="secondary"
                        onClick={handleModalClose}
                        className="justify-center sm:col-start-1 sm:text-sm"
                    />
                </div>
            </div>
        </Modal>
    )

    function handleModalClose() {
        dispatch(resetNewBoardForm())
        dispatch(closeModal())
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) {
            setError(true)
        } else {
            setError(false)
        }

        dispatch(
            setNewBoardForm({
                boardName: e.target.value,
                ownerUuid: userUuid,
            })
        )
    }

    function handleCreateBoard() {
        createBoard({
            boardCreate: {
                boardName,
                ownerUuid: userUuid,
            },
        })
        dispatch(resetNewBoardForm())
        dispatch(closeModal())
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const relatedTargetId =
            !!e.relatedTarget && (e.relatedTarget as Element).id
        const notCancelling =
            !!relatedTargetId && relatedTargetId !== 'cancel-create-board'

        if (!boardName && notCancelling) {
            setError(true)
        }
    }
}

export default NewBoardModal
