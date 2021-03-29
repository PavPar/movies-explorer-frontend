import React from 'react';
import FormField from './FormField'

import logo from '../images/logo.svg'

export default function Register({handleSubmit,handleRedirect}) {

    return (
        <section class="auth">
            <img class="auth__logo" src={logo} alt="лого"></img>
            <h2 class="auth__title">Добро пожаловать!</h2>
            <form class="form">
                <FormField name="Имя"></FormField>
                <FormField name="E-mail" type="email"></FormField>
                <FormField name="Пароль" type="password"></FormField>
            </form>
            <div class="auth__controlls">
                <button class="auth__btn auth__btn_action-submit">Зарегестрироваться</button>
                <p class="auth__text">Уже зарегистрированы?</p>
                <button class="auth__btn auth__btn_action-redirect">Войти</button>
            </div>
        </section>
    )
}

