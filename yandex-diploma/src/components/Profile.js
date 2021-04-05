import React from 'react'

import Header from './Header'
import Footer from './Footer';
import HeaderNav from './HeaderNav'
import ReactTestUtils from 'react-dom/test-utils';
import FormInput from './FormInput';

import logo from '../images/logo.svg'
import { useState, useEffect, useRef } from 'react';

export default function Profile({ userInfo, handleLogout, handlePatch }) {
    const emailRef = useRef()
    const nameRef = useRef()

    const [email, setEmail] = useState(userInfo.email);
    const [name, setName] = useState(userInfo.name);
    const [title,setTitle] = useState("")

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
                const {name,email} = res;
                setName(name);
                setEmail(email);
                setTitle(name)
            })
            .catch((err) => {
                console.log(err)
                // setPopupMsg(statusErrMsg[err.status] || "Возникла неизвестная ошибка")
                // setStatusPopupOpen(true)
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
                    />

                </form>
                <div className="profile__controlls">
                    <button
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
            <Footer></Footer>
        </>
    )
}
