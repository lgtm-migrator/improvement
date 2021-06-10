import React, { ReactElement } from 'react'
import { Menu } from '@headlessui/react'

const handleLogout = () => {
    localStorage.removeItem('accessToken')
    window.location.reload()
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const SignoutBtn = (): ReactElement => (
    <Menu.Item>
        {({ active }) => (
            <button
                type="button"
                onClick={handleLogout}
                className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block py-2 px-4 text-sm text-gray-700'
                )}
            >
                Sign out
            </button>
        )}
    </Menu.Item>
)

const MobileSignoutBtn = (): ReactElement => (
    <button
        type="button"
        onClick={handleLogout}
        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    >
        Sign out
    </button>
)

export { SignoutBtn, MobileSignoutBtn }
