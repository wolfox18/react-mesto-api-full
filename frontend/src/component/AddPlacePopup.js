import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({ name, link });
  }

  function handeNameChange(e) {
    setName(e.target.value);
  }

  function handeLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setLink("");
    setName("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-element"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        name="name"
        required
        placeholder="Название"
        type="text"
        id="place"
        value={name}
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_type_place"
        onChange={handeNameChange}
      />
      <span className="popup__error-message place-error"></span>
      <input
        name="link"
        required
        placeholder="Ссылка на картинку"
        id="url"
        type="url"
        value={link}
        className="popup__input popup__input_type_url"
        onChange={handeLinkChange}
      />
      <span className="popup__error-message url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
