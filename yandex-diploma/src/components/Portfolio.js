import React from 'react';

export default function Portfolio({marker}) {
    return (
        <section className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <ul className="link-list">
                <li className="link-list__element">
                    <p className="link-list__text">Статичный сайт</p>
                    <a href="https://github.com/yandex-praktikum/how-to-learn" className="link-list__marker"></a>
                </li>
                <li className="link-list__element">
                    <p className="link-list__text">Адаптивный сайт</p>
                    <a href="https://github.com/PavPar/mesto" className="link-list__marker"></a>
                </li>
                <li className="link-list__element">
                    <p className="link-list__text">Одностраничное приложение</p>
                    <a href="https://github.com/PavPar/react-mesto-auth" className="link-list__marker"></a>
                </li>
            </ul>
        </section>
    )
}
