import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    //подписка на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext)

    //определяем, владельца текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    //переменная в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `elements__remove-button ${isOwn ? 'elements__remove-button_visible' : 'elements__remove-button_hidden'}`
    );

    //определяем, наличие у карточки лайка
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    //переменная в `className` для кнопки лайк
    const cardLikeButtonClassName = `elements__like ${isLiked && 'elements__like_active'}`

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="elements__card">
            <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="elements__description">
                <h2 className="elements__title">{card.name}</h2>
                <div className="element__like_ui">
                    <button type="button" className={cardLikeButtonClassName} aria-label="Нравиться" onClick={handleLikeClick}></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </li>
    );
}

export default Card;