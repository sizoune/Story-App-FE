import { css, html, nothing } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class ImageInput extends LitWithoutShadowDom {
  static properties = {
    inputID: { type: String, reflect: true },
    invalidMsg: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._validateProperty();
  }

  _validateProperty() {
    if (!this.hasAttribute('inputID')) {
      throw new Error(`Atribut "inputID" harus diterapkan pada elemen ${this.localName}`);
    } else if (!this.hasAttribute('invalidMsg')) {
      throw new Error(`Atribut "invalidMsg" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <div class="input-group mb-3">
        <input type="file" class="form-control" id="${this.inputID}" accept="image/*" required />
        <div class="invalid-feedback">${this.invalidMsg}</div>
      </div>
      <div class="w-100 h-100">${this._imagePreviewHtml()}</div>
    `;
  }

  _imagePreviewHtml() {
    return html`
      <img
        class='img-thumbnail rounded mx-auto d-block d-none'
        id='imagePreview'
        alt='choosed image'
        src=''
      ></img>
    `;
  }
}

customElements.define('image-input', ImageInput);
