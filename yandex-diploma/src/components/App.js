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
    // history.push('/movies');
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setLoggedIn(false);
  }


  function handleRegister() {
    history.push('/signin');
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
        <Main></Main>
      </Route>
      <ProtectedRoute path="/movies" redirectTo="/signup" loggedIn={isLoggedIn}>
          <Movies></Movies>
      </ProtectedRoute>
      <ProtectedRoute path="/profile" redirectTo="/signup" loggedIn={isLoggedIn}>
          <Profile userInfo={userInfo} handleLogout={handleLogout}></Profile>
      </ProtectedRoute>
      <ProtectedRoute path="/saved-movies" redirectTo="/signup" loggedIn={isLoggedIn}>
        <SavedMovies></SavedMovies>
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
