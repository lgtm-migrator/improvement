import React from 'react'
import { render } from '@testing-library/react'
import Signup from '../pages/Signup'

it('should render sign up', () => {
    const { queryByTitle } = render(<Signup isAuthenticated={false} />)
    const usernameInput = queryByTitle('usernameInput')
    const passwordInput = queryByTitle('passwordInput')
    const signUpBtn = queryByTitle('signupBtn')

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signUpBtn).toBeInTheDocument()
})
