import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import useWebSocket from 'react-use-websocket'

import { useGetOneUserBoardQuery } from 'client/api'
import { PathParams } from 'types/router'
import { Column, ColumnUpdate } from 'types/column'
import Loader from 'components/elements/Loader'
import { BoardData, SendBoardJson } from 'types/board'
import { BaseQueryError } from 'client/baseQuery'
import ColumnComponent from 'components/Column'
import AddComponent from 'components/AddComponent'

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
    const [newColumnName, setNewColumnName] = useState('')
    const columnsRef = useRef<HTMLDivElement>(null)

    const { sendJsonMessage, lastJsonMessage: boardData }: BoardWSHookProps =
        useWebSocket(`${boardWebsocketBaseUrl}/${pathId}`)

    return (
        <div>
            <div className="grid place-items-center p-2 font-bold">
                Board name: {boardName}
            </div>
            <div
                ref={columnsRef}
                className="grid place-items-center overflow-auto"
            >
                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                    <Droppable
                        droppableId="all-columns"
                        direction="horizontal"
                        type="column"
                    >
                        {(provided) => (
                            <div
                                className="flex"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {boardData?.column_order?.map((colId, idx) => {
                                    const column = boardData.columns.find(
                                        (column) => column.column_uuid === colId
                                    )

                                    return (
                                        <ColumnComponent
                                            key={column?.column_uuid}
                                            index={idx}
                                            column={column}
                                            changeColName={handleColNameChange}
                                            deleteColumn={deleteColumn}
                                        />
                                    )
                                })}
                                {provided.placeholder}
                                <AddComponent
                                    name="add column"
                                    value={newColumnName}
                                    placeholder={
                                        'Add column name & press enter'
                                    }
                                    onInputChange={handleNewColNameChange}
                                    onKeyPress={createNewColumn}
                                />
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )

    function onDragEnd(result: DropResult) {
        const { draggableId: colUuid, source, destination } = result

        const noChange =
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)

        if (noChange) return

        const newColumnOrder = boardData.column_order
        const currentColIdx = newColumnOrder.indexOf(colUuid)
        const column = boardData.columns.find(
            (col) => col.column_uuid === colUuid
        )

        // remove column from old spot and move to new
        newColumnOrder.splice(currentColIdx, 1)
        newColumnOrder.splice(destination.index, 0, colUuid)

        const updatedColumn = {
            column_uuid: colUuid,
            column_name: column?.column_name ?? '',
            board_uuid: boardUuid,
        }
        const columnUpdateData = {
            updated_column: updatedColumn,
            column_order: newColumnOrder,
        }

        updateColumn(columnUpdateData)
    }

    function handleNewColNameChange(e: ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault()
        setNewColumnName(e.target.value)
    }

    function handleColNameChange(column: Column, updatedName: string) {
        const columnUpdateData = {
            updated_column: { ...column, column_name: updatedName },
            column_order: boardData.column_order,
        }

        updateColumn(columnUpdateData)
    }

    function createNewColumn(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter') {
            e.preventDefault()
            const newColumn = {
                column_name: newColumnName,
                board_uuid: boardUuid,
            }
            const columnCreateData = {
                new_column: newColumn,
                column_order: boardData.column_order,
            }
            sendJsonMessage({ crud: 'create', data: columnCreateData })
            setNewColumnName('')
        }
    }

    function updateColumn(columnUpdateData: ColumnUpdate) {
        sendJsonMessage({ crud: 'update', data: columnUpdateData })
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
