import React, { ReactElement } from 'react'

import { UserState } from '../types/user'
import NavSignedOut from './NavSignedOut'
import NavSignedIn from './NavSignedIn'

const Navbar: React.FC<UserState> = ({
    isAuthenticated,
    user,
}): ReactElement => {
    if (!isAuthenticated) {
        return <NavSignedOut />
    }

    return <NavSignedIn user={user} />
}

export default Navbar
