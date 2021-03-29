import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg'

export default function Header({ type, children, menu = false, onMenuClick }) {

    return (
        <header className={"header " + type}>
            <Link to="/" class="auth__logo">
                <img src={logo} alt="лого"></img>
            </Link>
            {children}
            { menu && <button class="menubtn" onClick={onMenuClick}> </button>}
        </header>

    )
}
