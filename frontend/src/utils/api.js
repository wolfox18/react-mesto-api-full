import { BASE_URL } from "./utils";

class Api {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Ошибка внутри API!" + res);
  }

  _getToken() {
    return localStorage.getItem("jwt");
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
    }).then(this._handleResponse);
  }
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
    }).then(this._handleResponse);
  }
  patchUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
      body: JSON.stringify(userData),
    }).then(this._handleResponse);
  }
  postNewCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
      body: JSON.stringify(cardData),
    }).then(this._handleResponse);
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
    }).then(this._handleResponse);
  }
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
    }).then(this._handleResponse);
  }
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
    }).then(this._handleResponse);
  }
  changeAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._handleResponse);
  }
  changeLikeCardStatus(cardId, isSet) {
    return isSet ? this.addLike(cardId) : this.deleteLike(cardId);
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
