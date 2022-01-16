import { useCallback, useEffect, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'

import { SendBoardJsonMsg } from 'types/board'
import {
    CardAndCardOrderInColumns,
    ColumnCardOrder,
    ColumnUpdate,
} from 'types/column'
import { handleBoardOnDragEnd } from 'utils/dnd'
import { useAppDispatch, useAppSelector } from 'state/hooks'

type Props = {
    boardUuid: string
    sendBoardWsMsg: SendBoardJsonMsg
}

type UseDropResult = DropResult | undefined

/**
 * Handles all the Drag and Drop (dnd) related logic, updates the results
 * first to redux state and then sends the updated data to backend through
 * sendBoardWsMsg which is passed to this hook from useBoardWebsocket hook.
 */
const useBoardDnd = ({ boardUuid, sendBoardWsMsg }: Props) => {
    const [dndDropResult, setDndDropResult] = useState<UseDropResult>(undefined)
    const boardData = useAppSelector((state) => state.board)
    const dispatch = useAppDispatch()

    const onBoardDragEnd = useCallback(
        (result: DropResult): void => {
            const { crud, data } = handleBoardOnDragEnd({
                result,
                boardUuid,
                boardData,
                dispatch,
            })

            if (crud === 'noUpdate') {
                return
            } else if (crud === 'update' && data) {
                return sendBoardWsMsg({
                    target: 'column',
                    crud,
                    data: data as ColumnUpdate,
                })
            } else if (crud === 'update-card-order' && data) {
                return sendBoardWsMsg({
                    target: 'column',
                    crud,
                    data: data as ColumnCardOrder,
                })
            } else if (crud === 'update-card-and-order-in-columns' && data) {
                return sendBoardWsMsg({
                    target: 'column',
                    crud,
                    data: data as CardAndCardOrderInColumns,
                })
            } else if (crud === 'dndFailure') {
                throw Error('DND handling failure!')
            }
        },
        [dndDropResult]
    )

    useEffect(() => {
        if (dndDropResult) {
            onBoardDragEnd(dndDropResult)
        }
    }, [dndDropResult])

    return { setDndDropResult }
}

export default useBoardDnd
