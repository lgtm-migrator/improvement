import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon, PlusIcon, XCircleIcon } from '@heroicons/react/solid'

import { useDeleteUserBoardMutation, useListUserBoardsQuery } from 'client/api'
import Button from 'components/elements/Button'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import NoBoards from 'components/NoBoards'
import { openModal } from 'state/slices/modalSlice'
import { DEFAULT_POLL_INTERVAL } from 'src/constants'

const Boards: React.FC = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const search = useAppSelector((state) => state.search.input)

    const { data: boards, isLoading: boardsLoading } = useListUserBoardsQuery(
        undefined,
        { pollingInterval: DEFAULT_POLL_INTERVAL }
    )
    const [deleteBoard, { isLoading: deletingBoard }] =
        useDeleteUserBoardMutation()

    const loading = boardsLoading || deletingBoard

    const handleNewBoardClick = () =>
        dispatch(openModal({ modal: 'newBoard', modalPath: location.pathname }))

    return (
        <div className="bg-white shadow overflow-hidden overflow-y-auto sm:rounded-md">
            {boards?.length !== 0 && (
                <div className="grid my-2 mr-3 place-items-end">
                    <Button
                        size="m"
                        text="New Board"
                        onClick={handleNewBoardClick}
                        disabled={loading}
                        icon={
                            <PlusIcon
                                className="-ml-1 mr-2 h-5 w-5"
                                aria-hidden="true"
                            />
                        }
                    />
                </div>
            )}

            <ul className="divide-y divide-gray-200 space-y-3">
                {boards?.length === 0 && (
                    <div className="grid place-items-center h-screen">
                        <NoBoards />
                    </div>
                )}

                {boards
                    ?.filter((board) => board.boardName.includes(search))
                    .map((board, idx) => (
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
                                        data-test-id={`delete-board-${idx}`}
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
