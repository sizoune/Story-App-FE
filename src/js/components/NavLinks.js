import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLinks extends LitWithoutShadowDom {
  render() {
    return html`
      <ul class="navbar-nav d-flex align-items-center gap-3">
        <nav-link class="d-none" content="Add Story as Guest" to="/add-story.html" id='guest'></nav-link>
        <nav-link content="Dashboard" to="/" id='dashboard'></nav-link>
        <nav-link content="About Us" to="/about-us.html" id='about'></nav-link>
        <nav-link-auth class="d-none" id="userLoggedMenu"></nav-link-auth>
      </ul>
    `;
  }
}

customElements.define('nav-links', NavLinks);