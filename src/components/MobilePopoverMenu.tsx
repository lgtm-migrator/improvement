import React, { ReactElement } from 'react'
import { Popover } from '@headlessui/react'

import { ProfileMenuItemsType } from '../types/user'
import { MobileSignoutBtn } from './SignoutBtn'
import styles from './MobilePopoverMenu.styles'

const MobilePopoverMenu: React.FC<ProfileMenuItemsType> = ({
    user,
    userNavigation,
}): ReactElement => {
    return (
        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className={styles.container}>
                <div className={styles.profileContainer}>
                    <div className="flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                        />
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                            {user.username}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {user.email}
                        </div>
                    </div>
                </div>
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                    {userNavigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={styles.userNavLink}
                        >
                            {item.name}
                        </a>
                    ))}
                    <MobileSignoutBtn />
                </div>
            </div>
        </Popover.Panel>
    )
}

export default MobilePopoverMenu
