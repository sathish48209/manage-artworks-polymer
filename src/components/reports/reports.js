import {
  LitElement,
  html
} from 'lit-element';

export class AppReports extends LitElement {
  render() {
    return html `
      <h2>All Reports Component</h2>
    `;
  }
}

customElements.define('app-reports', AppReports);