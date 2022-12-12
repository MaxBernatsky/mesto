export class UserInfo {
  constructor(userName, userDescription) {
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
    };
  }

  setUserInfo(name, profession) {
    this._userName.textContent = name;
    this._userDescription.textContent = profession;
  }
}
