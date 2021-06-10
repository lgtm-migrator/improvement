import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = (): ReactElement => (
    <nav>
        <ul className="flex place-content-evenly">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>
            <li>
                <Link to="/signin">Sign In</Link>
            </li>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
        </ul>
        <hr />
    </nav>
)

export default Navbar
