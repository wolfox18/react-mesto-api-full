import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        name="name"
        required
        placeholder="Имя"
        type="text"
        id="name"
        value={name || ''}
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_name"
        onChange={handleNameChange}
      />
      <span className="popup__error-message name-error"></span>
      <input
        name="about"
        required
        placeholder="Информация"
        type="text"
        id="bio"
        value={description || ''}
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_type_description"
        onChange={handleDescriptionChange}
      />
      <span className="popup__error-message bio-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
