import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import Card from "./Card";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    //состояние
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    //данные с сервера информации о пользователе и карточек на страницу
    useEffect(() => {
        Promise.all([api.getUserProfile(), api.getInitialCards()])
            .then(([{ name, about, avatar }, cardList]) => {
                setCards(cardList);
                setUserName(name);
                setUserDescription(about);
                setUserAvatar(avatar);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-wrap">
                    <div onClick={onEditAvatar} className="profile__avatar-overlay"></div>
                    <img className="profile__avatar" src={userAvatar} alt="фото" />
                </div>
                <div className="profile__container">
                    <h1 className="profile__title">{userName}</h1>
                    <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={onEditProfile}></button>
                    <p className="profile__subtitle">{userDescription}</p>
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
                            />)
                        })
                        : null}
                </ul>
            </section>
        </main>
    )
}
