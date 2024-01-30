class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
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
      headers: this._headers,
    });
  }

  //Редактирование профиля
  setUserInfo({ name, job }) {
    return this._sendRequest(`${this._url}/users/me`, {
      //Метод PATCH обычно используют для обновления уже существующей инфы
      method: "PATCH",
      headers: this._headers,
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
      headers: this._headers,
    });
  }

  //Создать новую карточку
  createNewCard(data) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  //Удалить карточку
  deleteCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //добавить/удалить лайк
  changeLike(id, isLiked) {
    const method = !isLiked ? "PUT" : "DELETE";
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: method,
      headers: this._headers,
    });
  }

  //Обновить аватар
  setUserAvatar(avatar) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-76",
  headers: {
    authorization: "aeacf97e-5e0d-4830-af6d-c3921dcf63db",
    "Content-Type": "application/json",
  },
});

export default api;
