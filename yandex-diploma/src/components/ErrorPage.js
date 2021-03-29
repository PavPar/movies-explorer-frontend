import React from 'react';

export default function ErrorPage({ code, message, handleRedirect }) {

    return (
        <section class="error">
            <h1 class="error__code">{code}</h1>
            <p class="error__message">{message}</p>
            <button class="error__link" onClick={handleRedirect}>Назад</button>
        </section>
    )
}

