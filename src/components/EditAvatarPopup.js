import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoadingData }) {

    const avatarRef = React.useRef();

    //обработчик сабмита формы (обновление аватарки)
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    //очистка поля для ввода url аватара
    React.useEffect(() => { avatarRef.current.value = '' }, [isOpen])

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            btnText="Сохранить"
            loadingButtonText="Сохранение..."
            isLoadingData={isLoadingData}
        >
            <input className="popup__item popup__item-avatar" name="avatar" id="input-link" ref={avatarRef} type="url" placeholder="Ссылка на аватарку" required />
            <span className="input-link-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;