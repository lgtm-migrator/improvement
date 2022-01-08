import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

import { BoardWSHookProps } from 'types/board'
import { boardWebsocketBaseUrl } from 'constants/board'
import { handleWebsocketAuth } from 'utils/websocket'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setBoard, clearBoard } from 'state/slices/boardSlice'
import { authTokenSelector } from 'state/slices/authSlice'

const useBoardWebsocket = (boardUuid: string) => {
    const dispatch = useAppDispatch()
    const authToken = useAppSelector(authTokenSelector)
    const {
        sendJsonMessage,
        lastJsonMessage: boardData,
        sendMessage,
    }: BoardWSHookProps = useWebSocket(
        `${boardWebsocketBaseUrl}/${boardUuid}`,
        {
            onOpen: () => handleWebsocketAuth({ sendMessage, authToken }),
        }
    )

    useEffect(() => {
        if (boardData) {
            const board = {
                columnOrder: boardData.column_order ?? [],
                columns: boardData.columns ?? {},
                cards: boardData.cards ?? {},
            }
            dispatch(setBoard(board))
        }
    }, [boardData])

    useEffect(() => {
        return () => {
            dispatch(clearBoard())
        }
    }, [])

    return { sendBoardWsMsg: sendJsonMessage }
}

export default useBoardWebsocket
