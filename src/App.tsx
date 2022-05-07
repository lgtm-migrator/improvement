import React, { ReactElement, Suspense, useState, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useCurrentUserQuery } from 'client/api'
import useModalNavigation from 'hooks/useModalNavigation'
import useToastHandler from 'hooks/useToastHandler'

import NavSignedOut from 'components/NavSignedOut'
import ToastContainer from 'components/overlays/Toast'
import Loader from 'components/elements/Loader'
import PrivateRoute from 'components/PrivateRoute'
import ModalProvider from 'src/components/ModalProvider'
import SidebarNav from 'components/SidebarNav'
import HeaderNavSignedIn from 'components/HeaderNavSignedIn'
import MobileMenu from 'components/MobileMenu'
import ModalRoute from 'components/ModalRoute'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Board = lazy(() => import('./pages/Board'))
const Signup = lazy(() => import('./pages/Signup'))
const Signin = lazy(() => import('./pages/Signin'))
const FourOhFour = lazy(() => import('./pages/FourOhFour'))

const App: React.FC = (): ReactElement => {
    const { data: user, isLoading, isFetching } = useCurrentUserQuery()
    const loading = isLoading || isFetching
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { modalOpen, modalRoute } = useModalNavigation()
    useToastHandler()

    return (
        <div className={user && 'h-screen bg-gray-50 flex overflow-hidden'}>
            <ToastContainer />
            {loading && <Loader center />}

            {!loading && !user && <NavSignedOut />}

            {user && <SidebarNav />}
            {user && (
                <MobileMenu
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
            )}

            {!loading && (
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Suspense fallback={<Loader center />}>
                        <HeaderNavSignedIn
                            user={user}
                            setMobileMenuOpen={setMobileMenuOpen}
                        />
                        <Routes>
                            <Route
                                path={modalRoute}
                                element={<ModalRoute open={modalOpen} />}
                            >
                                <Route
                                    path={modalRoute}
                                    element={
                                        <ModalProvider
                                            userUuid={user?.userUuid}
                                        />
                                    }
                                />
                            </Route>
                            {['/', '/dashboard'].map((path, idx) => (
                                <Route
                                    key={`${path}-${idx}`}
                                    path={path}
                                    element={<PrivateRoute user={user} />}
                                >
                                    <Route
                                        path={path}
                                        element={<Dashboard />}
                                    />
                                </Route>
                            ))}
                            <Route
                                path="/board/:pathId"
                                element={<PrivateRoute user={user} />}
                            >
                                <Route
                                    path="/board/:pathId"
                                    element={<Board />}
                                />
                            </Route>
                            <Route
                                path="/signup"
                                element={<Signup isAuthenticated={!!user} />}
                            />
                            <Route
                                path="/signin"
                                element={<Signin isAuthenticated={!!user} />}
                            />
                            <Route
                                path="/404"
                                element={<FourOhFour user={user} />}
                            />
                            <Route
                                path="*"
                                element={<FourOhFour user={user} />}
                            />
                        </Routes>
                    </Suspense>
                </div>
            )}
        </div>
    )
}

export default App
