import React, { ReactElement } from 'react'

const Loader: React.FC<{ center?: boolean }> = ({ center }): ReactElement => {
    const circleCommonClasses = 'h-2.5 w-2.5 rounded-full bg-indigo-500'

    return (
        <div className={`${center && 'grid place-items-center h-screen'}`}>
            <div className="flex">
                <div className={`${circleCommonClasses} mr-1 animate-bounce`} />
                <div
                    className={`${circleCommonClasses} mr-1 animate-bounce200`}
                />
                <div className={`${circleCommonClasses} animate-bounce400`} />
            </div>
        </div>
    )
}

export default Loader
