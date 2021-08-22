import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon, XCircleIcon } from '@heroicons/react/solid'

import {
    useDeleteUserBoardMutation,
    useListUserBoardsQuery,
} from 'client/improvementApiClient'
import Button from 'components/elements/Button'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { openModal } from 'state/slices/modalSlice'
import NewBoardModal from './NewBoardModal'

const Boards: React.FC<{ userUuid: string }> = ({ userUuid }) => {
    const {
        data: boards,
        isLoading: boardsLoading,
        isFetching: fetchingBoards,
    } = useListUserBoardsQuery('')
    const modalOpenState = useAppSelector((state) => state.modal.open)
    const dispatch = useAppDispatch()
    const [deleteBoard, { isLoading: deletingBoard }] =
        useDeleteUserBoardMutation()

    const loading = boardsLoading || fetchingBoards || deletingBoard

    return (
        <div className="bg-white shadow overflow-hidden overflow-y-auto sm:rounded-md">
            {modalOpenState && <NewBoardModal userUuid={userUuid} />}
            <div className="grid my-2 mr-3 place-items-end">
                <Button
                    size="m"
                    text="New Board"
                    onClick={() => dispatch(openModal('newBoard'))}
                    disabled={loading}
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
                        <div
                            className={`flex hover:bg-gray-50 justify-between ${
                                loading && 'cursor-not-allowed'
                            }`}
                        >
                            <Link
                                to={`/board/${board.boardUuid}`}
                                className={`flex-1 ${
                                    loading && 'pointer-events-none'
                                }`}
                            >
                                <div className="px-4 py-4 flex items-center sm:px-6">
                                    <div>
                                        <div className="truncate">
                                            <div className="flex text-sm">
                                                <p className="font-medium text-indigo-600 truncate">
                                                    {board.boardName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="ml-5">
                                            <ChevronRightIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="ml-5 flex items-center">
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
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Boards
