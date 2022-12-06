import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        ref={inputRef}
        name="link"
        required
        placeholder="Ссылка на аватар"
        id="avatar-url"
        type="url"
        className="popup__input popup__input_type_url"
      />
      <span className="popup__error-message avatar-url-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
