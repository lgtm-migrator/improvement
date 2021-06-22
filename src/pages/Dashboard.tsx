import React, { ReactElement, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { User } from '../types/user'
import HeaderNavSignedIn from '../components/HeaderNavSignedIn'
import SidebarNav from '../components/SidebarNav'
import MobileMenu from '../components/MobileMenu'

const Dashboard: React.FC<{ isAuthenticated: boolean; user: User }> = ({
    user,
    isAuthenticated,
}): ReactElement => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    if (!isAuthenticated) {
        return <Redirect to="/signin" />
    }

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar navigation */}
            <SidebarNav />

            {/* Mobile menu dialog */}
            <MobileMenu
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <HeaderNavSignedIn
                    user={user}
                    setMobileMenuOpen={setMobileMenuOpen}
                />

                {/* Main content */}
                <div className="flex-1 flex items-stretch overflow-hidden">
                    <main className="flex-1 overflow-y-auto">
                        <section
                            aria-labelledby="primary-heading"
                            className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
                        >
                            <h1
                                id="primary-heading"
                                className="grid place-items-center h-screen"
                            >
                                Dashboard
                            </h1>
                            {/* Your content */}
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
