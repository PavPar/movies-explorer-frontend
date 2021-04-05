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

import { Route, Switch, useHistory } from 'react-router-dom'
import { useState } from 'react';
function App() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({})

  function handleLogin({ email, password }) {
    setLoggedIn(true);
    return MainApi.authUser({ email, password })
      .then((data) => {
        MainApi.getUserInfo()
          .then((res) => {
            setUserInfo({
              name: res.name,
              email: res.email
            })
          })
        return data;
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setLoggedIn(false);
  }

  function handlePatch({name,email}) {
    console.log({name,email})
    return MainApi.patchUserInfo({name,email})
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



  return (
    <Switch>
      <Route exact path="/">
        <Main isLoggedIn={isLoggedIn}></Main>
      </Route>
      <ProtectedRoute path="/movies" redirectTo="/signup" loggedIn={isLoggedIn}>
        <Movies isLoggedIn={isLoggedIn}></Movies>
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
