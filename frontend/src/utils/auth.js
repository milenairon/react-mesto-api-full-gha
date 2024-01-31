export const BASE_URL = "http://localhost:3000";

//Зарегистрировать
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Acecpt: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      } else if (res.status === 400) {
        console.log("Некорректно заполнено одно из полей");
        return Promise.reject(res.status);
      } else {
        console.log(res);
        return Promise.reject(res.status);
      }
    })
    .then((res) => {
      return res;
    });
};

//Войти в систему (Авторизизировать = login)
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      // Acecpt: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      // console.log(`res ${res}`);
      // console.log(res.json);
      if (res.ok) {
        // console.log("try to return res.json");
        return res.json();
      } else if (res.status === 400) {
        console.log("Некорректно заполнено одно из полей");
      } else if (res.status === 401) {
        console.log("Пользователь с email не найден");
      } else {
        console.log(res);
      }
    })
    .then((data) => {
      localStorage.setItem("jwt", data._id);
      // console.log(data._id);
      return data._id;
    });
};

//Проверить валидность токена
export const checkValidityToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 400) {
          console.log("Токен не передан или передан не в том формате");
        } else if (res.status === 401) {
          console.log("Переданный токен некорректен");
        } else {
          console.log(res);
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      return res;
    });
};
