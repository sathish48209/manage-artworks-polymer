import {
  LitElement,
  html
} from 'lit-element';

export class AppBrowse extends LitElement {
  constructor() {
    super();
    this.title = "Browse Projects";
  }

  render() {
    return html `
      <app-components .title=${ this.title }></app-components>
    `;
  }
}

customElements.define('app-browse', AppBrowse);