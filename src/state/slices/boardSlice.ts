import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardData } from 'types/card'
import { BoardCards, BoardColumns } from 'types/board'
import { Column } from 'types/column'

export type BoardState = {
    columnOrder: string[]
    columns: BoardColumns
    cards: BoardCards
}

type TwoColCardsPayload = {
    card: CardData | undefined
    sourceColumn: Column
    sourceColCardOrder: string[]
    destinationColumn: Column
    destinationColCardOrder: string[]
}

const initialState: BoardState = { columnOrder: [], columns: {}, cards: {} }

const sortCardsByNewOrder = (cards: CardData[], newCardOrder: string[]) =>
    cards.sort(
        (card1, card2) =>
            newCardOrder.indexOf(card1.card_uuid) -
            newCardOrder.indexOf(card2.card_uuid)
    )

const boardSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setBoard(_, action: PayloadAction<BoardState>) {
            return action.payload
        },
        setBoardColOrder(
            state,
            action: PayloadAction<{ columnOrder: string[] }>
        ) {
            state.columnOrder = action.payload.columnOrder
        },
        setBoardColumns(state, action: PayloadAction<BoardColumns>) {
            state.columns = action.payload
        },
        setBoardCards(state, action: PayloadAction<BoardCards>) {
            state.cards = action.payload
        },
        setSingleColCards(
            state,
            action: PayloadAction<{ column: Column; cardOrder: string[] }>
        ) {
            const column = action.payload.column
            const colUuid = column.column_uuid
            const newColCardOrder = action.payload.cardOrder

            const currentColCards = Array.from(state.cards[colUuid] ?? [])

            const updatedColCards = currentColCards
                ? sortCardsByNewOrder(currentColCards, newColCardOrder)
                : []

            state.columns[colUuid] = { ...column, card_order: newColCardOrder }
            state.cards[colUuid] = updatedColCards
        },
        setTwoColCards(state, action: PayloadAction<TwoColCardsPayload>) {
            const cardPayload = action.payload.card

            // get data for source col state updates
            const sourceCol = action.payload.sourceColumn
            const sourceColUuid = sourceCol.column_uuid
            const sourceColCardOrder = action.payload.sourceColCardOrder

            const currentSrcColCards = Array.from(
                state.cards[sourceColUuid] ?? []
            )

            // remove card from source column cards
            const updatedSrcColCards = cardPayload
                ? currentSrcColCards.filter(
                      (card) => card.card_uuid !== cardPayload.card_uuid
                  )
                : currentSrcColCards

            // get data for dest col state updates
            const destCol = action.payload.destinationColumn
            const destColUuid = destCol.column_uuid
            const destColCardOrder = action.payload.destinationColCardOrder

            const currentDestColCards = Array.from(
                state.cards[destColUuid] ?? []
            )

            // update card with new column uuid
            const updatedCard = cardPayload && {
                ...cardPayload,
                column_uuid: destColUuid,
            }

            // add updated card to dest col cards
            const destColCardsWithNewCard = updatedCard && [
                ...currentDestColCards,
                updatedCard,
            ]

            // sort dest col cards with the newly added card and sort order
            const updatedDestColCards = destColCardsWithNewCard
                ? sortCardsByNewOrder(destColCardsWithNewCard, destColCardOrder)
                : currentDestColCards

            // finally update all changes to state
            state.columns[sourceColUuid] = {
                ...sourceCol,
                card_order: sourceColCardOrder,
            }
            state.cards[sourceColUuid] = updatedSrcColCards

            state.columns[destColUuid] = {
                ...destCol,
                card_order: destColCardOrder,
            }
            state.cards[destColUuid] = updatedDestColCards
        },
        clearBoard() {
            return initialState
        },
    },
})

export const {
    setBoard,
    setBoardColOrder,
    setBoardColumns,
    setBoardCards,
    setSingleColCards,
    setTwoColCards,
    clearBoard,
} = boardSlice.actions
export const boardActions = boardSlice.actions
export default boardSlice.reducer
