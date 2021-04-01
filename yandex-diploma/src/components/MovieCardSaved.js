import React from 'react';

export default function MovieCard({ src, title, duration}) {

    return (
        <div className="moviecard">
            <img className="moviecard__thumbnail" src={src} alt="Thumbnail"></img>
            <div className="moviecard__info">
                <p className="moviecard__title">{title}</p>
                <button className="closebtn"></button>
                <p className="moviecard__duration">{duration}</p>
            </div>
        </div>

    )
}
