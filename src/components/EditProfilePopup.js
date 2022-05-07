import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoadingData }) {

    //стейты имени и описания профиля
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    //подписка на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    //функция изменения имени 
    function handleNameChange(e) {
        setName(e.target.value);
    }

    //функция изменения описания профиля
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    //обработчик сабмита формы
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            btnText="Сохранить"
            loadingButtonText="Загрузка..."
            onSubmit={handleSubmit}
            isLoadingData={isLoadingData}
        >
            <input className="popup__item popup__item-username" value={name || ''} onChange={handleNameChange} name="name" type="text" id="name-input" placeholder="Имя" required
                minLength="2" maxLength="40" />
            <span className="name-input-error popup__input-error"></span>
            <input className="popup__item popup__item-about" value={description || ''} onChange={handleDescriptionChange} name="about" type="text" id="about-input" placeholder="Деятельность" required
                minLength="2" maxLength="200" />
            <span className="about-input-error popup__input-error"></span>
        </PopupWithForm>
    )

}

export default EditProfilePopup;;