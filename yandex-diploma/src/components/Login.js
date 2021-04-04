/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { useState, useEffect, useRef } from 'react';
import { Link ,useHistory} from 'react-router-dom';

import FormField from './FormField'

import logo from '../images/logo.svg'

export default function Login({ handleSubmit }) {
    const history = useHistory();

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const [isFormValid, setFormValidity] = React.useState(false);
    const [isEmailValid, setEmailValidity] = React.useState(false);
    const [isPasswordValid, setPasswordValidity] = React.useState(false);
    const [isReadyForSubmit, setReadyForSubmit] = React.useState(false)

    const inputValidity = [isEmailValid, isPasswordValid]

    const emailRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        setFormValidity(!inputValidity.some((input) => !input));
    }, [inputValidity])


    useEffect(() => {
        setReadyForSubmit(false)
        if (!isFormValid) {
            return
        }
        handleSubmit({ email, password })
            .then((res) => {
                console.log(res);
                history.push('/movies')
            })
            .catch((err) => {
                console.log(err)
                // setPopupMsg(statusErrMsg[err.status] || "Возникла неизвестная ошибка")
                // setStatusPopupOpen(true)
            })
        setFormValidity(false)

    }, [isReadyForSubmit])

    return (
        <section className="auth">
            <Link to="/" className="auth__logo">
                <img src={logo} alt="лого"></img>
            </Link>
            <h2 className="auth__title">Рады видеть!</h2>
            <form className="form">
                <FormField 
                name="E-mail" 
                type="email" 
                required 
                onValidityChange={
                    (state) => {
                        setEmailValidity(state.valid);
                        setEmail(state.value);
                    }
                }
                inputRef={emailRef}
                ></FormField>
                <FormField 
                name="Пароль" 
                type="password" 
                required
                onValidityChange={
                    (state) => {
                        setPasswordValidity(state.valid);
                        setPassword(state.value);
                    }
                }
                inputRef={passwordRef}
                >

                </FormField>
            </form>
            <div className="auth__controlls">
                <button 
                className="auth__btn auth__btn_action-submit" 
                disabled={!isFormValid}
                style={isFormValid?{"backgroundColor":"green"}:{"backgroundColor":"red"}} 
                onClick={(event) => {
                    event.preventDefault();
                    ReactTestUtils.Simulate.change(emailRef.current);
                    ReactTestUtils.Simulate.change(passwordRef.current);
                    setReadyForSubmit(true);
                }}>Войти</button>
                <p className="auth__text">Ещё не зарегистрированы?</p>
                <Link to="/signup" className="auth__btn auth__btn_action-redirect">Регистрация</Link>
            </div>
        </section>
    )
}

