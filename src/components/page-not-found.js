import {
  LitElement,
  html
} from 'lit-element';

class PageNotFound extends LitElement {

  render() {
    return html `
      <h1>Page Not Found</h1>
    `;
  }
}

customElements.define('page-not-found', PageNotFound);