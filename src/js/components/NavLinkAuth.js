import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { Utils } from '../utlis/Utlis';
import CheckUserAuth from '../pages/auth/check-user-auth';
import { html } from 'lit';
import Config from '../config/config';

class NavLinkAuth extends LitWithoutShadowDom {
  constructor() {
    super();
  }

  render() {
    return html`
      <li class="nav-item">
        <a
          class="nav-link text-nowrap"
          @click=${this._userLogOut}
          role="button"
          data-bs-toggle=''
        >
          <div class="me-2 d-inline-block">
            <i class="bi bi-power"></i>
          </div>
        </a>
      </li>
    `;
  }

  _userLogOut(event) {
    event.preventDefault();
    Utils.destroyUserToken(Config.USER_TOKEN_KEY);

    CheckUserAuth.checkLoginState();
  }
}

customElements.define('nav-link-auth', NavLinkAuth);