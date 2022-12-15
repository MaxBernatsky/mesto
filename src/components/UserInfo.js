export class UserInfo {
  constructor(userName, userDescription, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
    this._avatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
      userAvatar: this._avatar.src,
    };
  }

  setUserInfo(name, profession, avatar) {
    this._userName.textContent = name;
    this._userDescription.textContent = profession;
    this._avatar.src = avatar;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar.link;
  }
}
