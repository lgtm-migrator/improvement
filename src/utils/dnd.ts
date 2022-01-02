import { DraggableLocation, DropResult } from 'react-beautiful-dnd'

import { Column } from 'types/column'
import { BoardDndReturnType } from 'types/board'
import {
    BoardState,
    setBoardColOrder,
    setSingleColCards,
    setTwoColCards,
} from 'state/slices/boardSlice'
import { AppDispatch } from 'state/store'

type ColumnDnd = {
    columnOrder: string[]
    colUuid: string
    destination: DraggableLocation
}

type MultiColsAndCardDND = {
    sourceColumn: Column
    destinationColumn: Column
    destination: DraggableLocation
    source: DraggableLocation
    cardUuid: string
}

type SingleColumnCardDnd = {
    cardUuid: string
    columnCardOrder: string[]
    srcIdx: number
    destIdx: number
}

export const handleColumnDnd = ({
    columnOrder,
    colUuid,
    destination,
}: ColumnDnd) => {
    const newColumnOrder = columnOrder
    const currentColIdx = newColumnOrder.indexOf(colUuid)

    // remove column from old spot and move to new
    newColumnOrder.splice(currentColIdx, 1)
    newColumnOrder.splice(destination.index, 0, colUuid)

    return { newColumnOrder }
}

export const handleSingleColumnCardDnd = ({
    cardUuid,
    columnCardOrder,
    srcIdx,
    destIdx,
}: SingleColumnCardDnd) => {
    const updatedCardIds = columnCardOrder

    // remove card from old spot and move to new
    updatedCardIds.splice(srcIdx, 1)
    updatedCardIds.splice(destIdx, 0, cardUuid)

    return { newCardOrder: updatedCardIds }
}

export const handleCardDndBetweenColumns = ({
    sourceColumn,
    destinationColumn,
    source,
    destination,
    cardUuid,
}: MultiColsAndCardDND) => {
    const sourceColCardIds = Array.from(sourceColumn.card_order ?? [])
    const destinationColCardIds = Array.from(destinationColumn.card_order ?? [])

    sourceColCardIds.splice(source.index, 1)
    destinationColCardIds.splice(destination.index, 0, cardUuid)

    return {
        cardUuid,
        sourceColUuid: sourceColumn.column_uuid,
        destinationColUuid: destinationColumn.column_uuid,
        sourceColCardOrder: sourceColCardIds,
        destinationColCardOrder: destinationColCardIds,
    }
}

type BoardOnDragEnd = {
    result: DropResult
    boardUuid: string
    boardData: BoardState
    dispatch: AppDispatch
}

export const handleBoardOnDragEnd = ({
    result,
    boardUuid,
    boardData,
    dispatch,
}: BoardOnDragEnd): BoardDndReturnType => {
    const { draggableId, source, destination, type } = result

    const noChange =
        !destination ||
        (destination.droppableId === source.droppableId &&
            destination.index === source.index)

    if (noChange) return { crud: 'noUpdate' }

    // MOVING COLUMNS
    if (type === 'column') {
        const columnOrder = Array.from(boardData.columnOrder)
        const { newColumnOrder } = handleColumnDnd({
            columnOrder,
            colUuid: draggableId,
            destination,
        })

        const updatedColumn = {
            column_uuid: draggableId,
            column_name: boardData.columns[draggableId].column_name,
            board_uuid: boardUuid,
        }

        const columnUpdateData = {
            updated_column: updatedColumn,
            column_order: newColumnOrder,
        }

        dispatch(setBoardColOrder({ columnOrder: newColumnOrder }))

        return { crud: 'update', data: columnUpdateData }
    }

    const movingCardsInSameCol =
        type === 'card' && source.droppableId === destination.droppableId

    // MOVING CARDS - In the same column
    if (movingCardsInSameCol) {
        const column = Object.assign(
            {},
            boardData?.columns[source.droppableId] ?? {}
        )
        const columnUuid = column.column_uuid
        const columnCardOrder = Array.from(column.card_order ?? [])
        const srcIdx = source.index
        const destIdx = destination.index

        const { newCardOrder } = handleSingleColumnCardDnd({
            cardUuid: draggableId,
            columnCardOrder,
            srcIdx,
            destIdx,
        })

        dispatch(setSingleColCards({ column, cardOrder: newCardOrder }))

        const data = { column_uuid: columnUuid, card_order: newCardOrder }

        return { crud: 'update-card-order', data }
    }

    // MOVING CARDS - from one column to another
    if (type === 'card') {
        const columns = Object.assign({}, boardData.columns)
        const sourceColumn = Object.assign({}, columns[source.droppableId])
        const destinationColumn = Object.assign(
            {},
            columns[destination.droppableId]
        )
        const card = boardData.cards[sourceColumn.column_uuid].find(
            (card) => card.card_uuid === draggableId
        )

        const {
            cardUuid,
            sourceColUuid,
            destinationColUuid,
            sourceColCardOrder,
            destinationColCardOrder,
        } = handleCardDndBetweenColumns({
            sourceColumn,
            destinationColumn,
            source,
            destination,
            cardUuid: draggableId,
        })

        dispatch(
            setTwoColCards({
                card,
                sourceColumn,
                sourceColCardOrder,
                destinationColumn,
                destinationColCardOrder,
            })
        )

        const data = {
            card_uuid: cardUuid,
            source_column_uuid: sourceColUuid,
            destination_column_uuid: destinationColUuid,
            source_col_card_order: sourceColCardOrder,
            destination_col_card_order: destinationColCardOrder,
        }

        return { crud: 'update-card-and-order-in-columns', data }
    }

    return { crud: 'dndFailure' }
}
