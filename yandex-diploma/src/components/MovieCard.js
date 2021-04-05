import React from 'react';

export default function MovieCardSaved({ src, title, duration}) {

    return (
        <div className="moviecard">
            <img className="moviecard__thumbnail" src={src} alt="Thumbnail"></img>
            <div className="moviecard__info">
                <p className="moviecard__title">{title}</p>
                <div className="custom-checkbox">
                    <input className="custom-checkbox__input" type="checkbox"></input>
                    <div className="custom-checkbox__bubble"></div>
                </div>
                <p className="moviecard__duration">{duration}</p>
            </div>
        </div>

    )
}
