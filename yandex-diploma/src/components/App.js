import '../App.css';
import Main from './Main';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Profile from './Profile';
import Register from './Register';
import Login from './Login'
import ErrorPage from './ErrorPage.js'
import { Route, Switch, useHistory } from 'react-router-dom'
function App() {
  const history = useHistory();

  function handleLogin(){
    history.push('/movies');
  }


  function handleRegister(){
    history.push('/signin');
  }

  return (
    <Switch>
      <Route exact path="/">
        <Main></Main>
      </Route>
      <Route exact path="/movies">
        <Movies></Movies>
      </Route>
      <Route exact path="/saved-movies">
        <SavedMovies></SavedMovies>
      </Route>
      <Route exact path="/profile">
        <Profile></Profile>
      </Route>
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
