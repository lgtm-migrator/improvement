import React, { ReactElement } from 'react'

import styles from './Signup.styles'

const Signup = (): ReactElement => {
    return (
        <div className={styles.signUpContainer}>
            <div className={styles.logoAndHeaderContainer}>
                <img
                    className={styles.headerLogo}
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="improvement"
                />
                <h2 className={styles.headerTxt}>Sign up for your account</h2>
            </div>

            <div className={styles.signUpBoxContainer}>
                <div className={styles.signUpFormWrapper}>
                    <form
                        className={styles.signUpForm}
                        action="#"
                        method="POST"
                    >
                        <div>
                            <div>
                                <label
                                    htmlFor="username"
                                    className={styles.inputLabel}
                                >
                                    Username
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        title="usernameInput"
                                        required
                                        className={styles.usernameInput}
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className={styles.inputLabel}
                                >
                                    Password
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        title="passwordInput"
                                        required
                                        className={styles.passwordInput}
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                title="signupBtn"
                                className={styles.signUpSubmitBtn}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
