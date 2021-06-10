/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FormEvent, ReactElement, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Redirect } from 'react-router-dom'

import styles from './Signin.styles'

import { handleLogin } from '../requests/auth'

const onLoginSubmit = (
    event: FormEvent,
    username: string,
    password: string
): void => {
    event.preventDefault()
    handleLogin(username, password).then((data) => {
        localStorage.setItem('accessToken', data.access_token)
        window.location.reload()
    })
}

const Signin: React.FC<{ isAuthenticated: boolean }> = ({
    isAuthenticated,
}): ReactElement => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className={styles.signInContainer}>
            <div className={styles.logoAndHeaderContainer}>
                <div>
                    <img
                        className={styles.headerLogo}
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className={styles.headerText}>
                        Sign in to your account
                    </h2>
                </div>
                <form
                    className={styles.signInForm}
                    method="POST"
                    onSubmit={(event) =>
                        onLoginSubmit(event, username, password)
                    }
                >
                    <div className={styles.inputsContainer}>
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="username"
                                title="usernameInput"
                                autoComplete="username"
                                required
                                className={styles.usernameInputLabel}
                                placeholder="Username"
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                title="passwordInput"
                                autoComplete="current-password"
                                required
                                className={styles.passwordInputLabel}
                                placeholder="Password"
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={styles.signInSubmitBtn}
                            title="signinBtn"
                        >
                            <span className={styles.iconWrapper}>
                                <LockClosedIcon
                                    className={styles.lockIcon}
                                    aria-hidden="true"
                                />
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin