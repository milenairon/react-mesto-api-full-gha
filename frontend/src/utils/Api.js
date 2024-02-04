class Api {
  constructor({ url }) {
    this._url = url;
  }
  _sendRequest(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      //если запрос ушел, но пришел ответ с ошибкой
      return new Error("Что-то пошло не так");
    });
  }

  //Получить данные профиля
  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  }

  //Редактирование профиля
  setUserInfo({ name, job }) {
    return this._sendRequest(`${this._url}/users/me`, {
      //Метод PATCH обычно используют для обновления уже существующей инфы
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    });
  }
  //Получить все карточки
  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  }

  //Создать новую карточку
  createNewCard(data) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  //Удалить карточку
  deleteCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  }

  //добавить/удалить лайк
  changeLike(id, isLiked) {
    const method = !isLiked ? "PUT" : "DELETE";
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  }

  //Обновить аватар
  setUserAvatar(avatar) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatar),
    });
  }
}

const api = new Api({
  url: "http://localhost:3000"//"https://api.milenairon.nomoredomainsmonster.ru",
});

export default api;
