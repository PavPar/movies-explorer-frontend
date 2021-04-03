import React from 'react';

export default function Footer({ marker }) {

    return (
        <footer class="footer">
            <h2 class="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div class="footer__info">
                <div class="footer__year">&#169; 2021</div>
                <ul class="footer__links">
                    <li class="footer__link">Яндекс.Практикум</li>
                    <li class="footer__link">Github</li>
                    <li class="footer__link">Facebook</li>
                </ul>
            </div>
        </footer>
    )
}
