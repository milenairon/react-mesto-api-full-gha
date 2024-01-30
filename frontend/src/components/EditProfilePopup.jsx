import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  //name
  function handleChangeName(e) {
    setName(e.target.value);
  }
  //Description
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  //Submit
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser ? currentUser.name : "");
    setDescription(currentUser ? currentUser.about : "");
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__forename popup__input"
          type="text"
          name="forename"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          required
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__input-error-message forename-input-error-message"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__job popup__input"
          type="text"
          name="job"
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          required
          value={description}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error-message job-input-error-message"></span>
      </label>
    </PopupWithForm>
  );
}
