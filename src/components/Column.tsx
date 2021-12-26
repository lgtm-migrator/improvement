import React, { memo, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import type { Column } from 'types/column'

type ColumnProps = {
    column: Column | undefined
    index: number
    changeColName: (column: Column, updatedName: string) => void
    deleteColumn: (columnUuid: string) => void
}

const ColumnContainer: React.FC<ColumnProps> = ({
    column,
    index,
    changeColName,
    deleteColumn,
}) => {
    const [titleFocused, setTitleFocused] = useState(false)
    const [colTitle, setColTitle] = useState(column?.column_name)
    const columnInputRef = useRef<HTMLInputElement>(null)

    return column ? (
        <Draggable
            draggableId={column.column_uuid}
            index={index}
            disableInteractiveElementBlocking={!titleFocused}
        >
            {(provided) => {
                return (
                    <div
                        className="m-2 border rounded border-solid border-slate-400 bg-zinc-50"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div
                            className="p-2 flex justify-between items-center hover:cursor-pointer"
                            {...provided.dragHandleProps}
                        >
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
                            />
                            <span
                                className="ml-1"
                                onClick={() => deleteColumn(column.column_uuid)}
                            >
                                &#x2716;
                            </span>
                        </div>
                    </div>
                )
            }}
        </Draggable>
    ) : (
        <></>
    )
}

const ColumnComponent = memo(ColumnContainer, (props, nextProps) => {
    if (nextProps.column === props.column && nextProps.index === props.index) {
        return true
    }
    return false
})

export default ColumnComponent
