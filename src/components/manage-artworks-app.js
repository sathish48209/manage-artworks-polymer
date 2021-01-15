import {
  LitElement,
  html,
  css
} from 'lit-element';
import './navbar/navbar';
import './dashboard/dashboard';
import './page-not-found';
import './workflow/newProject';
import './workflow/allProjects';
import './workflow/myProjects';
import './workflow/inbox';
import './search/browse';
import './search/search';
import './reports/reports';
import {
  installRouter
} from 'pwa-helpers/router.js';
import {
  connect
} from 'pwa-helpers/connect-mixin.js';
import {
  store
} from '../store.js';
import {
  navigate
} from '../actions/appActions.js';

class ManageArtworksApp extends connect(store)(LitElement) {

  static get properties() {
    return {
      _page: {
        type: String
      }
    };
  }

  static get styles() {
    return css `
      :host {
        display: flex;
        --paper-font-common-base_-_font-family: 'Lato', sans-serif;
      }

      .main-content {
        padding: 1rem;
        width: 100%;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }
    `;
  }

  render() {
    return html `
      <!-- Navbar Section -->
      <nav-bar></nav-bar>

      <!-- Main content -->
      <main role="main" class="main-content">
        <app-dashboard class="page" ?active=${ this._page === 'dashboard' }></app-dashboard>
        <new-project class="page" ?active=${ this._page === 'newProject' }></new-project>
        <my-projects class="page" ?active=${ this._page === 'myProjects' }></my-projects>
        <all-projects class="page" ?active=${ this._page === 'allProjects' }></all-projects>
        <app-inbox class="page" ?active=${ this._page === 'inbox' }></app-inbox>
        <app-search class="page" ?active=${ this._page === 'search' }></app-search>
        <app-browse class="page" ?active=${ this._page === 'browse' }></app-browse>
        <app-reports class="page" ?active=${ this._page === 'reports' }></app-reports>
        <page-not-found class="page" ?active="${this._page === 'view404'}"></page-not-found>
      </main>
    `;
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
  }

  stateChanged(state) {
    this._page = state.appReducer.page;
  }
}

window.customElements.define('manage-artworks-app', ManageArtworksApp);