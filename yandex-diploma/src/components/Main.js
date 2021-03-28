import React from 'react'
import Header from './Header'
import Promo from './Promo'
import NavTab from './NavTab'
import AboutProject from './AboutProject'
import Techs from './Techs';
import AboutMe from './AboutMe';
import Portfolio from './Portfolio';
import Footer from './Footer';

import logo from '../images/logo.svg'
import avatar from '../images/avatar-temp.jpg'
import marker from '../images/link-marker.svg'
export default function MediaDeviceInfo() {
    return (
        <>
            <Header type="header_color-blue" src={logo}>
                <nav className="header__nav">
                    <div className="header__menu header__menu_align-right">
                        <button className="header__button header__button_type-signup">Регистрация</button>
                        <button className="header__button header__button_type-login">Войти</button>
                    </div>
                </nav>
            </Header>
            <Promo></Promo>
            <NavTab></NavTab>
            <AboutProject></AboutProject>
            <Techs></Techs>
            <AboutMe avatar={avatar}></AboutMe>
            <Portfolio marker={marker}></Portfolio>
            <Footer></Footer>
        </>
    )
}
