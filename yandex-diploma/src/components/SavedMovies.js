import React, { useEffect, useState, useRef } from 'react'

import Header from './Header'
import Footer from './Footer';
import SearchForm from './SearchFrom';
import MovieCardList from './MovieCardList';
import HeaderNav from './HeaderNav'
import InfoTooltip from './InfoTooltip'

import logo from '../images/logo.svg'
import MovieCardSaved from './MovieCardSaved';

export default function SavedMovies({ isLoggedIn, getSavedMovies, handleDelete }) {
    const [displayMovies, setDisplayMovies] = useState([])
    const [displayMessage, setDisplayMessage] = useState(false);

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
                if (data.length === 0) {
                    setDisplayMessage(true)
                }else{
                    setDisplayMessage(false)
                }
                setDisplayMovies(data)
            })
            .catch((err) => {
                console.log(err)
                setAuthStatus(false)
                setStatusPopupOpen(true)
            })
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
            <SearchForm
                handleSubmit={handleSubmit}
                inputRef={inputRef}
                onSwitchClick={handleSubmit}
            />
            <MovieCardList
                isMoreBtnVisible={false}
            >
                <div style={displayMessage ? { "visibility": "visible" } : {"visibility": "hidden"}} className="moviecardlist__notfound">Ничего не найдено</div>
                {displayMovies.map((movie) => {
                    return <MovieCardSaved deleteMovie={handleDelete} cardData={movie} title={movie.nameRU || movie.nameEN} src={movie.image} duration={getDuration(movie.duration)}></MovieCardSaved>
                })}

            </MovieCardList>
            <InfoTooltip 
                     onClose={closeAllPopups}
                     isOpen={StatusPopupOpen}
                     isOk={isAuthOk}
                     msgText={isAuthOk ? 'Запрос прошел успешно!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
            ></InfoTooltip>
            <Footer></Footer>
        </>
    )
}
