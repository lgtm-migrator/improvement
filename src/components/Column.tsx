import React, { memo, useRef, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { SendBoardJsonMsg } from 'types/board'
import { CardData } from 'types/card'

import type { Column } from 'types/column'
import AddComponent from 'components/AddComponent'
import CardList from 'components/CardList'
import useCardDataHandling from 'hooks/useCardDataHandling'

type ColumnProps = {
    column: Column
    cards: CardData[]
    index: number
    changeColName: (column: Column, updatedName: string) => void
    deleteColumn: (columnUuid: string) => void
    sendBoardWsMsg: SendBoardJsonMsg
}

type ColumnHeaderProps = {
    column: Column
    index: number
    colTitle: string
    titleFocused: boolean
    columnInputRef: React.RefObject<HTMLInputElement>
    setTitleFocused: React.Dispatch<React.SetStateAction<boolean>>
    setColTitle: React.Dispatch<React.SetStateAction<string>>
    changeColName: (column: Column, updatedName: string) => void
    deleteColumn: (columnUuid: string) => void
}

const ColumnHeader = ({
    titleFocused,
    column,
    colTitle,
    columnInputRef,
    index,
    setTitleFocused,
    setColTitle,
    changeColName,
    deleteColumn,
}: ColumnHeaderProps) => (
    <div>
        <input
            className={`text-base font-bold hover:cursor-pointer border-transparent rounded ${
                titleFocused ? 'bg-gray-200' : 'bg-zinc-50'
            }`}
            ref={columnInputRef}
            type="text"
            onMouseUp={() => {
                setTitleFocused(true)
                columnInputRef.current?.focus()
            }}
            onBlur={() => {
                setTitleFocused(false)

                if (colTitle) {
                    changeColName(column, colTitle)
                }
            }}
            value={colTitle}
            onChange={(e) => {
                setColTitle(e.target.value)
            }}
            onKeyPress={(e) => {
                if (e.key === 'Enter' && colTitle) {
                    changeColName(column, colTitle)
                    columnInputRef.current?.blur()
                }
            }}
            onKeyUp={(e) =>
                e.key === 'Escape' && columnInputRef.current?.blur()
            }
        />
        <span
            data-test-id={`delete-column-${index}`}
            className="ml-1"
            onClick={() => deleteColumn(column.column_uuid)}
        >
            &#x2716;
        </span>
    </div>
)

const ColumnContainer: React.FC<ColumnProps> = ({
    column,
    cards,
    index,
    changeColName,
    deleteColumn,
    sendBoardWsMsg,
}) => {
    const [titleFocused, setTitleFocused] = useState(false)
    const [colTitle, setColTitle] = useState(column.column_name)
    const columnInputRef = useRef<HTMLInputElement>(null)
    const addRef = useRef<HTMLTextAreaElement>(null)

    const { newCardName, handleNewCardInput, createNewCard, deleteCard } =
        useCardDataHandling({
            sendBoardWsMsg,
        })

    return (
        <Draggable
            draggableId={column.column_uuid}
            index={index}
            disableInteractiveElementBlocking={!titleFocused}
        >
            {(provided) => (
                <div
                    className="m-3 p-2 flex flex-col border rounded border-solid border-slate-400 bg-zinc-50"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div
                        className="p-2 justify-between items-center hover:cursor-pointer"
                        {...provided.dragHandleProps}
                    >
                        <ColumnHeader
                            index={index}
                            column={column}
                            columnInputRef={columnInputRef}
                            colTitle={colTitle}
                            setColTitle={setColTitle}
                            titleFocused={titleFocused}
                            setTitleFocused={setTitleFocused}
                            changeColName={changeColName}
                            deleteColumn={deleteColumn}
                        />
                    </div>
                    <Droppable droppableId={column.column_uuid} type="card">
                        {(provided) => (
                            <div
                                className="px-3"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="grid place-items-center mb-3">
                                    <AddComponent
                                        addRef={addRef}
                                        name="add card"
                                        value={newCardName}
                                        placeholder="Add card & press enter"
                                        onInputChange={handleNewCardInput}
                                        onKeyPress={(e) =>
                                            createNewCard(e, column)
                                        }
                                    />
                                </div>
                                <CardList
                                    cards={cards}
                                    deleteCard={deleteCard}
                                />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

const ColumnComponent = memo(ColumnContainer, (props, nextProps) => {
    if (nextProps.column === props.column && nextProps.index === props.index) {
        return true
    }
    return false
})

export default ColumnComponent
