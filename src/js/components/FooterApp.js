import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class FooterApp extends LitWithoutShadowDom {
  render() {
    return html`
      <p>&copy; 2023 <a href='https://www.linkedin.com/in/mwildani/' target='_blank' rel='noopener noreferrer'
      >Muhammad Wildan Iskandar.</a> All rights reserved.</p>
    `;
  }
}

customElements.define('footer-app', FooterApp);