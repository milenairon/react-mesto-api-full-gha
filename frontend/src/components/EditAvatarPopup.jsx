import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value, //значение рефа
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__link popup__input"
          type="url"
          placeholder="Ссылка на аватар"
          name="link"
          required
          ref={avatarRef}
        />
        <span className="popup__input-error-message link-input-error-message"></span>
      </label>
    </PopupWithForm>
  );
}
