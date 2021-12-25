import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { User } from 'client/codegen/generatedApi'

type Props = { user: User | undefined }

const PrivateRoute = ({ user }: Props) => {
    return user ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute
