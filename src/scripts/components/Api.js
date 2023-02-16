export default class Api{
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._methodsWithBody = ['PATCH', 'POST', 'PUT']
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

  _get(url, functionToDo, method = 'GET', params = {}, ) {
    this._request(url, method, params)
      .then(data => {
        functionToDo(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getProfile(functionToDo) {
    this._get('users/me', functionToDo);
  }

  editProfile(functionToDo, params) {
    this._get('users/me', functionToDo, 'PATCH', params);
  }

  updateAvatar(functionToDo, params) {
    this._get('users/me/avatar', functionToDo, 'PATCH', params);
  }

  getInitialCards(functionToDo) {
    this._get('cards', functionToDo);
  }

  addNewCard(functionToDo, params) {
    this._get('cards', functionToDo, 'POST', params);
  }

  deleteCard(functionToDo, cardId) {
    this._get(`cards/${cardId}`, functionToDo, 'DELETE');
  }

  likeCard(functionToDo, cardId) {
    this._get(`cards/${cardId}/likes`, functionToDo, 'PUT');
  }

  dislikeCard(functionToDo, cardId) {
    this._get(`cards/${cardId}/likes`, functionToDo, 'DELETE');
  }

}
