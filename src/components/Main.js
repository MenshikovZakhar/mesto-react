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
                const card = cardList.map((data) => {
                    return {
                        name: data.name,
                        link: data.link,
                        likes: data.likes,
                        id: data._id,
                        ownerId: data.owner._id,
                    };
                });
                setUserName(name);
                setUserDescription(about);
                setUserAvatar(avatar);
                setCards(card);
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
                    {cards.map((card) => (
                        <Card key={card.id} card={card} onCardClick={onCardClick} />
                    ))}
                </ul>
            </section>
        </main>
    )
}
