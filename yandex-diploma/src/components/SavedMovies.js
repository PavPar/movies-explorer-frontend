import React from 'react'
import { useState } from 'react';

import Header from './Header'
import Footer from './Footer';
import SearchForm from './SearchFrom';
import MovieCardList from './MovieCardList';
import MovieCard from './MovieCardSaved';
import Navigation from './Navigation';

import logo from '../images/logo.svg'
import accicon from '../images/accicon.svg'
import { Link } from 'react-router-dom';

export default function MediaDeviceInfo() {
    const [isMenuOpen, changeMenuState] = useState(false);

    function handleMenuClick() {
        console.log("click!")
        changeMenuState(!isMenuOpen);
    }
    return (
        <>
          <Header src={logo} menu={true} onMenuClick={()=>handleMenuClick(true)}>
                <nav className="header__nav header__nav_adp-menu">
                    <div className="header__menu header__menu_adp-menu">
                        <Link to="/" className="header__button header__element_hidden-lowres">Главная</Link>
                        <Link to="/movies" className="header__button header__button_decoration-underline">Фильмы</Link>
                        <Link to="/saved-movies" className="header__button">Сохранённые фильмы</Link>
                    </div>

                    <div className="header__menu header__menu_align-right" >
                        <Link to="/profile" className="account-btn">
                            <p className="account-btn__text">Аккаунт</p>
                            <img className="account-btn__marker" src={accicon} alt="аккаунт"></img>
                        </Link >
                    </div>
                    <button className="menubtn" onClick={handleMenuClick}> </button>
                </nav>
            </Header>
            <Navigation isVisible={isMenuOpen} handleClose={()=>handleMenuClick(false)}></Navigation>
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
