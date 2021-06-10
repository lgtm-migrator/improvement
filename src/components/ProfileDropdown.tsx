import React, { Fragment, ReactElement } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { SignoutBtn } from './SignoutBtn'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export type ProfileMenuItemsType = {
    user: { name: string; email: string; imageUrl: string }
    userNavigation: { name: string; href: string }[]
}

const ProfileDropdown: React.FC<ProfileMenuItemsType> = ({
    user,
    userNavigation,
}): ReactElement => {
    return (
        <Menu
            as="div"
            id="profiledropdown"
            className="flex-shrink-0 relative ml-5"
        >
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src={user.imageUrl}
                                alt=""
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            static
                            className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                        >
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block py-2 px-4 text-sm text-gray-700'
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                            <SignoutBtn />
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

export default ProfileDropdown