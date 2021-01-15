import {
  LitElement,
  html
} from 'lit-element';

export class MyProjects extends LitElement {
  constructor() {
    super();
    this.title = "My Projects";
  }

  render() {
    return html `
      <app-components .title=${ this.title }></app-components>
    `;
  }
}

customElements.define('my-projects', MyProjects);