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
import userContext from './context/UserContext';

import { Route, Switch, useHistory } from 'react-router-dom'
import { useEffect, useState} from 'react';
function App() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({})

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
      MainApi.resetToken();
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

  function nullFixer(value) {
    return (value == null || value == "") ? "неизвестно" : value
  }

  function handleMovieSave(cardData) {
    Object.keys(cardData).forEach(key => {
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
      image: image.url,
      trailer: trailerLink,
      nameRU,
      nameEN,
      thumbnail: image.url,
      movieID: id + "",
    })
  }

  function handleMovieDelete(id) {
    return MainApi.deleteMovie(id)
  }

  function getSavedMovies() {
    return MainApi.getSavedMovies()
  }

  const [movies, setMovies] = useState([])

  useEffect(() => {
    MoviesApi.getMovies()
      .then((data) => {
        data.forEach(movie => {
          if (movie.image !== null) {
            movie.image.url = MoviesApi.getSyncBaseUrl() + movie.image.url
          }
        })
        setMovies(data);
      })
      .catch((err) => [
        console.log(err)
      ])
  }, [])



  return (
    <Switch>
      <Route exact path="/">
        <Main isLoggedIn={isLoggedIn}></Main>
      </Route>
      <ProtectedRoute path="/movies" redirectTo="/signup" loggedIn={isLoggedIn}>
        <Movies
          isLoggedIn={isLoggedIn}
          handleSave={handleMovieSave}
          handleDelete={handleMovieDelete}
          getSavedMovies={getSavedMovies}
          defaultMovies={movies}
        />
      </ProtectedRoute>
      <ProtectedRoute path="/profile" redirectTo="/signup" loggedIn={isLoggedIn}>
        <userContext.Provider value={userInfo}>
          <Profile userInfo={userInfo} handleLogout={handleLogout} handlePatch={handlePatch}></Profile>
        </userContext.Provider>
      </ProtectedRoute>
      <ProtectedRoute path="/saved-movies" redirectTo="/signup" loggedIn={isLoggedIn}>
        <SavedMovies
          isLoggedIn={isLoggedIn}
          getSavedMovies={getSavedMovies}
          handleDelete={handleMovieDelete}
        />
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
