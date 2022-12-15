export class UserInfo {
  constructor(userName, userDescription, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
      userAvatar: this._userAvatar.src,
    };
  }

  setUserInfo(name, profession, avatar) {
    this._userName.textContent = name;
    this._userDescription.textContent = profession;
    this._userAvatar.src = avatar;
  }

  setUserAvatar(data) {
    this._userAvatar.scr = data.avatar;
  }
}
