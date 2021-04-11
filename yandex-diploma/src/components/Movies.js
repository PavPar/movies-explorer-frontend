import React, { useEffect } from 'react'

import Header from './Header'
import Footer from './Footer';
import SearchForm from './SearchFrom';
import MovieCardList from './MovieCardList';
import MovieCard from './MovieCard';
import HeaderNav from './HeaderNav'
import InfoTooltip from './InfoTooltip'

import { useRef, useState } from 'react';
import useWindowDimensions from '../utils/useWindowDimensions'

import logo from '../images/logo.svg'
import err from '../images/err.svg'
export default function Movies({ isLoggedIn, defaultMovies, handleSave, handleDelete, getSavedMovies }) {
    const inputRef = useRef();
    const [movies, setMovies] = useState([])
    const [displayMessage, setDisplayMessage] = useState(false);
    const [displayMovies, setDisplayMovies] = useState([])
    const { width } = useWindowDimensions();

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
            .then((saved) => {
                let data = defaultMovies;
                console.log(data)
                data = data.filter((movie) => {
                    let isOk = false
                    const movieName = movie.nameRU || movie.nameEN;
                    if (movieName.toUpperCase().includes(searchReq.toUpperCase())) {
                        isOk = true;
                        optionalFiltersFunct.forEach(filterFunc => {
                            isOk = filterFunc(movie)
                        });
                    }

                    if (!movie.image || !movie.duration) {
                        isOk = false;
                    }

                    return isOk
                })

                data.forEach(movie => {
                    if (saved.find(savedMovie => movie.id + "" === savedMovie.movieID)) {
                        movie.isOwn = true;
                    }
                })

                data.forEach(movie => {
                    Object.keys(movie).forEach(key => {
                        movie[key] = nullFixer(movie[key]);
                    })
                })



                return data
            })
            .then((data) => {
                if (data.length === 0) {
                    setDisplayMessage(true)
                }else{
                    setDisplayMessage(false)
                }
                setDisplayMovies(getMoreMovies(data))
                setMovies(data)
            })
            .catch((err) => {
                console.log(err)
                setAuthStatus(false)
                setStatusPopupOpen(true)
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

        const step = Object.keys(cardsOnWidth).filter((x) => x < width).sort((a, b) => b - a)[0];//magic
        return cardsOnWidth[step]
    }

    function getMoreMovies(movies) {
        return movies.splice(0, getStep(width))
    }

    const [showMoreBtn, setShowMoreBtn] = useState(false)

    useEffect(() => {
        setShowMoreBtn(movies.length > 0)
    }, [movies.length])


    function saveMovie(cardData) {
        console.log(cardData)
        return handleSave(cardData)
    }

    function deleteMovie(cardData) {
        console.log(cardData)
        return handleDelete(cardData)
    }

    function nullFixer(value) {
        return (value == null || value == "") ? "неизвестно" : value
    }

    const [StatusPopupOpen, setStatusPopupOpen] = React.useState(false);
    const [isAuthOk, setAuthStatus] = React.useState(false);

    function closeAllPopups() {
        setStatusPopupOpen(false);
    }


    return (
        <>
            <Header src={logo} menu={true}>
                <HeaderNav isLoggedIn={isLoggedIn} />
            </Header>
            <SearchForm handleSubmit={handleSubmit} inputRef={inputRef}></SearchForm>
            <MovieCardList
                isMoreBtnVisible={showMoreBtn}
                handleMore={() => {
                    setDisplayMovies(displayMovies.concat(getMoreMovies(movies)))
                    console.log(displayMovies.length)
                }}

            >
                <div style={displayMessage ? { "visibility": "visible" } : {"visibility": "hidden"}} className="moviecardlist__notfound">Ничего не найдено</div>
                {displayMovies.map((movie) => {

                    return <MovieCard
                        isOwn={movie.isOwn || false}
                        saveMovie={saveMovie}
                        deleteMovie={deleteMovie}
                        cardData={movie}
                        title={movie.nameRU || movie.nameEN}
                        src={movie.image.url || err}
                        alt={movie.nameRU || movie.nameEN}
                        duration={getDuration(movie.duration)}
                    />
                })}
            </MovieCardList>
            <Footer></Footer>
            <InfoTooltip
                onClose={closeAllPopups}
                isOpen={StatusPopupOpen}
                isOk={isAuthOk}
                msgText={isAuthOk ? 'Запрос прошел успешно!' : 'Что-то пошло не так! Попробуйте позже.'}
            ></InfoTooltip>

        </>
    )
}
