import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from "./GuestLayout.module.css"
import logo from '../../fasteats.png'

const Layout = () => {
    return (
        <div className={styles.container}>
            <header>
            <img src={logo} className={styles.logo} alt="Fasteats" />
            </header>

            <main className={styles.body}>
                <Outlet />
            </main>
            
            <footer>

            </footer>
        </div>
    )
}

export default Layout;