import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoadingData }) {

    // стейты для имени и ссылки на картинку
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    //обработчик установки названия места
    function handleNameChange(e) {
        setName(e.target.value);
    }

    //обработчик установки картинки 
    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    //обработчик сабмита формы
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({ name, link });
        setName('');
        setLink('');
    };

    return (
        <PopupWithForm
            name='card'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            btnText="Создать"
            loadingButtonText="Сохранение..."
            isLoadingData={isLoadingData}
            onSubmit={handleSubmit}
        >
            <input className="popup__item popup__item-place" onChange={handleNameChange} name="name" type="text" id="place-input" placeholder="Название" required
                minLength="2" maxLength="30" value={name} />
            <span className="place-input-error popup__input-error"></span>
            <input className="popup__item popup__item-link" name="link" value={link} onChange={handleLinkChange} type="url" placeholder="Ссылка на картинку" id="link-input" required
            />
            <span className="link-input-error popup__input-error"></span>
        </PopupWithForm>

    )
}

export default AddPlacePopup;