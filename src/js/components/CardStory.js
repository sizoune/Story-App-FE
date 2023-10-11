import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class CardStory extends LitWithoutShadowDom {
  static properties = {
    id: { type: String, reflect: true },
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    photoUrl: { type: String, reflect: true },
    createdAt: { type: String, reflect: true },
  };

  constructor() {
    super();
  }
  render() {
    return html`
      <div class="card bordered shadow rounded">
        <div class="card-body">
          <div class="card-author fw-bold mb-2">
            <i class="bi bi-person-circle"></i> ${this.name}
          </div>
          <p class="card-text">${this.description}</p>
          <p><small class="text-body-secondary"> ${this.createdAt}</small></p>
        </div>
        <img src="${this.photoUrl}" class="card-img-bottom mx-auto d-block" alt="story-picture">
      </div>
    `;
  }
}

customElements.define('card-story', CardStory);