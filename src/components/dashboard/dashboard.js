import {
  LitElement,
  html,
  css
} from 'lit-element';
import './dashboard-tile';
import '../components/app-components';
import {
  connect
} from 'pwa-helpers';
import {
  store
} from '../../store.js';
import {
  _loadDashboardMetrics
} from '../../actions/appActions.js';
import '@polymer/paper-toolbar';
import {
  utilityClasses
} from '../../styles/styles';

export class AppDashboard extends connect(store)(LitElement) {

  static get styles() {
    return [
      utilityClasses,
      css `
        .dashboard-parent {
          display: flex;
          gap: 20px;
        }

        h2 {
          font-size: 1.3em;
          font-weight: 600;
        }
      `
    ]
  }

  static get properties() {
    return {
      dashboardMetrics: {
        type: Array
      }
    }
  }

  constructor() {
    super();
    this.spinnerActive = true;
    this.dashboardMetrics = [];
    this.title = 'My Inbox (Artwork Approval Process)';
    _loadDashboardMetrics();
  }

  stateChanged({
    appReducer
  }) {
    this.dashboardMetrics = [...appReducer.dashboardMetrics];
  }

  render() {
    return html `
      <div class="app-content">
        <!-- Dashboard Section -->
        <h2>Dashboard</h2>
        <div class="dashboard-parent">
          ${
            this.dashboardMetrics.map((dashboardData) => {
              return html`<dashboard-tile .dashboard=${dashboardData}></dashboard-tile>`
            })
          }
        </div>
        
        <!-- Components Section -->
        <div class="mt-1r">
          <app-components .title=${ this.title }></app-components>
        </div>
      </div>
    `;
  }
}

customElements.define('app-dashboard', AppDashboard);