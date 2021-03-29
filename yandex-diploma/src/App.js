import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Movies from './components/Movies';
import SavedMovies from './components/SavedMovies';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login'
import ErrorPage from './components/ErrorPage.js'
import { Route, Switch } from 'react-router-dom'
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Main></Main>
      </Route>
      <Route path="/movies">
        <Movies></Movies>
      </Route>
      <Route path="/saved-movies">
        <SavedMovies></SavedMovies>
      </Route>
      <Route path="/profile">
        <Profile></Profile>
      </Route>
      <Route path="/signup">
        <Register></Register>
      </Route>

      <Route path="/signin">
        <Login></Login>
      </Route>

      <ErrorPage code="404" message="Страница не найдена"></ErrorPage>
    </Switch>
  );
}

export default App;
