import '../App.css';
import Main from './Main';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Profile from './Profile';
import Register from './Register';
import Login from './Login'
import ErrorPage from './ErrorPage.js'
import ProtectedRoute from './ProtectedRoute'

import MainApi from '../utils/MainApi'
import MoviesApi from "../utils/MoviesApi"

import { Route, Switch, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
function App() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({})
  const [baseUrl, setBaseUrl] = useState("")

  function handleLogin({ email, password }) {
    setLoggedIn(true);
    return MainApi.authUser({ email, password })
      .then((data) => {
        handleTokenCheck()
        return data;
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setLoggedIn(false);
  }

  function handlePatch({ name, email }) {
    console.log({ name, email })
    return MainApi.patchUserInfo({ name, email })
  }

  function handleRegister({ name, email, password }) {
    return MainApi.createUser({ name, email, password })
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      return MainApi.checkToken(jwt)
        .then((res) => {
          setUserInfo({
            name: res.name,
            email: res.email
          })
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
    return false
  }


  const [isLoggedIn, setLoggedIn] = useState(() => {
    return handleTokenCheck()
  });

  function handleSearch(searchReq) {
    console.log(searchReq)
    return MoviesApi.getMovies()
      .then((data) => {
        setBaseUrl(MoviesApi.getSyncBaseUrl())
        return data
      })

  }

  function nullFixer(value) {
    return (value == null) ? "неизвестно" : value
  }

  function handleMovieSave(cardData) {
    Object.keys(cardData).forEach(key=>{
      cardData[key] = nullFixer(cardData[key]);
    })
    
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      id,
    } = cardData

    
    return MainApi.saveMovie({
      country,
      director,
      duration,
      year,
      description,
      image: MoviesApi.getSyncBaseUrl() + image.url,
      trailer: trailerLink,
      nameRU,
      nameEN,
      thumbnail: MoviesApi.getSyncBaseUrl() + image.url,
      movieID: id + "",
    })
  }

  function handleMovieDelete(cardData) {
    return MainApi.deleteMovie(cardData.id)
  }

  function getSavedMovies() {
    return MainApi.getSavedMovies()
  }

  return (
    <Switch>
      <Route exact path="/">
        <Main isLoggedIn={isLoggedIn}></Main>
      </Route>
      <ProtectedRoute path="/movies" redirectTo="/signup" loggedIn={isLoggedIn}>
        <Movies
          isLoggedIn={isLoggedIn}
          handleSearch={handleSearch}
          baseUrl={baseUrl}
          handleSave={handleMovieSave}
          handleDelete={handleMovieDelete}
          getSavedMovies={getSavedMovies}
        />
      </ProtectedRoute>
      <ProtectedRoute path="/profile" redirectTo="/signup" loggedIn={isLoggedIn}>
        <Profile userInfo={userInfo} handleLogout={handleLogout} handlePatch={handlePatch}></Profile>
      </ProtectedRoute>
      <ProtectedRoute path="/saved-movies" redirectTo="/signup" loggedIn={isLoggedIn}>
        <SavedMovies isLoggedIn={isLoggedIn}></SavedMovies>
      </ProtectedRoute>

      <Route exact path="/signup">
        <Register handleSubmit={handleRegister}></Register>
      </Route>

      <Route exact path="/signin">
        <Login handleSubmit={handleLogin}></Login>
      </Route>
      <ErrorPage code="404" message="Страница не найдена"></ErrorPage>
    </Switch>
  );
}

export default App;
