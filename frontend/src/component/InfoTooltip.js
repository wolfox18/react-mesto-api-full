import React from "react";

function InfoTooltip({ isOpen, onClose, message, imagePath }) {
 
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close-btn transparent-btn"
        ></button>
        <img className="popup__icon" src={imagePath} alt="Иконка сообщения" />
        <h2 className="popup__title popup__title_type_message">{message}</h2> 
      </div>
    </div>
  );
}

export default InfoTooltip;