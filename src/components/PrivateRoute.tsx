import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { User } from 'client/improvementApiClient.generated'

type PrivateRouteProps = {
    user: User
    children: React.ReactNode
    path: string
    exact?: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    user,
    children,
    path,
    exact,
}) => {
    if (!user) {
        return <Redirect to="/signin" />
    }

    return (
        <Route path={path} exact={exact}>
            {children}
        </Route>
    )
}

export default PrivateRoute
