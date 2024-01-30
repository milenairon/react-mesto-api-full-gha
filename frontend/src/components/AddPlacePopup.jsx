import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  //name
  function handleChangeName(e) {
    setName(e.target.value);
  }

  //link
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  //Submit
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({ name, link });
  }

  //сделать инпуты пустыми при открытии
  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__name popup__input"
          type="text"
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__input-error-message name-input-error-message"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__link popup__input"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__input-error-message link-input-error-message"></span>
      </label>
    </PopupWithForm>
  );
}
