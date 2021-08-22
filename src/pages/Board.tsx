import React from 'react'
import { useParams } from 'react-router-dom'

import { useGetOneUserBoardQuery } from 'client/improvementApiClient'

type BoardParams = {
    boardUuid: string
}

const Board: React.FC = () => {
    const { boardUuid } = useParams<BoardParams>()
    const {
        data: board,
        isLoading,
        error,
    } = useGetOneUserBoardQuery({
        boardUuid,
    })

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error while trying to get the board</div>
    }
    if (board) {
        return <div>{board.boardName}</div>
    }
    return <div>Not found</div>
}

export default Board
