import React, { useState } from 'react'

import { UserDbBase } from '../client/generatedApiClient'
import HeaderNavSignedIn from './HeaderNavSignedIn'
import SidebarNav from './SidebarNav'
import MobileMenu from './MobileMenu'

const NavSignedIn: React.FC<{ user: UserDbBase }> = ({ user, children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar navigation */}
            <SidebarNav />

            {/* Mobile menu dialog */}
            <MobileMenu
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <HeaderNavSignedIn
                    user={user}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
                {children}
            </div>
        </div>
    )
}

export default NavSignedIn
