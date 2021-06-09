import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Signup from '../pages/Signup'

it('should render sign up', () => {
    const { queryByTitle } = render(<Signup />)
    const usernameInput = queryByTitle('usernameInput')
    const passwordInput = queryByTitle('passwordInput')
    const signUpBtn = queryByTitle('signupBtn')

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signUpBtn).toBeInTheDocument()
})

it('should sign up a new user', () => {
    const { queryByTitle } = render(<Signup />)
    const usernameInput = queryByTitle('usernameInput')
    const passwordInput = queryByTitle('passwordInput')
    const signUpBtn = queryByTitle('signupBtn')

    if (usernameInput && passwordInput && signUpBtn) {
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })
        fireEvent.click(signUpBtn)
    } else {
        throw new Error('one of the sign up inputs is missing')
    }

    const dashboard = screen.getByTitle('dashboard')
    expect(dashboard).toBeInTheDocument()
})
