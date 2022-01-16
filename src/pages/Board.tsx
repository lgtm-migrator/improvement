import React, { useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

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
import { columnsWithCards } from 'state/slices/boardSlice'

type BoardProps = {
    boardName: string
    boardUuid: string
}

const Board: React.FC<BoardProps> = ({ boardName, boardUuid }) => {
    const columns = useAppSelector(columnsWithCards)
    const search = useAppSelector((state) => state.search.input)

    const columnsRef = useRef<HTMLDivElement>(null)
    const addRef = useRef<HTMLTextAreaElement>(null)

    const { sendBoardWsMsg } = useBoardWebsocket(boardUuid)

    const { setDndDropResult } = useBoardDnd({
        boardUuid,
        sendBoardWsMsg,
    })

    const {
        newColumnName,
        handleNewColInput,
        createNewColumn,
        handleColNameChange,
        deleteColumn,
    } = useColumnDataHandling({ boardUuid, sendBoardWsMsg })

    const noCols = columns.length === 0

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
                                {columns
                                    ?.filter((column) =>
                                        column.column_name.includes(search)
                                    )
                                    .map((column, idx) => (
                                        <ColumnComponent
                                            key={column?.column_uuid}
                                            index={idx}
                                            column={column}
                                            cards={column.cards}
                                            changeColName={handleColNameChange}
                                            deleteColumn={deleteColumn}
                                            sendBoardWsMsg={sendBoardWsMsg}
                                        />
                                    ))}
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
