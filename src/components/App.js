import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import { useState, useEffect } from 'react';
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from "./DeletePopup";

function App() {

  //стейты
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cardForDelete, setCardForDelete] = useState(null)
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [isSubmitPopupOpen, setSubmitPopupOpen] = useState(false)
  const [cards, setCards] = useState([]);

  const [isLoadingSetUserInfo, setIsLoadingSetUserInfo] = useState(false);
  const [isLoadingAvatarUpdate, setIsLoadingAvatarUpdate] = useState(false);
  const [isLoadingAddPlaceSubmit, setIsLoadingAddPlaceSubmit] = useState(false);

  //данные с сервера информации о пользователе и карточек на страницу
  useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  //отправка данных пользователя на сервер
  function handleUpdateUser(data) {
    setIsLoadingSetUserInfo(true);
    api.profileEdit({ name: data.name, about: data.about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingSetUserInfo(false)
      })
  }

  //обновления аватара пользователя
  function handleUpdateAvatar(data) {
    setIsLoadingAvatarUpdate(true);
    api.editAvatar({ avatar: data.avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingAvatarUpdate(false);
      })
  }

  //установка лайков
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => c._id === card._id ? res : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //удаление карточки
  function handleCardDelete(evt) {
    evt.preventDefault();
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardForDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    setIsLoadingAddPlaceSubmit(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingAddPlaceSubmit(false);
      })
  }

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
  //открывает попап подтверждения удаления
  function handleCardDeleteChoice(card) {
    setSubmitPopupOpen(true)
    setCardForDelete(card)
  }
  //закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard({})
    setSubmitPopupOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDeleteChoice}
        />
        <Footer />

        {/**попап редактирования профиля*/}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoadingData={isLoadingSetUserInfo} />

        {/**попап добавления карточки*/}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoadingData={isLoadingAddPlaceSubmit} />

        {/**попап редактирования аватара*/}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoadingData={isLoadingAvatarUpdate} />

        {/**попап удаления карточки*/}
        <DeletePopup isOpen={isSubmitPopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} />

        {/**попап с картинкой*/}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}
export default App;
