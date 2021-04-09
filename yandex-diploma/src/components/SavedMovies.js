import React, { useEffect, useState, useRef } from 'react'

import Header from './Header'
import Footer from './Footer';
import SearchForm from './SearchFrom';
import MovieCardList from './MovieCardList';
import HeaderNav from './HeaderNav'

import logo from '../images/logo.svg'
import MovieCardSaved from './MovieCardSaved';

export default function SavedMovies({ isLoggedIn, getSavedMovies, handleDelete }) {
    const [displayMovies, setDisplayMovies] = useState([])
    const inputRef = useRef();

    function getDuration(duration = 0) {
        return `${Math.floor(duration / 60)}h${duration % 60}min`
    }

    function nonShortFilmFunction(movie) {
        return movie.duration > 40
    }

    function handleSubmit({ isShortFilm }) {
        const optionalFiltersFunct = []
        if (!isShortFilm) {
            optionalFiltersFunct.push(nonShortFilmFunction)
        }

        if (!inputRef.current.validity.valid) {
            console.log('dumbass')
            return;
        }

        const searchReq = inputRef.current.value;

        getSavedMovies()
            .then((data) => {
                data = data.filter((movie) => {
                    let isOk = false
                    const movieName = movie.nameRU || movie.nameEN;
                    if (movieName.includes(searchReq)) {
                        isOk = true;
                        optionalFiltersFunct.forEach(filterFunc => {
                            isOk = filterFunc(movie)
                        });
                    }
                    return isOk
                })

                return data
            })
            .then((data) => {
                setDisplayMovies(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Header src={logo} menu={true}>
                <HeaderNav isLoggedIn={isLoggedIn} />
            </Header>
            <SearchForm
                handleSubmit={handleSubmit}
                inputRef={inputRef}
                onSwitchClick={handleSubmit}
            />
            <MovieCardList
                isMoreBtnVisible={false}
            >
                {displayMovies.map((movie) => {
                    return <MovieCardSaved deleteMovie={handleDelete} cardData={movie} title={movie.nameRU || movie.nameEN} src={movie.image} duration={getDuration(movie.duration)}></MovieCardSaved>
                })}

            </MovieCardList>
            <Footer></Footer>
        </>
    )
}
