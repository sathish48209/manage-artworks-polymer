import {
  LitElement,
  html,
  css
} from 'lit-element';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import {
  utilityClasses
} from '../../styles/styles';

class DashboardTile extends LitElement {

  static get styles() {
    return [
      utilityClasses,
      css `
				:host {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					border-radius: 4px;
				}

				.card-header {
					background-color: #ccc;
					color: #000;
					padding: 10px;
					font-size: 1.25rem;
					border-top-right-radius: 4px;
					border-top-left-radius: 4px;
				}

				.card-content .process {
					padding: 8px 16px;
				}

				.card-content .process:not(:last-child) {
					border-bottom: 1px solid #ccc;
				}

				.card-content .process-name {
					font-size: 0.95rem;
					font-weight: 600;
				}

				.card-content .process-status .process-count-split {
					min-height: 45px;
					font-size: 0.9rem;
					font-weight: 600;
				}

				.card-content .process-status .process-count-split-type {
					min-width: 90px;
				}

				.font-red {
					color: red;
				}

				.font-green {
					color: green;
				}

				paper-button.custom {
					min-width: 50px;
					font-weight: bold;
					border-radius: 7px;
					font-size: 1.6rem;
					padding: 0;
					line-height: 1.75;
					min-width: 64px;
				}

				paper-button.indigo {
					background-color: #00ACC1;
					color: white;
				}
			`
    ]
  }

  render() {
    return html `
			<paper-card>
				<div class="card-header fw-700">
					${ this.dashboard.title }
				</div>

				<div class="card-content py-8">
					${
						this.dashboard.processes.map((process) => {
							return html`
								<div class="process flex align-center justify-between">
									<div class="process-name">${ process.name }</div>
										<div class="process-status flex align-center">

											<paper-button raised class="custom indigo">${ process.totalProjects }</paper-button>
											<div class="process-count-split flex flex-column justify-around">
												<div class="process-count-split-type flex justify-around">
													<div class="process-status-split-type-name">OnTime</div>
													<div class="font-green fw-900">${ process.onTimeProjects }</div>
												</div>
												<div class="process-count-split-type flex justify-around">
													<div class="process-status-split-type-name">Delayed</div>
													<div class="font-red fw-900">${ process.delayedProjects }</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							`;
						})
					}
				</div>
			</paper-card>
		`;
  }
}

customElements.define('dashboard-tile', DashboardTile);