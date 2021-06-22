import React, { ReactElement, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RecoilRoot, useRecoilValue } from 'recoil'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import NavSignedOut from './components/NavSignedOut'
import { loadUserProfile } from './state/auth'

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
                    <Route
                        path="/dashboard"
                        render={() => (
                            <Dashboard
                                user={userState.user}
                                isAuthenticated={userState.isAuthenticated}
                            />
                        )}
                    />
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
