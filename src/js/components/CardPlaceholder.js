import { html, css, LitElement } from 'lit';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css';

class CardPlaceholderStory extends LitElement {
  static properties = {
    id: { type: String, reflect: true },
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    photoUrl: { type: String, reflect: true },
    createdAt: { type: String, reflect: true },
    isLoading: { type: String, reflect: true },
  };

  constructor() {
    super();

    this.isLoading = true;
  }
  render() {
    return html`
      <style>
        ${bootstrapCss}
      </style>
      <div class="card bordered shadow rounded placeholder-glow">
        <div class="card-body ">
          <div class="card-author fw-bold mb-2">
            <i class="bi bi-person-circle placeholder">${this.name}</i> 
          </div>
          <p class="card-text placeholder">${this.description}</p>
          <p><small class="text-body-secondary placeholder"> ${this.createdAt}</small></p>
        </div>
        <img src="/asset/placeholder.jpg" class="card-img-bottom"  alt="story-picture">
      </div>
    `;
  }
}

customElements.define('card-story-placeholder', CardPlaceholderStory);