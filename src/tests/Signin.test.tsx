import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { store } from '../state/store'
import Signin from '../pages/Signin'

it('should render sign in page', () => {
    const { queryByTitle } = render(<Provider store={store}><Signin isAuthenticated={false} /></Provider>)
    const usernameInput = queryByTitle('usernameInput')
    const passwordInput = queryByTitle('passwordInput')
    const signInBtn = queryByTitle('signinBtn')

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signInBtn).toBeInTheDocument()
})
