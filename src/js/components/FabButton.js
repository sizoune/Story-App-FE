import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class FabButton extends LitWithoutShadowDom {
  static properties = {
    url: { String },
  };
  constructor() {
    super();
  }
  render() {
    return html`
      <div class="dropup position-fixed bottom-0 end-0  m-5">
        <a class="btn fab rounded-circle bg-primary text-white" href="${this.url}" title="Add Story">
          <i class="bi bi-plus-lg justify-content-center" style="font-size: 30px;"></i>
        </a>  
      </div>
    `;
  }
}

customElements.define('fab-button', FabButton);