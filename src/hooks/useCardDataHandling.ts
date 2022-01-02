import { ChangeEvent, useState, KeyboardEvent } from 'react'

import { SendBoardJsonMsg } from 'types/board'
import { Column } from 'types/column'
import { useAppSelector } from 'state/hooks'

type Props = {
    sendBoardWsMsg: SendBoardJsonMsg
}

const useCardDataHandling = ({ sendBoardWsMsg }: Props) => {
    const [newCardName, setNewCardName] = useState('')
    const boardData = useAppSelector((state) => state.board)

    const handleNewCardInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewCardName(e.target.value)
    }

    // TODO: add handling for changing name / description
    // const handleCardNameOrDescriptionChange = (
    //     column: Column,
    //     updatedName: string
    // ) => {
    //     const data = {
    //         updated_column: { ...column, column_name: updatedName },
    //         column_order: boardData.columnOrder,
    //     }

    //     sendBoardWsMsg({
    //         target: 'column',
    //         crud: 'update',
    //         data,
    //     })
    // }

    const createNewCard = (
        e: KeyboardEvent<HTMLTextAreaElement>,
        column: Column
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const data = {
                new_card: {
                    column_uuid: column.column_uuid,
                    card_name: newCardName,
                },
                column_card_order: column.card_order ?? [],
            }
            sendBoardWsMsg({
                target: 'card',
                crud: 'create',
                data,
            })
            setNewCardName('')
        }
    }

    const deleteCard = (columnUuid: string, cardUuid: string) => {
        const column = boardData?.columns[columnUuid]
        const updatedColumnCardOrder = column?.card_order?.filter(
            (uuid) => uuid !== cardUuid
        )

        const cardDelete = {
            card_uuid: cardUuid,
            column_uuid: columnUuid,
        }
        const data = {
            delete_card: cardDelete,
            column_card_order: updatedColumnCardOrder ?? [],
        }

        sendBoardWsMsg({
            target: 'card',
            crud: 'delete',
            data,
        })
    }

    return { newCardName, handleNewCardInput, createNewCard, deleteCard }
}

export default useCardDataHandling
