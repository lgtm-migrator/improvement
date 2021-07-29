import React, { ReactElement } from 'react'
import { Menu } from '@headlessui/react'

import { bindActionCreators } from '@reduxjs/toolkit'

import { authActions } from '../state/actions'
import { useAppDispatch } from '../state/hooks'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const SignoutBtn = (): ReactElement => {
    const dispatch = useAppDispatch()
    const { logout } = bindActionCreators(authActions, dispatch)

    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    type="button"
                    onClick={logout}
                    className={classNames(
                        active ? 'bg-gray-100' : '',
                        'flex py-2 px-4 text-sm text-gray-700 w-full'
                    )}
                >
                    Sign out
                </button>
            )}
        </Menu.Item>
    )
}

export default SignoutBtn
