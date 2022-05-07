export default function PopupWithForm({ title, name, isOpen, children, btnText, loadingButtonText, onClose, onSubmit, isLoadingData }) {
    const openedClass = isOpen && 'popup_opened'
    return (
        <section className={`popup popup_${name} ${openedClass}`}  >
            <div className="popup__container">
                <button onClick={onClose} className="popup__close-button" type="button" aria-label="Выйти"></button>
                <div className="popup__form">
                    <h2 className="popup__title">{title}</h2>
                    <form className={`popup__forms popup__form-${name}`} name={name} onSubmit={onSubmit} noValidate>
                        {children}
                        <button className="popup__submit-button " type="submit">{isLoadingData ? loadingButtonText : btnText}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

