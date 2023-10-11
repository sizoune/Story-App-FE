import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

class HeaderApp extends LitWithoutShadowDom {
  brandName = BRAND_NAME;

  render() {
    return html`
      <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container ">
          <a id="navbarBrand" class="navbar-brand" href="/">
            <i class="bi bi-book"></i>
            ${this.brandName}
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <nav-links></nav-links>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('header-app', HeaderApp);