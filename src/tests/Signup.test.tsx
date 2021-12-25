import React from 'react'

import Signup from '../pages/Signup'
import { render } from './utils/test-utils'

it('should render sign up page', () => {
    const { queryByTitle } = render(<Signup isAuthenticated={false} />)
    const usernameInput = queryByTitle('usernameInput')
    const passwordInput = queryByTitle('passwordInput')
    const signUpBtn = queryByTitle('signupBtn')

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signUpBtn).toBeInTheDocument()
})
