import Auth from '../../network/auth';
import Show from '../../utlis/ShowCustomDialog';
import ErrorHandler from '../../utlis/ErrorHandler';
import CheckUserAuth from './check-user-auth';
import { Utils } from '../../utlis/Utlis';

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();

    Utils.unloggedNavbar();
    this._initialListener();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const formData = this._getFormData();
        const passConf = document.querySelector('#pass-confirm');
        const passwordConf = document.querySelector('#password-confirmation');

        if (formData.password === formData.passwordConf) {
          passwordConf.classList.remove('is-invalid');
          passConf.setAttribute('invalidMsg','Please input Your Password Confirmation');
          registerForm.classList.add('was-validated');
          await this._doRegist(formData);
        } else {
          passConf.setAttribute('invalidMsg','Your Password Confirmation is Not Match!');
          passwordConf.classList.add('is-invalid');
        }
      },
      false,
    );
  },

  async _doRegist(formData) {
    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
      this._showLoading(true);
      try {
        const response = await Auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        // Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.results.token);
        Show.successDialog('Registrasi Berhasil! silahkan Tutup Pesan ini untuk Lanjut !', () => {
          this._goToLoginPage();
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
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const passwordConf = document.querySelector('#password-confirmation');

    return {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConf: passwordConf.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToLoginPage() {
    window.location.href = '/auth/login.html';
  },
};

export default Register;
