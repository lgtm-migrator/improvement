import React from 'react'
import { render } from '@testing-library/react'
import Signin from '../pages/Signin'

it('should render sign in page', () => {
    const { queryByTitle } = render(<Signin isAuthenticated={false} />)
    const usernameInput = queryByTitle('usernameInput')
    const passwordInput = queryByTitle('passwordInput')
    const signInBtn = queryByTitle('signinBtn')

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signInBtn).toBeInTheDocument()
})
