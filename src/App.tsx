import React, { ReactElement, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'

import { useCurrentUserQuery } from 'client/improvementApiClient'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import NavSignedOut from './components/NavSignedOut'
import NavSignedIn from './components/NavSignedIn'

const AppContainer: React.FC = (): ReactElement => {
    const { data: user } = useCurrentUserQuery('')

    return (
        <Router>
            <div>
                {!user && <NavSignedOut />}

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
                    {/* Signed in routes */}
                    {user && (
                        <NavSignedIn user={user}>
                            <Switch>
                                <Route path="/dashboard">
                                    <Dashboard user={user} />
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
