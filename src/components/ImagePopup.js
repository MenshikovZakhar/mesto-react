function ImagePopup({ card, onClose }) {
    return (
        <section className={`popup popup-image popup_image-opened ${card.link && "popup_opened"}`}>
            <div className="popup__figure-container">
                <figure className="popup__figure">
                    <img className="popup__image" src={card.link} alt={card.name} />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
                <button onClick={onClose} className="popup__close-button" type="button" aria-label="Выйти"></button>
            </div>
        </section>
    );
}

export default ImagePopup;