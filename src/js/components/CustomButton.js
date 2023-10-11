import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class CustomButton extends LitWithoutShadowDom {
  static properties = {
    buttonLabel: { type: String, reflect: true },
    buttonID: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._validateProperty();
  }

  _validateProperty() {
    if (!this.hasAttribute('buttonID')) {
      throw new Error(`Atribut "buttonID" harus diterapkan pada elemen ${this.localName}`);
    } else if (!this.hasAttribute('buttonLabel')) {
      throw new Error(`Atribut "buttonLabel" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <button
        id="${this.buttonID}"
        class="btn bg-primary bordered text-white align-items-center"
        type="submit"
      >
        ${this.buttonLabel}
      </button>
    `;
  }
}

customElements.define('button-custom', CustomButton);