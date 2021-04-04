import React from 'react';

export default function Portfolio({marker}) {
    return (
        <section className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <ul className="link-list">
                <li className="link-list__element">
                    <p className="link-list__text">Статичный сайт</p>
                    <img className="link-list__marker" src={marker} alt="маркер"></img>
                </li>
                <li className="link-list__element">
                    <p className="link-list__text">Адаптивный сайт сайт</p>
                    <img className="link-list__marker" src={marker} alt="маркер"></img>
                </li>
                <li className="link-list__element">
                    <p className="link-list__text">Одностраничное приложение</p>
                    <img className="link-list__marker" src={marker} alt="маркер"></img>
                </li>
            </ul>
        </section>
    )
}
