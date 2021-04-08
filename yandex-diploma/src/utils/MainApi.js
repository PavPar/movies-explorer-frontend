class MainApi {
    constructor(options) {
        this._options = options;
    }

    //Произвести обращение к серверу без тела запроса
    _accessServer(method, url) {
        return fetch(this._options.baseUrl + url, {
            headers: this._options.headers,
            method: method
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((result) => {
                return result;
            })
    }

    //Отправка данных на сервер с телом запроса
    _sendDataToServer(method, url, bodyObj) {
        return fetch(this._options.baseUrl + url, {
            method: method,
            headers: this._options.headers,
            body: JSON.stringify(bodyObj)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject({ status: res.status, msg: res.statusText });
        })
    }

    //Авторизация пользователя
    authUser({ email, password }) {
        return this._sendDataToServer("POST", "/signin", {
            email, password
        })
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                return data;
            })
    }

    //Создать пользователя
    createUser({ name, email, password }) {
        return this._sendDataToServer("POST", "/signup", {
            name, email, password
        })
    }

    //Получить фильмы
    getMovies() {
        return this._accessServer("GET", "/movies")
    }

    //Получить информацию пользователя
    getUserInfo() {
        return this._accessServer("GET", "/users/me")
    }

    //Изменить информацию пользователя
    patchUserInfo({ name, email }) {
        return this._sendDataToServer("PATCH", "/users/me", {
            name, email
        })
    }

    saveMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieID, }) {
        return this._sendDataToServer("POST", "/movies", {
            country,
            director,
            duration,
            year,
            description,
            image,
            trailer,
            nameRU,
            nameEN,
            thumbnail,
            movieID
        })
    }

    getSavedMovies(){
        return this._accessServer("GET","/movies")
    }

    deleteMovie(movieID){
        return this._sendDataToServer("DELETE", "/movies/"+movieID)
    }

//Проверка токена
checkToken(token) {
    return this._accessServer("GET", "/users/me", {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
    })
}
//Ресет токена пользователя
resetToken() {
    this._options.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`
}
}

export default new MainApi({
    baseUrl: 'http://84.252.131.4',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
});;