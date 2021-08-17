import { User } from 'client/improvementApiClient.generated'
import Boards from 'components/Boards'
import React from 'react'

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="flex-1 flex items-stretch overflow-hidden">
            <main title="dashboard" className="flex-1 overflow-y-auto">
                <section
                    aria-labelledby="primary-heading"
                    className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
                >
                    <Boards userUuid={user.userUuid} />
                </section>
            </main>
        </div>
    )
}

export default Dashboard
