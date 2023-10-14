import { html, nothing } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class CustomInput extends LitWithoutShadowDom {
  static properties = {
    type: { type: String, reflect: true },
    value: { type: String, reflect: true },
    inputLabel: { type: String, reflect: true },
    inputID: { type: String, reflect: true },
    invalidMsg: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
  };
  constructor() {
    super();
    this._validateProperty();

    this.type = 'text';
    this.required = false;
  }


  _validateProperty() {
    if (!this.hasAttribute('inputID')) {
      throw new Error(`Atribut "inputID" harus diterapkan pada elemen ${this.localName}`);
    } else if (!this.hasAttribute('invalidMsg')) {
      throw new Error(`Atribut "invalidMsg" harus diterapkan pada elemen ${this.localName}`);
    } else if (!this.hasAttribute('inputLabel')) {
      throw new Error(`Atribut "inputLabel" harus diterapkan pada elemen ${this.localName}`);
    }
  }
  render() {
    return html`
      <div class="form-floating col">
        <input
          id=${this.inputID || nothing}
          class="form-control"
          type=${this.type}
          value=${this.value || nothing}
          ?required=${this.required}
          @input=${(e) => (this.value = e.target.value)}
        />
        <label for=${this.inputID} class="form-label">${this.inputLabel}</label>
        <div class="invalid-feedback">${this.invalidMsg}</div>
      </div>
    `;
  }
}

customElements.define('input-custom', CustomInput);