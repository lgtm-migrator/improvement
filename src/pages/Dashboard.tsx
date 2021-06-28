import React, { ReactElement } from 'react'

const Dashboard = (): ReactElement => {
    return (
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
                </section>
            </main>
        </div>
    )
}

export default Dashboard
