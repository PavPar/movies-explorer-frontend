import React from 'react';

export default function MovieCard({ src, title, duration, isOwn = false }) {

    return (
        <div class="moviecard">
            <img class="moviecard__thumbnail" src={src} alt="Thumbnail"></img>
            <div class="moviecard__info">
                <p class="moviecard__title">{title}</p>
                <div class="custom-checkbox">
                    <input class="custom-checkbox__input" type="checkbox"></input>
                    <div class="custom-checkbox__bubble"></div>
                </div>
                <p class="moviecard__duration">{duration}</p>
            </div>
        </div>

    )
}
