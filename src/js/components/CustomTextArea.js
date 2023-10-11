import { html, nothing } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class CustomTextArea extends LitWithoutShadowDom {
  static properties = {
    value: { type: String, reflect: true },
    textAreaLabel: { type: String, reflect: true },
    textAreaID: { type: String, reflect: true },
    invalidMsg: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
  };
  constructor() {
    super();
    this._validateProperty();
  }
  _validateProperty() {
    if (!this.hasAttribute('textAreaID')) {
      throw new Error(`Atribut "textAreaID" harus diterapkan pada elemen ${this.localName}`);
    } else if (!this.hasAttribute('invalidMsg')) {
      throw new Error(`Atribut "invalidMsg" harus diterapkan pada elemen ${this.localName}`);
    } else if (!this.hasAttribute('textAreaLabel')) {
      throw new Error(`Atribut "textAreaLabel" harus diterapkan pada elemen ${this.localName}`);
    }
  }
  render() {
    return html`
      <div class="form-floating col">
        <textarea
          class="form-control"
          id=${this.textAreaID}
          value="${this.value || nothing}"
          style="height: 130px;"
          required
        ></textarea>
        <label for=${this.textAreaID} class="form-label">${this.textAreaLabel}</label>
        <div class="invalid-feedback">${this.invalidMsg}</div>
      </div>
    `;
  }
}

customElements.define('text-area-custom', CustomTextArea);