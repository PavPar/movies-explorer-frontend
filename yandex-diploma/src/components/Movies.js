import React from 'react'

import Header from './Header'
import Footer from './Footer';
import SearchForm from './SearchFrom';
import MovieCardList from './MovieCardList';
import MovieCard from './MovieCard';
import HeaderNav from './HeaderNav'

import logo from '../images/logo.svg'
export default function Movies({isLoggedIn}) {


    return (
        <>
            <Header src={logo} menu={true}>
                <HeaderNav isLoggedIn={isLoggedIn} />
            </Header>
            <SearchForm></SearchForm>
            <MovieCardList isMoreBtnVisible={false}>
                {/* <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard>
                <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard>
                <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard>
                <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard>
                <MovieCard title="Тест" src={logo} duration="00h00min"></MovieCard> */}
            </MovieCardList>
            <Footer></Footer>
        </>
    )
}
