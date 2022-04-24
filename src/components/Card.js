function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="elements__card">
            <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="elements__description">
                <h2 className="elements__title">{card.name}</h2>
                <div className="element__like_ui">
                    <button type="button" className="elements__like" aria-label="Нравиться"></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
            <button type="button" className="elements__remove-button"></button>
        </li>
    );
}

export default Card;