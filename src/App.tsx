import React, { ReactElement, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'

import { useCurrentUserQuery } from 'client/improvementApiClient'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import {
    toast,
    successToast,
    errorToast,
    warningToast,
    infoToast,
} from 'utils/toast'

import Board from 'pages/Board'
import PrivateRoute from 'components/PrivateRoute'
import FourOhFour from 'pages/FourOhFour'
import NavSignedOut from 'components/NavSignedOut'
import NavSignedIn from 'components/NavSignedIn'
import ToastContainer from 'components/overlays/Toast'
import Signup from 'pages/Signup'
import Signin from 'pages/Signin'
import Dashboard from 'pages/Dashboard'

const AppContainer: React.FC = (): ReactElement => {
    const { data: user } = useCurrentUserQuery('')
    const dispatch = useAppDispatch()
    const toastStatus = useAppSelector((state) => state.toast)

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
        <div>
            <ToastContainer />
            {!user && <NavSignedOut />}

            {/* Signed in routes */}
            {user && (
                <NavSignedIn user={user}>
                    <Switch>
                        <PrivateRoute user={user} path="/dashboard">
                            <Dashboard user={user} />
                        </PrivateRoute>
                        <PrivateRoute user={user} path="/board/:boardUuid">
                            <Board />
                        </PrivateRoute>
                        <Route path="*">
                            <FourOhFour user={user} />
                        </Route>
                    </Switch>
                </NavSignedIn>
            )}

            <Switch>
                <Route exact path="/">
                    <div className="grid place-items-center h-screen">
                        <h2>Home</h2>
                    </div>
                </Route>
                <Route exact path="/signup">
                    <Signup isAuthenticated={!!user} />
                </Route>
                <Route exact path="/signin">
                    <Signin isAuthenticated={!!user} />
                </Route>
                <Route path="*">
                    <FourOhFour />
                </Route>
            </Switch>
        </div>
    )
}

interface AppProps {
    history: History
}

const App: React.FC<AppProps> = ({ history }): ReactElement => {
    return (
        <Suspense
            fallback={
                <div className="grid place-items-center h-screen">
                    Loading...
                </div>
            }
        >
            <ConnectedRouter history={history}>
                <AppContainer />
            </ConnectedRouter>
        </Suspense>
    )
}

export default App
