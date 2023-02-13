export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const info = {
      name: this._name.textContent,
      about: this._about.textContent,
    }
    return info;
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
