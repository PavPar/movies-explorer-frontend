import React from 'react'
import { useState } from 'react';

import Header from './Header'
import Footer from './Footer';
import SearchForm from './SearchFrom';
import MovieCardList from './MovieCardList';
import MovieCard from './MovieCard';

import logo from '../images/logo.svg'
import accicon from '../images/accicon.svg'
export default function MediaDeviceInfo() {
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
            <SearchForm></SearchForm>
            <MovieCardList>
                <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard>
                <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard>
                <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard>
                <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard>
                <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard>
            </MovieCardList>
            <Footer></Footer>
        </>
    )
}
