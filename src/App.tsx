import React, { ReactElement } from 'react'

import Signup from './pages/Signup'

const App: React.FC = (): ReactElement => (
    <div className="App">
        <header className="App-header">
            <Signup />
        </header>
    </div>
)

export default App
