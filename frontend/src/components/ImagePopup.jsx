import popupCloseIcon from "../images/close-icon.svg";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_place_image ${!card ? "" : "popup_opened"}`}>
      <div className="popup__container popup__container_place_image">
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__button-close"
          onClick={onClose}
        >
          <img
            className="popup__close-icon"
            src={popupCloseIcon}
            alt="Крестик закрытия"
          />
        </button>
        <img className="popup__image-item" src={card?.link} alt={card?.name} />
        <h2 className="popup__title-image">{card?.name}</h2>
      </div>
    </div>
  );
}
