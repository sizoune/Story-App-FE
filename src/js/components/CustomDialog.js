import { html, css } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import '@dotlottie/player-component';

class CustomDialog extends LitWithoutShadowDom {
  static properties = {
    dialogSvgPath: { type: String, reflect: true },
    dialogMsg: { type: String, reflect: true },
    isForeverLoop : { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._validateProperty();
    this.isForeverLoop = false;
  }

  _validateProperty() {
    if (!this.hasAttribute('dialogMsg')) {
      throw new Error(`Atribut "dialogMsg" harus diterapkan pada elemen ${this.localName}`);
    } else if (!this.hasAttribute('dialogSvgPath')) {
      throw new Error(`Atribut "dialogSvgPath" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <div class='col'>
        <dotlottie-player
          class='mx-auto'
          autoplay
          loop=${this.isForeverLoop}
          mode="normal"
          src=${this.dialogSvgPath}
          style="width: 180px"
        >
        </dotlottie-player>
      </div>
      <div class='col'>
        ${this.dialogMsg}
      </div>
    `;
  }
}

customElements.define('custom-dialog', CustomDialog);