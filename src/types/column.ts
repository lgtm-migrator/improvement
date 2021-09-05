/* eslint-disable camelcase */

export type Column = {
    column_uuid: string
    column_name: string
    board_uuid: string
}

export type NewColumn = {
    column_name: string
    board_uuid: string
}

export type ColumnCreate = {
    new_column: NewColumn
    column_order: string[]
}

export type ColumnUpdate = {
    updated_column: Column
    column_order: string[]
}

export type ColumnDelete = {
    column_uuid: string
    column_order: string[]
}
