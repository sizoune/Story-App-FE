import { Utils } from '../../utlis/Utlis';
import Config from '../../config/config';

const CheckUserAuth = {
  excludeRedirectPage: ['login.html', 'register.html'],

  checkLoginState() {
    const userToken = Utils.getUserToken(Config.USER_TOKEN_KEY);
    const isUserSignedIn = Boolean(userToken);
    const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);

    if (isUserSignedIn) {
      if (isUserOnAuthPage) {
        window.location.href = '/';
      }
    } else {
      if (!isUserOnAuthPage) {
        if (!window.location.pathname.endsWith('add-story.html')) {
          window.location.href = '/auth/login.html';
        }
      }
    }
    this._showLoginMenuOrUserLogMenu(isUserSignedIn);
  },

  getUserSignedIn() {
    const userToken = Utils.getUserToken(Config.USER_TOKEN_KEY);
    return Boolean(userToken);
  },

  _showLoginMenuOrUserLogMenu(userLoginState) {
    const dashboardMenu = document.querySelector('#dashboard');
    const aboutUsMenu = document.querySelector('#about');
    const guestMenu = document.querySelector('#guest');
    const userLoggedMenu = document.querySelector('#userLoggedMenu');

    if (!userLoginState) {
      dashboardMenu?.classList.add('d-none');
      aboutUsMenu?.classList.add('d-none');
      userLoggedMenu?.classList.add('d-none');

      guestMenu?.classList.remove('d-none');

      return;
    }

    guestMenu?.classList.add('d-none');
    userLoggedMenu?.classList.add('d-block');
    dashboardMenu?.classList.add('d-block');
    aboutUsMenu?.classList.add('d-block');

    guestMenu?.classList.remove('d-block');
    userLoggedMenu?.classList.remove('d-none');
    dashboardMenu?.classList.remove('d-none');
    aboutUsMenu?.classList.remove('d-none');
  },

  _isUserOnAuthPage(pages) {
    const filteredPages = pages.filter((item) => window.location.pathname.endsWith(item));
    return Boolean(filteredPages.length);
  },
};

export default CheckUserAuth;
