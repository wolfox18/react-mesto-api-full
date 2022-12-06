import React from "react";

function ImagePopup(props) {
  const { card, isOpen, onClose } = props;
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close-btn transparent-btn"
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__image-name">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
