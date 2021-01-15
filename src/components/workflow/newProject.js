import {
  LitElement,
  html
} from 'lit-element';

export class NewProject extends LitElement {
  render() {
    return html `
      <h2>New Project Component</h2>
    `;
  }
}

customElements.define('new-project', NewProject);