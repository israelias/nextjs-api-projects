import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav
            className="navbar is-primary"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <Link href="/">
                    <a className="navbar-item">Github Repos 📦</a>
                </Link>
                <a
                    role="button"
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link href="/">
                        <a className="navbar-item">Home</a>
                    </Link>
                    <Link href="/projects">
                        <a className="navbar-item">Projects</a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;