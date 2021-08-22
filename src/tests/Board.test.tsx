import React from 'react'
import { rest } from 'msw'
import { Route } from 'react-router-dom'

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
    })
]

setupMockServerForTests(handlers)

it('should render the requested Board name on the page', async () => {
    render(<Route path="/board/:boardUuid" component={Board} />, { renderOptions: { initialRoutes: [`/board/${existingBoardUuid}`] } })

    expect(await screen.findByText(/test board/i)).toBeInTheDocument()
})
