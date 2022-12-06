import React from "react";

function PopupWithForm(props) {
  const { name, title, children, isOpen, onClose, buttonText, onSubmit } =
    props;
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_form">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close-btn transparent-btn"
        />
        <form
          name={`${name}-form`}
          className="popup__form"
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>

          {children}

          <button
            aria-label={buttonText}
            type="submit"
            className="popup__save-btn transparent-btn transparent-btn_opacity_hard"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
