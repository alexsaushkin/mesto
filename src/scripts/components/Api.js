export default class Api{
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._methodsWithBody = ['PATCH', 'POST', 'PUT'];
  }

  _request(url, method = 'GET', params = {}) {
    const options = {
      method,
      headers: this._headers,
    };

    if (this._methodsWithBody.includes(method)) {
      options['body'] = JSON.stringify(params);
    }

    return fetch(`${this._baseUrl}/${url}`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  _get(url, method = 'GET', params = {}, ) {
    return this._request(url, method, params)
      .then(data => {
        return data;
      })
  }

  getProfile() {
    return this._get('users/me');
  }

  editProfile(params) {
    return this._get('users/me', 'PATCH', params);
  }

  updateAvatar(params) {
    return this._get('users/me/avatar', 'PATCH', params);
  }

  getInitialCards() {
    return this._get('cards');
  }

  addNewCard(params) {
    return this._get('cards', 'POST', params);
  }

  deleteCard(cardId) {
    return this._get(`cards/${cardId}`, 'DELETE');
  }

  likeCard(cardId) {
    return this._get(`cards/${cardId}/likes`, 'PUT');
  }

  dislikeCard(cardId) {
   return this._get(`cards/${cardId}/likes`, 'DELETE');
  }

}
