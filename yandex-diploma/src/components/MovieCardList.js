import React from 'react';

export default function MovieCardList({ children, isMoreBtnVisible=true }) {

    return (
        <section className="moviecardlist">
            <div className="moviecardlist__grid">
                {children}
            </div>

            {isMoreBtnVisible && (
                <div className="moviecardlist__more">
                    <button className="moviecardlist__btnmore">Ещё</button>
                </div>
            )}

        </section>
    )
}
