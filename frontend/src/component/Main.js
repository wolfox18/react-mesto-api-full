import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardLike(card) {
    onCardLike(card);
  }

  function handleCardDelete(card) {
    onCardDelete(card);
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
          <button
            onClick={onEditAvatar}
            className="profile__change-avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-block">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              aria-label="Редактировать профиль"
              type="button"
              className="profile__edit-btn transparent-btn"
            />
          </div>

          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          aria-label="Добавить запись"
          type="button"
          className="profile__post-add transparent-btn"
        />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((cardData) => (
            <Card
              key={cardData._id}
              card={cardData}
              onCardClick={onCardClick}
              onLikeClick={handleCardLike}
              onDeleteClick={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
