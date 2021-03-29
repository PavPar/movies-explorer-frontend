import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Movies from './components/Movies';
import SavedMovies from './components/SavedMovies';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login'
import ErrorPage from './components/ErrorPage.js'

function App() {
  return (
    //  <Main></Main>
    // <Movies></Movies>
    // <SavedMovies></SavedMovies>
    // <Profile></Profile>
    // <Register></Register>
    // <Login></Login>
    <ErrorPage code="404" message="Страница не найдена"></ErrorPage>
  );
}

export default App;
