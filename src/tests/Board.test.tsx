import React from 'react'
import { rest } from 'msw'
import { Route, Routes } from 'react-router-dom'

import { render, screen, setupMockServerForTests } from './utils/test-utils'
import { Board as BoardType } from '../client/improvementApiClient.generated'
import Board from '../pages/Board'

const existingBoardUuid = 'fb943da3-8442-4c68-99e9-0af47437788d'

const mockBoard: BoardType = {
    boardUuid: existingBoardUuid,
    boardName: 'test board',
    columnOrder: [],
    ownerUuid: '517c0d30-8557-48ae-bd87-f717265942a6',
}

export const handlers = [
    rest.get(`*/api/board/list/${existingBoardUuid}`, (_, res, ctx) => {
        return res(ctx.json(mockBoard), ctx.delay(150))
    }),
]

setupMockServerForTests(handlers)

// TODO: How to handle websocket mocking?
it('should render the requested Board name on the page', () => {
    render(
        <Routes>
            <Route path="/board/:pathId" element={<Board />} />
        </Routes>,
        {
            renderOptions: { initialRoutes: [`/board/${existingBoardUuid}`] },
        }
    )

    expect(screen.queryAllByText(/test board/i)).toBeTruthy()
})
