import React, { ReactElement, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { useCurrentUserQuery } from 'client/api'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import {
    toast,
    successToast,
    errorToast,
    warningToast,
    infoToast,
} from 'utils/toast'

import Board from 'pages/Board'
import FourOhFour from 'pages/FourOhFour'
import NavSignedOut from 'components/NavSignedOut'
import ToastContainer from 'components/overlays/Toast'
import Signup from 'pages/Signup'
import Signin from 'pages/Signin'
import Dashboard from 'pages/Dashboard'
import Loader from 'components/elements/Loader'
import PrivateRoute from 'components/PrivateRoute'
import ModalProvider from 'src/components/ModalProvider'
import { modalSelector } from 'state/slices/modalSlice'
import SidebarNav from 'components/SidebarNav'
import HeaderNavSignedIn from './components/HeaderNavSignedIn'
import MobileMenu from './components/MobileMenu'
import ModalRoute from './components/ModalRoute'

const App: React.FC = (): ReactElement => {
    const { data: user, isLoading, isFetching } = useCurrentUserQuery()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const toastStatus = useAppSelector((state) => state.toast)
    const { modalOpen, modalRoute } = useAppSelector(modalSelector)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const loading = isLoading || isFetching

    useEffect(() => {
        if (modalOpen) {
            navigate(modalRoute)
        }
    }, [modalOpen])

    if (toastStatus.msg) {
        toast(toastStatus.msg, dispatch)
    }

    if (toastStatus.successMsg) {
        successToast(toastStatus.successMsg, dispatch)
    }

    if (toastStatus.errorMsg) {
        errorToast(toastStatus.errorMsg, dispatch)
    }

    if (toastStatus.warningMsg) {
        warningToast(toastStatus.warningMsg, dispatch)
    }

    if (toastStatus.infoMsg) {
        infoToast(toastStatus.infoMsg, dispatch)
    }

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
                                    <ModalProvider userUuid={user?.userUuid} />
                                }
                            />
                        </Route>
                        <Route
                            path="/dashboard"
                            element={<PrivateRoute user={user} />}
                        >
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                        <Route
                            path="/board/:pathId"
                            element={<PrivateRoute user={user} />}
                        >
                            <Route path="/board/:pathId" element={<Board />} />
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
                        <Route path="*" element={<FourOhFour user={user} />} />
                    </Routes>
                </div>
            )}
        </div>
    )
}

export default App
