import Auth from '../../network/auth';
import Show from '../../utlis/ShowCustomDialog';
import ErrorHandler from '../../utlis/ErrorHandler';
import { Utils } from '../../utlis/Utlis';
import CheckUserAuth from './check-user-auth';
import Config from '../../config/config';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();

    Utils.unloggedNavbar();
    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
      this._showLoading(true);
      try {
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
        Show.successDialog('Login Berhasil! silahkan Tutup Pesan ini untuk Lanjut !', () => {
          this._goToDashboardPage();
        });
      } catch (error) {
        this._showLoading(false);
        console.error(ErrorHandler(error));
        Show.errorDialog(ErrorHandler(error));
      }
    }
  },

  _showLoading(isLoading) {
    const loadingPlayer = document.querySelector('#loading-player');
    const submitBtn = document.querySelector('#submit-btn');
    if (isLoading) {
      loadingPlayer.classList.remove('d-none');
      submitBtn.classList.add('d-none');
    } else {
      loadingPlayer.classList.add('d-none');
      submitBtn.classList.remove('d-none');
    }
  },

  _getFormData() {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Login;
