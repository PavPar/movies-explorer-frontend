import React from 'react';

export default function FormField({ type = "", name = "", errorMsg = "" }) {

    return (
        <div class="form__field">
            <p class="form__fieldname">{name}</p>
            <input class="form__input" type={type}></input>
            <p class="form__errorfield">{errorMsg}</p>
        </div>
    )
}
