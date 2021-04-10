/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'

import Header from './Header'
import Footer from './Footer';
import HeaderNav from './HeaderNav'
import ReactTestUtils from 'react-dom/test-utils';
import FormInput from './FormInput';
import InfoTooltip from './InfoTooltip'

import logo from '../images/logo.svg'
import { useState, useEffect, useRef } from 'react';
import userContext from './context/UserContext';

export default function Profile({handleLogout, handlePatch }) {
    const emailRef = useRef()
    const nameRef = useRef()

    const userInfo = useContext(userContext);

    const [email, setEmail] = useState(userInfo.email);
    const [name, setName] = useState(userInfo.name);
    const [title, setTitle] = useState("")

    const [isFormValid, setFormValidity] = React.useState(false);
    const [isEmailValid, setEmailValidity] = React.useState(false);
    const [isNameValid, setNameValidity] = React.useState(false);
    const [isReadyForSubmit, setReadyForSubmit] = React.useState(false)

    const inputValidity = [isEmailValid, isNameValid]

    useEffect(() => {
        setFormValidity(!inputValidity.some((input) => !input));
    }, [inputValidity])

    useEffect(() => {
        setReadyForSubmit(false)
        if (!isFormValid) {
            return
        }
        handlePatch({ email, name })
            .then((res) => {
                console.log(res);
                const { name, email } = res;
                setName(name);
                setEmail(email);
                setTitle(name)
                setAuthStatus(true)
                setStatusPopupOpen(true)
            })
            .catch((err) => {
                console.log(err)
                setAuthStatus(false)
                setStatusPopupOpen(true)
            })
        setFormValidity(false)

    }, [isReadyForSubmit])

    useEffect(() => {
        nameRef.current.value = userInfo.name
        emailRef.current.value = userInfo.email
        setName(userInfo.name);
        setEmail(userInfo.email);
        ReactTestUtils.Simulate.change(emailRef.current);
        ReactTestUtils.Simulate.change(nameRef.current);
    }, [userInfo])

    const [StatusPopupOpen, setStatusPopupOpen] = React.useState(false);
    const [isAuthOk, setAuthStatus] = React.useState(false);

    function closeAllPopups() {
        setStatusPopupOpen(false);
    }

    return (
        <>
            <Header src={logo} menu={true} >
                <HeaderNav isLoggedIn={true}></HeaderNav>
            </Header>
            <section className="profile">
                <h2 className="profile__title">Привет, {title || userInfo.name}!</h2>
                <form className="profile__form">
                    <p className="profile__fieldname">Имя</p>
                    <FormInput
                        className="profile__input"
                        inputRef={nameRef}
                        onValidityChange={
                            (state) => {
                                setNameValidity(state.valid);
                                setName(state.value);
                            }
                        }
                        required
                    />
                    <hr className="profile__breakline"></hr>
                    <p className="profile__fieldname" >Почта</p>
                    <FormInput
                        className="profile__input"
                        inputRef={emailRef}
                        onValidityChange={
                            (state) => {
                                setEmailValidity(state.valid);
                                setEmail(state.value);
                            }
                        }
                        minLength="6"
                        type={email}
                        required
                    />

                </form>
                <div className="profile__controlls">
                    <button
                        style={isFormValid ? { "opacity": "1" } : { "opacity": "0.5" }}
                        className="profile__btn profile__btn_action-edit"
                        onClick={(event) => {
                            event.preventDefault();
                            ReactTestUtils.Simulate.change(emailRef.current);
                            ReactTestUtils.Simulate.change(nameRef.current);
                            setReadyForSubmit(true);
                        }}
                    >Редактировать</button>
                    <button className="profile__btn profile__btn_action-logout" onClick={handleLogout}>Выйти из аккаунта</button>
                </div>
            </section>
            <InfoTooltip 
                     onClose={closeAllPopups}
                     isOpen={StatusPopupOpen}
                     isOk={isAuthOk}
                     msgText={isAuthOk ? 'Изменение прошло успешно!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
            ></InfoTooltip>
            <Footer></Footer>
        </>
    )
}
