import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

    //подписка на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-wrap">
                    <div onClick={onEditAvatar} className="profile__avatar-overlay"></div>
                    <img className="profile__avatar" src={currentUser.avatar} alt="фото" />
                </div>
                <div className="profile__container">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={onEditProfile}></button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить"></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards
                        ? Array.from(cards).map((card) => {
                            return (<Card card={card}
                                key={card._id}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />)
                        })
                        : null}
                </ul>
            </section>
        </main>
    )
}
