import React, { ReactElement, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RecoilRoot, useRecoilValue } from 'recoil'

import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import { loadUserProfile } from './state/auth'

const AppContainer: React.FC = (): ReactElement => {
    const userState = useRecoilValue(loadUserProfile)

    return (
        <Router>
            <div>
                <Navbar />

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
                        <div className="grid place-items-center h-screen">
                            <h2>Sign in</h2>
                        </div>
                    </Route>
                    <Route
                        path="/dashboard"
                        render={() => (
                            <Dashboard
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
