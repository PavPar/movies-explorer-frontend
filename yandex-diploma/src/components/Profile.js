import React from 'react'
import { useState } from 'react';

import Header from './Header'
import Footer from './Footer';

import logo from '../images/logo.svg'
import accicon from '../images/accicon.svg'
export default function Profile() {
    const [isMenuOpen, changeMenuState] = useState(false);

    function handleMenuClick() {
        console.log("click!")
        changeMenuState(!isMenuOpen);
    }
    return (
        <>
            <Header src={logo} menu={true} onMenuClick={handleMenuClick}>
                <nav className="header__nav header__nav_adp-menu" style={isMenuOpen ? { visibility: "visible" } : { visibility: "hidden" }}>
                    <div className="header__menu header__menu_adp-menu">
                        <p className="header__button header__element_hidden-lowres">Главная</p>
                        <p className="header__button header__button_decoration-underline">Фильмы</p>
                        <p className="header__button">Сохранённые фильмы</p>
                    </div>

                    <div className="header__menu header__menu_align-right" >
                        <button className="account-btn">
                            <p className="account-btn__text">Аккаунт</p>
                            <img className="account-btn__marker" src={accicon} alt="аккаунт"></img>
                        </button>
                    </div>
                    <button className="header__closemenu header__element_hidden-lowres" onClick={handleMenuClick}></button>

                </nav>
            </Header>
            <section className="profile">
                <h2 className="profile__title">Привет, Виталий!</h2>
                <form className="profile__form">
                    <p className="profile__fieldname">Имя</p>
                    <input className="profile__input"></input>
                    <hr className="profile__breakline"></hr>
                    <p className="profile__fieldname">Почта</p>
                    <input className="profile__input"></input>
                </form>
                <div className="profile__controlls">
                    <button className="profile__btn profile__btn_action-edit">Редактировать</button>
                    <button className="profile__btn profile__btn_action-logout">Выйти из аккаунта</button>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}
