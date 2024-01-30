import popupCloseIcon from "../images/close-icon.svg";

export default function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_place_${props.name} ${
        !props.isOpen ? "" : "popup_opened"
      }`}
    >
      <div className={`popup__container popup__container_place_${props.name}`}>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__button-close"
          onClick={props.onClose}
        >
          <img
            className="popup__close-icon"
            src={popupCloseIcon}
            alt="Крестик закрытия"
          />
        </button>
        <div className='popup__wrapper'>
        <img
            className="popup__union-icon"
            src={props.popupUnionIcon}
            alt="Галочка или крестик"
          />
          <p className='popup__text'>{props.text}</p>
        </div>
      </div>
    </div>
  );
}
