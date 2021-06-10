import React, { ReactElement } from 'react'
import { Redirect } from 'react-router-dom'

const Dashboard: React.FC<{ isAuthenticated: boolean }> = ({
    isAuthenticated,
}): ReactElement => {
    if (!isAuthenticated) {
        return <Redirect to="/signin" />
    }

    return (
        <div title="dashboard" className="grid place-items-center h-screen">
            <h2>Dashboard</h2>
        </div>
    )
}

export default Dashboard
