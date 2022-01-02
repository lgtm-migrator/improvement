import { ChangeEvent, useState, KeyboardEvent } from 'react'

import { SendBoardJsonMsg } from 'types/board'
import { Column } from 'types/column'
import { useAppSelector } from 'state/hooks'

type Props = {
    boardUuid: string
    sendBoardWsMsg: SendBoardJsonMsg
}

const useColumnDataHandling = ({ boardUuid, sendBoardWsMsg }: Props) => {
    const [newColumnName, setNewColumnName] = useState('')
    const boardData = useAppSelector((state) => state.board)

    const handleNewColInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewColumnName(e.target.value)
    }

    const handleColNameChange = (column: Column, updatedName: string) => {
        const data = {
            updated_column: { ...column, column_name: updatedName },
            column_order: boardData.columnOrder,
        }

        sendBoardWsMsg({
            target: 'column',
            crud: 'update',
            data,
        })
    }

    const createNewColumn = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const newColumn = {
                column_name: newColumnName,
                board_uuid: boardUuid,
            }
            const columnCreateData = {
                new_column: newColumn,
                column_order: boardData.columnOrder,
            }
            sendBoardWsMsg({
                target: 'column',
                crud: 'create',
                data: columnCreateData,
            })
            setNewColumnName('')
        }
    }

    const deleteColumn = (columnUuid: string) => {
        const updatedColumnOrder = boardData?.columnOrder.filter(
            (columnId) => columnId !== columnUuid
        )
        const columnDeletionData = {
            column_uuid: columnUuid,
            column_order: updatedColumnOrder,
        }
        sendBoardWsMsg({
            target: 'column',
            crud: 'delete',
            data: columnDeletionData,
        })
    }

    return {
        newColumnName,
        handleNewColInput,
        createNewColumn,
        handleColNameChange,
        deleteColumn,
    }
}

export default useColumnDataHandling
