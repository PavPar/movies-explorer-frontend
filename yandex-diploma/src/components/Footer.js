import React from 'react';

export default function Footer({ marker }) {

    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__info">
                <div className="footer__year">&#169; 2021</div>
                <ul className="footer__links">
                    <li className="footer__link">Яндекс.Практикум</li>
                    <li className="footer__link">Github</li>
                    <li className="footer__link">Facebook</li>
                </ul>
            </div>
        </footer>
    )
}
