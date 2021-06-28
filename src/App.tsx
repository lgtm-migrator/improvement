import React, { ReactElement, Suspense } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import { RecoilRoot, useRecoilValue } from 'recoil'

import { loadUserProfile } from './state/auth'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import NavSignedOut from './components/NavSignedOut'
import NavSignedIn from './components/NavSignedIn'

const AppContainer: React.FC = (): ReactElement => {
    const userState = useRecoilValue(loadUserProfile)

    return (
        <Router>
            <div>
                {!userState.isAuthenticated && <NavSignedOut />}

                <Switch>
                    <Route exact path="/">
                        <div className="grid place-items-center h-screen">
                            <h2>Home</h2>
                        </div>
                    </Route>
                    <Route exact path="/signup">
                        <Signup isAuthenticated={userState.isAuthenticated} />
                    </Route>
                    <Route exact path="/signin">
                        <Signin isAuthenticated={userState.isAuthenticated} />
                    </Route>
                    {/* Signed in routes */}
                    <NavSignedIn user={userState.user}>
                        {!userState.isAuthenticated && (
                            <Redirect to="/signin" />
                        )}
                        <Switch>
                            <Route path="/dashboard">
                                <Dashboard />
                            </Route>
                        </Switch>
                    </NavSignedIn>
                </Switch>
            </div>
        </Router>
    )
}

const App: React.FC = (): ReactElement => (
    <RecoilRoot>
        <Suspense
            fallback={
                <div className="grid place-items-center h-screen">
                    Loading...
                </div>
            }
        >
            <AppContainer />
        </Suspense>
    </RecoilRoot>
)

export default App
