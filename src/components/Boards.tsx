import React from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { ChevronRightIcon, XCircleIcon } from '@heroicons/react/solid'

import {
    useDeleteUserBoardMutation,
    useListUserBoardsQuery,
} from 'client/improvementApiClient'
import Button from 'components/elements/Button'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { modalActions } from 'state/slices/modalSlice'
import NewBoardModal from './NewBoardModal'

const Boards: React.FC<{ userUuid: string }> = ({ userUuid }) => {
    const { data: boards } = useListUserBoardsQuery('')
    const modalOpenState = useAppSelector((state) => state.modal.open)
    const dispatch = useAppDispatch()
    const { openModal } = bindActionCreators(modalActions, dispatch)
    const [deleteBoard] = useDeleteUserBoardMutation()

    return (
        <div className="bg-white shadow overflow-hidden overflow-y-auto sm:rounded-md">
            {modalOpenState && <NewBoardModal userUuid={userUuid} />}
            <div className="grid my-2 mr-3 place-items-end">
                <Button
                    size="m"
                    text="New Board"
                    onClick={() => openModal('newBoard')}
                />
            </div>

            <ul className="divide-y divide-gray-200 space-y-3">
                {boards?.length === 0 && (
                    <div className="grid place-items-center h-screen">
                        No boards created
                    </div>
                )}

                {boards?.map((board, idx) => (
                    <li
                        key={board.boardUuid}
                        className={`bg-white shadow overflow-hidden rounded-md px-6 py-3 mx-3 ${
                            idx === 0 && 'my-3'
                        }`}
                    >
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="block hover:bg-gray-50">
                            <div className="px-4 py-4 flex items-center sm:px-6">
                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div className="truncate">
                                        <div className="flex text-sm">
                                            <p className="font-medium text-indigo-600 truncate">
                                                {board.boardName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="ml-5 flex-shrink-0">
                                        <ChevronRightIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="ml-5">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteBoard({
                                                    boardUuid: board.boardUuid,
                                                })
                                            }
                                        >
                                            <XCircleIcon
                                                className="h-5 w-5 text-red-600"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Boards
