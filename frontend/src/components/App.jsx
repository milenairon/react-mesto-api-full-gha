//React
import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

//блоки
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ProtectedRouteElement from "./ProtectedRoute.js";
//попапы
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import InfoTooltip from "./InfoTooltip";
//Запросы
import api from "../utils/Api";
import * as auth from "../utils/auth";
//прочее
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import popupUnionIconCheckMark from "../images/popupUnionIconCheckMark.svg";
import popupUnionIconTheCross from "../images/popupUnionIconTheCross.svg";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [infoTooltipFailPopupOpen, setInfoTooltipFailPopupOpen] =
    React.useState(false);
  const [infoTooltipSuccessPopupOpen, setInfoTooltipSuccessPopupOpen] =
    React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [emailName, setEmailName] = React.useState(null);
  const navigate = useNavigate();

  const isSomePopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    selectedCard ||
    infoTooltipFailPopupOpen ||
    infoTooltipSuccessPopupOpen;

  //открыть попапы
  function openPopupEdit() {
    setIsEditProfilePopupOpen(true);
  }
  function openPopupAddPlace() {
    setIsAddPlacePopupOpen(true);
  }
  function openPopupEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //infoTooltip
  function openInfoTooltipFail() {
    setInfoTooltipFailPopupOpen(true);
  }
  function openInfoTooltipSuccess() {
    setInfoTooltipSuccessPopupOpen(true);
    setLoggedIn(true);
  }

  function handleLoggedInFalse() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  //закрытие на темный фон
  const handleOverlayClose = React.useCallback((event) => {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }, []);

  //закрытие на esc
  const handleCloseByEsc = React.useCallback((event) => {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }, []);

  //закрыть все попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipFailPopupOpen(false);
    setInfoTooltipSuccessPopupOpen(false);
  }

  //поставить лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id); // i._id === currentUser._id
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }

  //удалить карточку
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные массива карточек
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cardList) => cardList.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }

  //вставить данные из формы
  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, job: about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }

  //поменять картинку аватара
  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }

  //добавить новую карточку
  function handleAddPlaceSubmit({ name, link }) {
    api
      .createNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }

  //закрытие попапа на темный фон и esc
  React.useEffect(() => {
    if (isSomePopupOpen) {
      document.addEventListener("keydown", handleCloseByEsc);
      document.addEventListener("click", handleOverlayClose);
      return () => {
        document.removeEventListener("keydown", handleCloseByEsc);
        document.removeEventListener("click", handleOverlayClose);
      };
    }
  }, [isSomePopupOpen]);

  //ПРОВЕРКА ТОКЕНА
  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      return auth
        .checkValidityToken(jwt)
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setLoggedIn(true);
            setEmailName(res.email);
            navigate("/main", { replace: true });
          }
        })
        .then(() => {})
        .catch((error) => {
          //если запрос не ушел
          console.log(error);
        });
    }
  }

  // получение карточек и данных юзера
  function getUsersACards() {
    if (loggedIn) {
      return Promise.all([api.getUserInfo(), api.getAllCards()]).then(
        ([user, cardList]) => {
          setCurrentUser(user);
          setCards(cardList.data);
        }
      );
    }
  }
  
  async function EnterWithoutSign() {
    try {
      await tokenCheck(); // токен
      await getUsersACards(); // получение карточек и данных юзера
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    if(localStorage.getItem("jwt")) {
      EnterWithoutSign();
    }
}, [navigate]);

  //ИЗМЕНЕНИЕ ИНПУТОВ
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  //РЕГИСТРАЦИЯ
  function handleSubmitRegister(e) {
    e.preventDefault();
    auth
      .register(formValue.email, formValue.password)
      .then(() => {
        openInfoTooltipSuccess();
        navigate("/signin");
      })
      .catch(() => {
        openInfoTooltipFail();
      });
  }

  //ВХОД В СИСТЕМУ
  function handleSubmitLogin(e) {
    e.preventDefault();
    auth
      .authorize(formValue.email, formValue.password)
      .then((res) => {
        if (res) {
          setEmailName(formValue.email);
          setLoggedIn(true);
          navigate("/main", { replace: true });
        } else {
          openInfoTooltipFail();
        }
      })
      .catch(() => {
        openInfoTooltipFail();
      });
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route
              path="/main"
              element={
                <>
                  <Header
                    email={emailName}
                    anotherPage="Выйти"
                    pathPage="/signin"
                    onClick={handleLoggedInFalse}
                  />
                  <ProtectedRouteElement
                    element={Main}
                    loggedIn={loggedIn}
                    cards={cards}
                    onEditProfile={openPopupEdit}
                    onAddPlace={openPopupAddPlace}
                    onEditAvatar={openPopupEditAvatar}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Header anotherPage="Регистрация" pathPage="/signup" />
                  <Login
                    onSubmit={handleSubmitLogin}
                    handleChangeInput={handleChangeInput}
                    email={formValue.email}
                    password={formValue.password}
                  />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Header anotherPage="Войти" pathPage="/signin" />
                  <Register
                    onSubmit={handleSubmitRegister}
                    handleChangeInput={handleChangeInput}
                    email={formValue.email}
                    password={formValue.password}
                  />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/signup" replace />} />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name="card-delete"
            title="Вы уверены?"
            buttonText="Да"
          ></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            name="InfoTooltip-register"
            popupUnionIcon={popupUnionIconCheckMark}
            text={"Вы успешно зарегистрировались!"}
            isOpen={infoTooltipSuccessPopupOpen}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            name="InfoTooltip-login"
            popupUnionIcon={popupUnionIconTheCross}
            text={"Что-то пошло не так! Попробуйте ещё раз."}
            isOpen={infoTooltipFailPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}
