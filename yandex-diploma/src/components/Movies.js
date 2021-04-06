import React from 'react'

import Header from './Header'
import Footer from './Footer';
import SearchForm from './SearchFrom';
import MovieCardList from './MovieCardList';
import MovieCard from './MovieCard';
import HeaderNav from './HeaderNav'
import { useRef, useState } from 'react';

import logo from '../images/logo.svg'
export default function Movies({ isLoggedIn, handleSearch, baseUrl }) {
    const inputRef = useRef();
    const [movies, setMovies] = useState([])

    function handleSubmit(event) {
        event.preventDefault()
        if (!inputRef.current.validity.valid) {
            console.log('dumbass')
            return;
        }
        handleSearch(inputRef.current.value)
            .then((data) => {
                setMovies(data)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function getDuration(duration=0){
        return `${Math.floor(duration/60)}h${duration%60}min`
    }

    return (
        <>
            <Header src={logo} menu={true}>
                <HeaderNav isLoggedIn={isLoggedIn} />
            </Header>
            <SearchForm handleSubmit={handleSubmit} inputRef={inputRef}></SearchForm>
            <MovieCardList isMoreBtnVisible={false}>

                {movies.map((movie) => {
                    return <MovieCard title={movie.nameRU || movie.nameEN} src={baseUrl + movie.image.url} duration={getDuration(movie.duration)}></MovieCard>
                })}
            </MovieCardList>
            <Footer></Footer>
        </>
    )
}
