import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

//картинки в popup-ах
import elementImageDelete from "../images/element-button-urn.svg";
import elementImageLike from "../images/element-image-like.svg";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  //данные меня
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  //const isOwn = id автора карточки === id меня
  const isOwn = card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный мной
  const isLiked = card.likes.some((i) => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__image-like ${
    isLiked && "element__image-like_active"
  }`;

  //удалить карточку
  function handleDeleteClick() {
    onCardDelete(card);
  }

  //поставить лайк
  function handleLikeClick() {
    onCardLike(card);
  }

  //открытие попапа с картинкой
  function handleClick() {
    onCardClick(card);
  }
  return (
    <li className="element__card">
      {isOwn && (
        <button
          aria-label="Удалить карточку"
          type="button"
          className="element__delete"
          onClick={handleDeleteClick}
        >
          <img
            className="element__image-delete"
            src={elementImageDelete}
            alt="урна для удаления"
          />
        </button>
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__box">
          <button
            aria-label="Поставить лайк"
            type="button"
            className="element__like"
          >
            <img
              className={cardLikeButtonClassName}
              src={elementImageLike}
              alt="лайк"
              onClick={handleLikeClick}
            />
          </button>
          <p className="element__like-lot">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;
