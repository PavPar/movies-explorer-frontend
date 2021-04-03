import React from 'react';
import { Link } from 'react-router-dom';

import FormField from './FormField'

import logo from '../images/logo.svg'

export default function Register({ handleSubmit }) {

    return (
        <section class="auth">
            <Link to="/" class="auth__logo">
                <img src={logo} alt="лого"></img>
            </Link>
            <h2 class="auth__title">Добро пожаловать!</h2>
            <form class="form">
                <FormField name="Имя"></FormField>
                <FormField name="E-mail" type="email"></FormField>
                <FormField name="Пароль" type="password"></FormField>
            </form>
            <div class="auth__controlls">
                <button class="auth__btn auth__btn_action-submit" onClick={handleSubmit}>Зарегестрироваться</button>
                <p class="auth__text">Уже зарегистрированы?</p>
                <Link to="/signin" class="auth__btn auth__btn_action-redirect">Войти</Link>
            </div>
        </section>
    )
}

