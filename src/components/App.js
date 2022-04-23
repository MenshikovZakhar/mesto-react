import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import { useState } from 'react';
import ImagePopup from "./ImagePopup";

function App() {

  //состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });;

  //открытие попапа добавления карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  //открытие попапа редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  //открытие попапа редактирования аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  //открытие попапа с картинкой
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  //закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      {/**попап редактирования профиля*/}
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        btnText="Сохранить"
        children={<>
          <input className="popup__item popup__item-username" name="name" type="text" id="name-input" required
            minLength="2" maxLength="40" />
          <span className="name-input-error popup__input-error"></span>
          <input className="popup__item popup__item-about" name="about" type="text" id="about-input" required
            minLength="2" maxLength="200" />
          <span className="about-input-error popup__input-error"></span>
        </>}
      />

      {/**попап добавления карточки*/}
      <PopupWithForm
        name='card'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        btnText="Создать"
        children={<>
          <input className="popup__item popup__item-place" name="name" type="text" id="place-input" placeholder="Название" required
            minLength="2" maxLength="30" />
          <span className="place-input-error popup__input-error"></span>
          <input className="popup__item popup__item-link" name="link" type="url" placeholder="Ссылка на картинку" id="link-input" required
          />
          <span className="link-input-error popup__input-error"></span>
        </>}
      />

      {/**попап редактирования аватара*/}
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        btnText="Сохранить"
        children={<>
          <input className="popup__item popup__item-avatar" name="avatar" id="input-link" type="url" placeholder="Ссылка на аватарку" required />
          <span className="input-link-error popup__input-error"></span>
        </>}
      />

      {/**попап удаления карточки*/}
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>

      {/**попап с картинкой*/}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  )
}
export default App;
