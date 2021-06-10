import React, { ReactElement } from 'react'

import NavSignedOut from './NavSignedOut'
import NavSignedIn from './NavSignedIn'

const Navbar: React.FC<{ isAuthenticated: boolean }> = ({
    isAuthenticated,
}): ReactElement => {
    if (!isAuthenticated) {
        return <NavSignedOut />
    }

    return <NavSignedIn />
}

export default Navbar
