import React from 'react';
import FormField from './FormField'

import logo from '../images/logo.svg'

export default function Login({ handleSubmit, handleRedirect }) {

    return (
        <section class="auth">
            <img class="auth__logo" src={logo} alt="лого"></img>
            <h2 class="auth__title">Рады видеть!</h2>
            <form class="form">
                <FormField name="E-mail" type="email"></FormField>
                <FormField name="Пароль" type="password"></FormField>
            </form>
            <div class="auth__controlls">
                <button class="auth__btn auth__btn_action-submit">Войти</button>
                <p class="auth__text">Ещё не зарегистрированы?</p>
                <button class="auth__btn auth__btn_action-redirect">Регистрация</button>
            </div>
        </section>
    )
}

