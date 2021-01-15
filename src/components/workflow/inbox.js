import {
  LitElement,
  html
} from 'lit-element';
import '../components/app-components';

export class AppInbox extends LitElement {
  constructor() {
    super();
    this.title = "My Inbox (Artwork Approval Process)";
  }

  render() {
    return html `
      <app-components .title=${ this.title }></app-components>
    `;
  }
}

customElements.define('app-inbox', AppInbox);