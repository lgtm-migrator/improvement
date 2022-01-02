import React, { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import { useGetOneUserBoardQuery } from 'client/api'
import { PathParams } from 'types/router'
import Loader from 'components/elements/Loader'
import { BaseQueryError } from 'client/baseQuery'
import ColumnComponent from 'components/Column'
import AddComponent from 'components/AddComponent'
import useBoardDnd from 'hooks/useBoardDnd'
import useBoardWebsocket from 'hooks/useBoardWebsocket'
import useColumnDataHandling from 'hooks/useColumnDataHandling'
import { useAppSelector } from 'state/hooks'

type BoardProps = {
    boardName: string
    boardUuid: string
}

type UseDropResult = DropResult | undefined

const Board: React.FC<BoardProps> = ({ boardName, boardUuid }) => {
    const boardData = useAppSelector((state) => state.board)
    const [dndDropResult, setDndDropResult] = useState<UseDropResult>(undefined)
    const columnsRef = useRef<HTMLDivElement>(null)
    const addRef = useRef<HTMLTextAreaElement>(null)

    const { sendBoardWsMsg } = useBoardWebsocket(boardUuid)

    useBoardDnd({
        boardUuid,
        dndDropResult,
        sendBoardWsMsg,
    })

    const {
        newColumnName,
        handleNewColInput,
        createNewColumn,
        handleColNameChange,
        deleteColumn,
    } = useColumnDataHandling({ boardUuid, sendBoardWsMsg })

    const noCols = boardData?.columnOrder.length === 0

    return (
        <div>
            <div className="grid place-items-center p-2 font-bold">
                Board name: {boardName}
            </div>
            <div
                ref={columnsRef}
                className="grid place-items-center overflow-auto"
            >
                <DragDropContext onDragEnd={setDndDropResult}>
                    <Droppable
                        droppableId="all-columns"
                        direction="horizontal"
                        type="column"
                    >
                        {(provided) => (
                            <div
                                className={
                                    noCols
                                        ? 'flex justify-center'
                                        : 'flex m-2 w-full min-h-[50vh]'
                                }
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {boardData?.columnOrder?.map((colId, idx) => {
                                    const column = boardData.columns[colId]
                                    const cards = boardData.cards[colId]

                                    return (
                                        <ColumnComponent
                                            key={column?.column_uuid}
                                            index={idx}
                                            column={column}
                                            cards={cards}
                                            changeColName={handleColNameChange}
                                            deleteColumn={deleteColumn}
                                            sendBoardWsMsg={sendBoardWsMsg}
                                        />
                                    )
                                })}
                                {provided.placeholder}
                                <div className={'mt-3'}>
                                    <AddComponent
                                        addRef={addRef}
                                        name="add column"
                                        value={newColumnName}
                                        placeholder={
                                            'Add column name & press enter'
                                        }
                                        onInputChange={handleNewColInput}
                                        onKeyPress={createNewColumn}
                                    />
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
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
        return <Board boardName={board.boardName} boardUuid={board.boardUuid} />
    }
    return <div>Board not found</div>
}

export default BoardContainer
