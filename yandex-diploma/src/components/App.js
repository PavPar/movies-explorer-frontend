import '../App.css';
import Main from './Main';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Profile from './Profile';
import Register from './Register';
import Login from './Login'
import ErrorPage from './ErrorPage.js'
import { Route, Switch } from 'react-router-dom'
function App() {
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
        <Register></Register>
      </Route>

      <Route exact path="/signin">
        <Login></Login>
      </Route>
      <ErrorPage code="404" message="Страница не найдена"></ErrorPage>
    </Switch>
  );
}

export default App;
