import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { store } from '../state/store'
import Signup from '../pages/Signup'

it('should render sign up page', () => {
    const { queryByTitle } = render(<Provider store={store}><Signup isAuthenticated={false} /></Provider>)
    const usernameInput = queryByTitle('usernameInput')
    const passwordInput = queryByTitle('passwordInput')
    const signUpBtn = queryByTitle('signupBtn')

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signUpBtn).toBeInTheDocument()
})
