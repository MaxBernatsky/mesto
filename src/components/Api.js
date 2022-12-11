export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      header: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          `Ошибка: ${response.status} ${response.statusText}`
        );
      }
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          `Ошибка: ${response.status} ${response.statusText}`
        );
      }
    });
  }
}
