import {
  LitElement,
  html
} from 'lit-element';

export class AppSearch extends LitElement {
  constructor() {
    super();
    this.title = "Search Projects";
  }

  render() {
    return html `
      <app-components .title=${ this.title }></app-components>
    `;
  }
}

customElements.define('app-search', AppSearch);