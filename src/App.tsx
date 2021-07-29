import React, { ReactElement, Suspense, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import { bindActionCreators } from '@reduxjs/toolkit'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'

import { authActions } from './state/actions'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import NavSignedOut from './components/NavSignedOut'
import NavSignedIn from './components/NavSignedIn'
import { useAppDispatch, useAppSelector } from './state/hooks'

const AppContainer: React.FC = (): ReactElement => {
    const dispatch = useAppDispatch()
    const { loadUser } = bindActionCreators(authActions, dispatch)
    const authState = useAppSelector((state) => state.auth)

    useEffect(() => {
        loadUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Router>
            <div>
                {!authState.isAuthenticated && <NavSignedOut />}

                <Switch>
                    <Route exact path="/">
                        <div className="grid place-items-center h-screen">
                            <h2>Home</h2>
                        </div>
                    </Route>
                    <Route exact path="/signup">
                        <Signup isAuthenticated={authState.isAuthenticated} />
                    </Route>
                    <Route exact path="/signin">
                        <Signin isAuthenticated={authState.isAuthenticated} />
                    </Route>
                    {/* Signed in routes */}
                    {authState.isAuthenticated && authState.user && (
                        <NavSignedIn user={authState.user}>
                            {!authState.isAuthenticated && (
                                <Redirect to="/signin" />
                            )}
                            <Switch>
                                <Route path="/dashboard">
                                    <Dashboard />
                                </Route>
                            </Switch>
                        </NavSignedIn>
                    )}
                </Switch>
            </div>
        </Router>
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
