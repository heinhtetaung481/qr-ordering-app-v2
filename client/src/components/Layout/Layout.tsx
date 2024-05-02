import React from 'react'
import { Link } from 'react-router-dom'
import './Layout.css'
import logo from '../../fasteats.png'

interface LayoutProps {
    children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
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
                        <li><a href="/about">Menus</a></li>
                        <li><a href="/contact">Orders</a></li>
                    </ul>
                </nav>
            </header>

            <main className='body'>
                {children}
            </main>
            
            <footer>

            </footer>
        </div>
    )
}

export default Layout;