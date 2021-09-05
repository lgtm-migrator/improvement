/* eslint-disable camelcase */
import { Column, ColumnCreate, ColumnUpdate, ColumnDelete } from './column'

export type BoardData = {
    column_order: string[]
    columns: Column[]
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

export type SendBoardJson =
    | BoardColumnCreate
    | BoardColumnUpdate
    | BoardColumnDelete
