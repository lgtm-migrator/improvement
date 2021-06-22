import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Popover } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { User } from '../types/user'
import styles from './NavSignedIn.styles'
import ProfileDropdown from './ProfileDropdown'
import MobilePopoverMenu from './MobilePopoverMenu'

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const NavSignedIn: React.FC<{ user: User }> = ({ user }): ReactElement => {
    return (
        <>
            {/* 
                When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars 
            */}
            <Popover
                as="header"
                className={({ open }) =>
                    classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-white shadow-sm lg:static lg:overflow-y-visible'
                    )
                }
            >
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link to="/dashboard">
                                            <img
                                                className="block h-8 w-auto"
                                                // eslint-disable-next-line max-len
                                                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                                                alt="improvement"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                                    <div className={styles.searchContainer}>
                                        <div className="w-full">
                                            <label
                                                htmlFor="search"
                                                className="sr-only"
                                            >
                                                Search
                                            </label>
                                            <div className="relative">
                                                <div
                                                    className={
                                                        styles.searchIconWrapper
                                                    }
                                                >
                                                    <SearchIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <input
                                                    id="search"
                                                    name="search"
                                                    className={
                                                        styles.searchInput
                                                    }
                                                    placeholder="Search"
                                                    type="search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                                    {/* Mobile menu button */}
                                    <Popover.Button
                                        title="profiledropdown"
                                        className={styles.mobileMenuBtn}
                                    >
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        {open ? (
                                            <XIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Popover.Button>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                                    <ProfileDropdown
                                        user={user}
                                        userNavigation={userNavigation}
                                    />
                                </div>
                            </div>
                        </div>

                        <MobilePopoverMenu
                            user={user}
                            userNavigation={userNavigation}
                        />
                    </>
                )}
            </Popover>
        </>
    )
}

export default NavSignedIn
