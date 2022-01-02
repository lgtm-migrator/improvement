/* eslint-disable camelcase */

export type CardData = {
    card_uuid: string
    card_name: string
    card_description: string
    column_uuid: string
    board_uuid: string
}

export type CardCreate = {
    column_uuid: string
    card_name: string
}

export type CardCreateData = {
    new_card: CardCreate
    column_card_order: string[]
}

export type CardCreatePayload = {
    target: 'card'
    crud: 'create'
    data: CardCreateData
}

export type CardDelete = {
    card_uuid: string
    column_uuid: string
}

export type CardDeleteData = {
    delete_card: CardDelete
    column_card_order: string[]
}

export type CardDeletePayload = {
    target: 'card'
    crud: 'delete'
    data: CardDeleteData
}
