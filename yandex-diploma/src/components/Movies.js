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
import { movieMSG } from '../configs/messages';
import { moviesFilterParameters, cardsOnWidth, nullReplacerValue, localStorageNames } from "../configs/constants";

import MainApi from '../utils/MainApi'
import MoviesApi from "../utils/MoviesApi"

import logo from '../images/logo.svg'
import err from '../images/err.svg'
export default function Movies({ isLoggedIn, handleSave, handleDelete, getSavedMovies, movies }) {
    const inputRef = useRef();
    const [parsedMovies, setParsedMovies] = useState([])
    const [displayMessage, setDisplayMessage] = useState(false);
    const [displayPreLoader, setPreLoader] = useState(false);
    const [popupMessage, setPopupMessage] = useState(movieMSG.unknownErr)
    const [displayMovies, setDisplayMovies] = useState([])
    const { width } = useWindowDimensions();

    function nonShortFilmFunction(movie) {
        return movie.duration > moviesFilterParameters.movieLengthThreshold;
    }

    // useEffect(() => {
    //     // if (localStorage.getItem(localStorageNames.movies)) {
    //     //     setMovies(JSON.parse(localStorage.getItem(localStorageNames.movies)))
    //     //     return
    //     // }
    //     Promise.all([
    //         MoviesApi.getMovies(),
    //         MainApi.getSavedMovies()
    //     ])
    //         .then((data) => {
    //             const [movies, saved] = data

    //             const result = movies.filter((movie) => {
    //                 let isOk = true

    //                 if (!movie.image || !movie.duration) {
    //                     return false;
    //                 }

    //                 Object.keys(movie).forEach(key => {
    //                     movie[key] = nullFixer(movie[key]);
    //                 })

    //                 if (movie.image !== null && typeof movie.image === 'object') {
    //                     movie.image.url = MoviesApi.getSyncBaseUrl() + movie.image.url
    //                 } else {
    //                     isOk = false;
    //                 }

    //                 if (saved.find(savedMovie => movie.id + "" === savedMovie.movieID)) {
    //                     movie.isOwn = true;
    //                 }

    //                 console.log(movie)
    //                 return isOk
    //             })

    //             localStorage.setItem(localStorageNames.movies, JSON.stringify(result));
    //             setMovies(result)
    //             console.log(result)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    // useEffect(() => {
    //     getSavedMovies()
    //         .then(saved => {

    //             const data = movies.forEach((movie) => {
    //                 if (saved.find(savedMovie => movie.id + "" === savedMovie.movieID)) {
    //                     movie.isOwn = true;
    //                 }
    //             })
    //             console.log(data)
    //             setMovies(data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             setAuthStatus(false)
    //             setPopupMessage(movieMSG.unknownErr)
    //             setStatusPopupOpen(true)
    //         })
    // }, [movies])

    function handleSubmit({ isShortFilm }) {
        console.log(movies)
        try {
            const optionalFiltersFunct = []
            if (!isShortFilm) {
                optionalFiltersFunct.push(nonShortFilmFunction)
            }

            if (!inputRef.current.validity.valid) {
                setPopupMessage(movieMSG.noRequestVal)
                setAuthStatus(false)
                setStatusPopupOpen(true)
                console.log("err")
                return;
            }
            setPreLoader(true)
            setDisplayMovies([])

            const searchReq = inputRef.current.value;

            const data = movies.filter(movie => {
                let isOk = false;
                const movieName = movie.nameRU || movie.nameEN;
                if (movieName.toUpperCase().includes(searchReq.toUpperCase())) {
                    isOk = true;
                    optionalFiltersFunct.forEach(filterFunc => {
                        isOk = filterFunc(movie)
                    });
                }
                return isOk

            })

            if (data.length === 0) {
                setDisplayMessage(true)
            } else {
                setDisplayMessage(false)
            }
            localStorage.setItem(localStorageNames.userMoviesSearch, JSON.stringify(data))
            setDisplayMovies(getMoreMovies(data))
            setParsedMovies(data)
        }
        catch {
            console.log(err)
            setAuthStatus(false)
            setPopupMessage(movieMSG.unknownErr)
            setStatusPopupOpen(true)
        }
        finally {
            setPreLoader(false)
        }
    }

    function getDuration(duration = 0) {
        return `${Math.floor(duration / 60)}h${duration % 60}min`
    }

    function getStep(width) {
        const step = Object.keys(cardsOnWidth).filter((x) => x < width).sort((a, b) => b - a)[0];//magic
        return cardsOnWidth[step]
    }

    function getMoreMovies(movies) {
        return movies.splice(0, getStep(width))
    }

    const [showMoreBtn, setShowMoreBtn] = useState(false)

    useEffect(() => {
        setShowMoreBtn(parsedMovies.length > 0)
    }, [parsedMovies.length])


    function saveMovie(cardData) {
        return handleSave(cardData)
    }

    function deleteMovie(cardData) {
        return handleDelete(cardData)
    }
    const [StatusPopupOpen, setStatusPopupOpen] = React.useState(false);
    const [isAuthOk, setAuthStatus] = React.useState(false);

    function closeAllPopups() {
        setStatusPopupOpen(false);
    }

    useEffect(() => {
        if (localStorage.getItem(localStorageNames.userMoviesSearch)) {
            const data = JSON.parse(localStorage.getItem(localStorageNames.userMoviesSearch))
            data.forEach((backupMovie) => {
                const updatedMovie = movies.find(movie => {
                    console.log(backupMovie.id, movie.id, movie.id === backupMovie.id)
                    return movie.id === backupMovie.id
                })
                backupMovie.isOwn = updatedMovie.isOwn;
            })
            setDisplayMovies(getMoreMovies(data))
            setParsedMovies(data)
        }
    }, [])

    return (
        <>
            <Header src={logo} menu={true}>
                <HeaderNav isLoggedIn={isLoggedIn} />
            </Header>
            <SearchForm handleSubmit={handleSubmit} inputRef={inputRef}></SearchForm>
            <MovieCardList
                isMoreBtnVisible={showMoreBtn}
                handleMore={() => {
                    setDisplayMovies(displayMovies.concat(getMoreMovies(parsedMovies)))
                }}

            >
                <div style={displayMessage ? { "visibility": "visible" } : { "visibility": "hidden" }} className="moviecardlist__notfound">Ничего не найдено</div>
                <div style={displayPreLoader ? { "visibility": "visible" } : { "visibility": "hidden" }} className="moviecardlist__notfound">Загрузка ...</div>
                {displayMovies.map((movie) => {

                    return <MovieCard
                        key={movie.id}
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
                msgText={isAuthOk ? movieMSG.ok : popupMessage}
            ></InfoTooltip>

        </>
    )
}
