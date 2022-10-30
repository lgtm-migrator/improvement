import React, { ReactElement } from 'react'
import { useLocation } from 'react-router'
import { Bars2Icon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import { User } from 'client/codegen/generatedApi'
import styles from 'components/HeaderNavSignedIn.styles'
import ProfileDropdown from 'components/ProfileDropdown'
import { useAppDispatch } from 'state/hooks'
import { setSearch } from 'state/slices/searchSlice'

type UserNav = {
    name: string
    href: string
}[]

// const userNavigation = [{ name: 'Your Profile', href: '#' }]
const userNavigation: UserNav = []

const HeaderNavSignedIn: React.FC<{
    user: User | undefined
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ user, setMobileMenuOpen }): ReactElement => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const isDashboard =
        location.pathname === '/dashboard' || location.pathname === '/'

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setSearch(e.target.value))

    return user ? (
        <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                <button
                    type="button"
                    className={styles.openMobileMenuBtn}
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars2Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 flex justify-between px-4 sm:px-6">
                    <div className="flex-1 flex">
                        <form
                            className="w-full flex md:ml-0"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label htmlFor="search_field" className="sr-only">
                                Search all files
                            </label>
                            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                    <MagnifyingGlassIcon
                                        className="flex-shrink-0 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    name="search_field"
                                    id="search_field"
                                    className={styles.searchInput}
                                    placeholder={`Search ${
                                        isDashboard ? 'boards...' : 'columns...'
                                    }`}
                                    type="search"
                                    onInput={handleSearch}
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
