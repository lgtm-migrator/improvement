import React, { ReactElement } from 'react'
import { MenuAlt2Icon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

import { User } from 'client/codegen/generatedApi'
import styles from './HeaderNavSignedIn.styles'
import ProfileDropdown from './ProfileDropdown'

const userNavigation = [{ name: 'Your Profile', href: '#' }]

const HeaderNavSignedIn: React.FC<{
    user: User | undefined
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ user, setMobileMenuOpen }): ReactElement => {
    return user ? (
        <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                <button
                    type="button"
                    className={styles.openMobileMenuBtn}
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 flex justify-between px-4 sm:px-6">
                    <div className="flex-1 flex">
                        <form
                            className="w-full flex md:ml-0"
                            action="#"
                            method="GET"
                        >
                            <label htmlFor="search_field" className="sr-only">
                                Search all files
                            </label>
                            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                    <SearchIcon
                                        className="flex-shrink-0 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    name="search_field"
                                    id="search_field"
                                    className={styles.searchInput}
                                    placeholder="Search"
                                    type="search"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                        {/* Profile dropdown */}
                        <ProfileDropdown
                            user={user}
                            userNavigation={userNavigation}
                        />
                    </div>
                </div>
            </div>
        </header>
    ) : (
        <></>
    )
}

export default HeaderNavSignedIn
