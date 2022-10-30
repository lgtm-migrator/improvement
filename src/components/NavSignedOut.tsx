import React, { Fragment, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import styles from './NavSignedOut.styles'

const NavSignedOut: React.FC = (): ReactElement => {
    return (
        <header>
            <Popover className="relative bg-white">
                {({ open }) => (
                    <>
                        <div className={styles.headerItemsContainer}>
                            <div className="flex justify-start lg:w-0 lg:flex-1">
                                <Link to="/">
                                    <span className="sr-only">improvement</span>
                                    <img
                                        className="h-8 w-auto sm:h-10"
                                        // eslint-disable-next-line max-len
                                        src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="-mr-2 -my-2 md:hidden">
                                <Popover.Button
                                    className={styles.mobilePopoverBtn}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </Popover.Button>
                            </div>
                            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                <Link
                                    to="/signin"
                                    className={styles.signInLink}
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/signup"
                                    className={styles.signUpLink}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>

                        <Transition
                            show={open}
                            as={Fragment}
                            enter="duration-200 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-100 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Popover.Panel
                                focus
                                static
                                className={styles.mobilePopoverPanel}
                            >
                                <div className={styles.mobilePopoverContainer}>
                                    <div className="pt-5 pb-6 px-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <img
                                                    className="h-8 w-auto"
                                                    // eslint-disable-next-line max-len
                                                    src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg"
                                                    alt="Workflow"
                                                />
                                            </div>
                                            <div className="-mr-2">
                                                <Popover.Button
                                                    className={
                                                        styles.mobileCloseMenu
                                                    }
                                                >
                                                    <span className="sr-only">
                                                        Close menu
                                                    </span>
                                                    <XMarkIcon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </Popover.Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-6 px-5">
                                        <div className="mt-6">
                                            <Link
                                                to="/signup"
                                                className={
                                                    styles.mobileSignupLink
                                                }
                                            >
                                                Sign up
                                            </Link>
                                            <Link
                                                to="/signin"
                                                className={
                                                    styles.mobileSigninLink
                                                }
                                            >
                                                Sign in
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </header>
    )
}

export default NavSignedOut
