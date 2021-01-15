import {
  LitElement,
  html
} from 'lit-element';

export class AllProjects extends LitElement {
  constructor() {
    super();
    this.title = "All Projects";
  }

  render() {
    return html `
      <app-components .title=${ this.title }></app-components>
    `;
  }
}

customElements.define('all-projects', AllProjects);