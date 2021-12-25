import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { sidebarNavigation } from 'constants/navigation'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const SidebarNav = (): ReactElement => {
    const pathname = useLocation().pathname

    return (
        <div className="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
            <div className="w-full py-6 flex flex-col items-center">
                <div className="flex-shrink-0 flex items-center">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                        alt="improvement"
                    />
                </div>
                <div className="flex-1 mt-6 w-full px-2 space-y-1">
                    {sidebarNavigation.map((item) => {
                        const current = pathname.includes(item.to)

                        return (
                            <Link
                                key={item.name}
                                to={item.to}
                                className={classNames(
                                    current
                                        ? 'bg-indigo-800 text-white'
                                        : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                                    'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                                )}
                                aria-current={current ? 'page' : undefined}
                            >
                                <item.icon
                                    className={classNames(
                                        current
                                            ? 'text-white'
                                            : 'text-indigo-300 group-hover:text-white',
                                        'h-6 w-6'
                                    )}
                                    aria-hidden="true"
                                />
                                <span className="mt-2">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SidebarNav
