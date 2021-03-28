import React from 'react';

export default function SearchForm() {

    return (
        <section className="searchform">
            <form className="searchform__searchbar">
                <input className="searchform__input" novalidate placeholder="Фильм"></input>
                <button type="submit" className="searchform__searchbutton"></button>
            </form>
            <div className="searchform__option">
                <p className="searchform__text">Короткометражки</p>
                <button className="switch">
                    <input className="switch__checkbox" type="checkbox"></input>
                    <div className="switch__bubble"></div>
                </button>
            </div>
            <hr className="searchform__breakline"></hr>
        </section>
    )
}
