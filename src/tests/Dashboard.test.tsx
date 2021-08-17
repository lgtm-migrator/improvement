import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { User } from '../client/improvementApiClient.generated'
import { store } from '../state/store'
import Dashboard from '../pages/Dashboard'

const mockUser: User = {
    userUuid: '123',
    username: 'test user',
    createdAt: '123',
    updatedAt: '123'
}

it('should render the dashboard page', () => {
    const { queryByTitle } = render(<Provider store={store}><Dashboard user={mockUser} /></Provider>)
    const dashboard = queryByTitle('dashboard')

    expect(dashboard).toBeInTheDocument()
})
