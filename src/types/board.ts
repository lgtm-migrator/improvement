import { CardCreatePayload, CardData, CardDeletePayload } from 'types/card'
import {
    Column,
    ColumnCreate,
    ColumnUpdate,
    ColumnDelete,
    ColumnCardOrder,
    CardAndCardOrderInColumns,
} from 'types/column'

export type BoardColumns = { [columnUuid: string]: Column }

export type BoardCards = { [columnUuid: string]: CardData[] }

export type BoardData = {
    column_order: string[]
    columns: BoardColumns
    cards: BoardCards
}

export type BoardColumnCreate = {
    crud: 'create'
    data: ColumnCreate
}

export type BoardColumnUpdate = {
    crud: 'update'
    data: ColumnUpdate
}

export type BoardColumnDelete = {
    crud: 'delete'
    data: ColumnDelete
}

export type BoardColumnCardOrder = {
    crud: 'update-card-order'
    data: ColumnCardOrder
}

export type BoardCardAndCardOrderInColumns = {
    crud: 'update-card-and-order-in-columns'
    data: CardAndCardOrderInColumns
}

export type BoardDndNoUpdate = {
    crud: 'noUpdate'
    data?: undefined
}

export type BoardDndFail = {
    crud: 'dndFailure'
    data?: undefined
}

export type BoardDndReturnType =
    | BoardColumnUpdate
    | BoardColumnCardOrder
    | BoardCardAndCardOrderInColumns
    | BoardDndNoUpdate
    | BoardDndFail

export type BoardColumnCreatePayload = {
    target: 'column'
} & BoardColumnCreate

export type BoardColumnUpdatePayload = {
    target: 'column'
} & BoardColumnUpdate

export type BoardColumnDeletePayload = {
    target: 'column'
} & BoardColumnDelete

export type BoardColumnCardOrderPayload = {
    target: 'column'
} & BoardColumnCardOrder

export type BoardCardAndCardOrderInColumnsPayload = {
    target: 'column'
} & BoardCardAndCardOrderInColumns

export type SendBoardJson =
    | BoardColumnCreatePayload
    | BoardColumnUpdatePayload
    | BoardColumnDeletePayload
    | BoardColumnCardOrderPayload
    | BoardCardAndCardOrderInColumnsPayload
    | CardCreatePayload
    | CardDeletePayload

export type SendBoardJsonMsg = (jsonMsg: SendBoardJson) => void

export type BoardWSHookProps = {
    sendMessage: (message: string) => void
    sendJsonMessage: SendBoardJsonMsg
    lastJsonMessage: BoardData
    readyState: number
}
