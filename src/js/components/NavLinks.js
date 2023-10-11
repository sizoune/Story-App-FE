import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLinks extends LitWithoutShadowDom {
  render() {
    return html`
      <ul class="navbar-nav">
        <nav-link content="Dashboard" to="/"></nav-link>
        <nav-link content="About Us" to="/about-us.html"></nav-link>
      </ul>
    `;
  }
}

customElements.define('nav-links', NavLinks);