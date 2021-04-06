import React, { useEffect } from 'react'

import Header from './Header'
import Footer from './Footer';
import SearchForm from './SearchFrom';
import MovieCardList from './MovieCardList';
import MovieCard from './MovieCard';
import HeaderNav from './HeaderNav'
import { useRef, useState } from 'react';
import useWindowDimensions from '../utils/useWindowDimensions'

import logo from '../images/logo.svg'
export default function Movies({ isLoggedIn, handleSearch, baseUrl }) {
    const inputRef = useRef();
    const [movies, setMovies] = useState([])
    const [displayMovies, setDisplayMovies] = useState([])
    const { height, width } = useWindowDimensions();

    function handleSubmit(event) {
        event.preventDefault()
        if (!inputRef.current.validity.valid) {
            console.log('dumbass')
            return;
        }
        handleSearch(inputRef.current.value)
            .then((data) => {
                setDisplayMovies(getMoreMovies(data))
                setMovies(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function getDuration(duration = 0) {
        return `${Math.floor(duration / 60)}h${duration % 60}min`
    }

    function getStep(width) {
        const cardsOnWidth = {
            "1280": 12,
            "768": 8,
            "320": 5,
            "0": 5
        }

        const step = Object.keys(cardsOnWidth).filter((x) => x < width).sort((a, b) => b - a)[0];
        return cardsOnWidth[step]
    }

    // function divideArray(movies, step) {
    //     let result = []
    //     for (let i = 0; i < movies.length; i += step) {
    //         console.log(movies.length, i, i + step)
    //         result.push(movies.slice(i, i + step))
    //     }
    //     return result
    // }

    function getMoreMovies(movies) {
        return movies.splice(0, getStep(width))
    }

    const [showMoreBtn, setShowMoreBtn] = useState(false)

    useEffect(() => {
        setShowMoreBtn(movies.length > 0)
    }, [movies.length])

    return (
        <>
            <Header src={logo} menu={true}>
                <HeaderNav isLoggedIn={isLoggedIn} />
            </Header>
            <SearchForm handleSubmit={handleSubmit} inputRef={inputRef}></SearchForm>
            <MovieCardList isMoreBtnVisible={showMoreBtn} handleMore={() => {
                setDisplayMovies(displayMovies.concat(getMoreMovies(movies)))
            }}>
                {displayMovies.map((movie) => {
                    return <MovieCard title={movie.nameRU || movie.nameEN} src={baseUrl + movie.image.url} alt={movie.image.alternativeText} duration={getDuration(movie.duration)}></MovieCard>
                })}
            </MovieCardList>
            <Footer></Footer>
        </>
    )
}
