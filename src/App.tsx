import React, { ReactElement } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
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
import Loader from 'components/elements/Loader'

const AppContainer: React.FC = (): ReactElement => {
    const { data: user, isLoading, isFetching } = useCurrentUserQuery('')
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

    const loading = isLoading || isFetching

    return (
        <div>
            <ToastContainer />
            {loading && <Loader center />}
            {!loading && !user && <NavSignedOut />}

            {!loading && user && (
                <NavSignedIn user={user}>
                    <Switch>
                        <PrivateRoute user={user} path="/dashboard">
                            <Dashboard user={user} />
                        </PrivateRoute>
                        <PrivateRoute user={user} path="/board/:pathId">
                            <Board />
                        </PrivateRoute>
                        <Route path="*">
                            <FourOhFour user={user} />
                        </Route>
                    </Switch>
                </NavSignedIn>
            )}
            {!loading && (
                <Switch>
                    <Route exact path="/">
                        {!!user && <Redirect to="/dashboard" />}
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
                    <Route path="/404">
                        <FourOhFour />
                    </Route>
                    {!user && (
                        <Route path="*">
                            <FourOhFour />
                        </Route>
                    )}
                </Switch>
            )}
        </div>
    )
}

interface AppProps {
    history: History
}

const App: React.FC<AppProps> = ({ history }): ReactElement => {
    return (
        <ConnectedRouter history={history}>
            <AppContainer />
        </ConnectedRouter>
    )
}

export default App
