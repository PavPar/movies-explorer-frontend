import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ErrorPage({ code, message }) {
    let history = useHistory();

    const goToPreviousPath = () => {
        if (history.length > 2) {
            history.goBack()
        } else {
            history.push('/')
        }
    }

    return (
        <section class="error">
            <h1 class="error__code">{code}</h1>
            <p class="error__message">{message}</p>
            <button class="error__link" onClick={goToPreviousPath}>Назад</button>
        </section>
    )
}

