import React from 'react';

export default function Header({type,src}) {

    return (
        <header className={"header " + type}>
            <img className="header__logo" src={src} alt="лого"></img>
            <nav className="header__nav">
                <div className="header__menu header__menu_align-right">
                    <button className="header__button header__button_type-signup">Регистрация</button>
                    <button className="header__button header__button_type-login">Войти</button>
                </div>
            </nav>
        </header>
    )
}
