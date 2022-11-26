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

  setUserInfo(data) {
    this._userName.textContent = data.profileName;
    this._userDescription.textContent = data.profileProfession;
  }
}
