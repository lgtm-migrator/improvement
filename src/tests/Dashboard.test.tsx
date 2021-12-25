import React from 'react'
import { render } from './utils/test-utils'

import Dashboard from '../pages/Dashboard'
import { Route, Routes } from 'react-router-dom'

it('should render the dashboard page', () => {
    const { queryByTitle } = render(
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>,
        { renderOptions: { initialRoutes: ['/dashboard'] } }
    )
    const dashboard = queryByTitle('dashboard')

    expect(dashboard).toBeInTheDocument()
})
