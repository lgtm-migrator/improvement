import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useWebSocket from 'react-use-websocket'

import { useGetOneUserBoardQuery } from 'client/api'
import { PathParams } from 'types/router'
import Loader from 'components/elements/Loader'
import { BoardData, SendBoardJson } from 'types/board'
import { BaseQueryError } from 'client/baseQuery'

type BoardProps = {
    pathId: string
    boardName: string
    boardUuid: string
}

type BoardWSHookProps = {
    sendJsonMessage: (jsonMsg: SendBoardJson) => void
    lastJsonMessage: BoardData
}

const boardWebsocketBaseUrl = `${
    import.meta.env.SNOWPACK_PUBLIC_APP_WEBSOCKET_URL
}/api/board/ws`

const Board: React.FC<BoardProps> = ({ boardName, boardUuid, pathId }) => {
    const [columnName, setColumnName] = useState('')
    const [columnNewPos, setColumnNewPos] = useState<number>(0)
    const { sendJsonMessage, lastJsonMessage: boardData }: BoardWSHookProps =
        useWebSocket(`${boardWebsocketBaseUrl}/${pathId}`)

    return (
        <div>
            <div className="grid place-items-center p-2">
                Board name: {boardName}
            </div>
            <div className="grid place-items-center">
                <input
                    type="text"
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                />
                <button
                    type="button"
                    onClick={createNewColumn}
                    className="border-2 border-gray-300 rounded-md p-1 mt-2"
                >
                    Create new column
                </button>
                <h1 className="text-lg text-gray-700 font-bold">Columns</h1>
                <div>
                    {!!boardData && boardData.columns ? (
                        boardData.columns.map((column, idx) => (
                            <div key={column.column_uuid}>
                                <span className="mr-2 text-gray-400">
                                    {idx}
                                </span>
                                <input
                                    className="h-1 w-20 disabled:bg-gray-200"
                                    type="number"
                                    onChange={(e) => {
                                        setColumnNewPos(+e.target.value)
                                    }}
                                />
                                <button
                                    className="mr-1 ml-1"
                                    type="button"
                                    onClick={() =>
                                        updateColumn(
                                            column.column_uuid,
                                            column.column_name
                                        )
                                    }
                                >
                                    &#9881;
                                </button>
                                <span>{column.column_name}</span>
                                <span className="ml-1">
                                    {column.column_uuid}
                                </span>
                                <button
                                    className="ml-3"
                                    type="button"
                                    onClick={() =>
                                        deleteColumn(column.column_uuid)
                                    }
                                >
                                    &#10060;
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="grid place-items-center">
                            Data for {boardName} unavailable
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    function createNewColumn() {
        const newColumn = {
            column_name: columnName,
            board_uuid: boardUuid,
        }
        const columnCreateData = {
            new_column: newColumn,
            column_order: boardData.column_order,
        }
        sendJsonMessage({ crud: 'create', data: columnCreateData })
    }

    function updateColumn(columnUuid: string, updatedColumnName: string) {
        const newColumnOrder = boardData.column_order
        const currentColIdx = newColumnOrder.indexOf(columnUuid)

        // remove column from old spot and move to new
        newColumnOrder.splice(currentColIdx, 1)
        newColumnOrder.splice(columnNewPos, 0, columnUuid)

        const updatedColumn = {
            column_uuid: columnUuid,
            column_name: updatedColumnName,
            board_uuid: boardUuid,
        }
        const columnUpdatedData = {
            updated_column: updatedColumn,
            column_order: newColumnOrder,
        }

        sendJsonMessage({ crud: 'update', data: columnUpdatedData })
    }

    function deleteColumn(columnUuid: string) {
        const updatedColumnOrder = boardData.column_order.filter(
            (columnId) => columnId !== columnUuid
        )
        const columnDeletionData = {
            column_uuid: columnUuid,
            column_order: updatedColumnOrder,
        }
        sendJsonMessage({ crud: 'delete', data: columnDeletionData })
    }
}

const BoardContainer: React.FC = () => {
    const { pathId } = useParams<PathParams>()
    const {
        data: board,
        isLoading,
        isFetching,
        error,
    } = useGetOneUserBoardQuery({
        boardUuid: pathId ?? '',
    })

    if (isLoading || isFetching) {
        return <Loader center />
    }
    if (error) {
        const boardError = error as BaseQueryError

        if (boardError.status === 404) {
            return <Navigate to="/404" />
        }

        return <div>Error while trying to get the board</div>
    }
    if (board && pathId) {
        return (
            <Board
                pathId={pathId}
                boardName={board.boardName}
                boardUuid={board.boardUuid}
            />
        )
    }
    return <div>Board not found</div>
}

export default BoardContainer
