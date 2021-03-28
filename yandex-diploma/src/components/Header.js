import React from 'react';

export default function Header({ type, src, children, menu = false, onMenuClick }) {

    return (
        <header className={"header " + type}>
            <img className="header__logo" src={src} alt="лого"></img>
            {children}
            { menu && <button class="menubtn" onClick={onMenuClick}> </button>}
        </header>

    )
}
