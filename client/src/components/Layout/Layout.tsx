import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Layout.css'
import logo from '../../fasteats.png'
import { AuthContext } from '../utils/AuthContext'

const Layout = () => {
    const { logout } = useContext(AuthContext);
    return (
        <div className='container'>
            <header>
            <img src={logo} className="logo" alt="Fasteats" />
                <nav>
                    <ul className="menu">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/tables">Tables</Link>
                        </li>
                        <li>
                            <Link to="/menus">Menus</Link>
                        </li>
                        <li>
                            <Link to="/categories">Categories</Link>
                        </li>
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className='body'>
                <Outlet />
            </main>
            
            <footer>

            </footer>
        </div>
    )
}

export default Layout;