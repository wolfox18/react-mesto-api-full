import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onLikeClick, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleImageClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onLikeClick(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button transparent-btn ${
    isOwn ? "" : "element__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `element__like transparent-btn transparent-btn_opacity_medium ${
    isLiked ? "element__like_active" : ""
  }`;

  return (
    <li className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        onClick={handleImageClick}
        src={card.link}
        alt={card.name}
        className="element__image"
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            onClick={handleLikeClick}
            aria-label="Нравится"
            type="button"
            className={cardLikeButtonClassName}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
