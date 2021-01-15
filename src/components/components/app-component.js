import {
  LitElement,
  html,
  css
} from 'lit-element';
import '@polymer/paper-card';
import '@polymer/iron-icons';
import { utilityClasses } from '../../styles/styles';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import '@polymer/paper-tooltip';

export class AppComponent extends LitElement {
	static get properties () {
		return {
			viewType: { type: String },
			component: { type: Object },
			componentDescriptionStyleMap: { type: Object }
		}
	}

	static get styles () {
		return [
			utilityClasses,
			css`
				paper-card {
					display: flex;
					flex-direction: row;
					width: 100%;
					min-height: 150px;
					margin-bottom: 1rem;
					justify-content: space-between;
					overflow: hidden;
				}

				.card-image {
					display: flex;
					padding: 1rem;
					align-items: center;
					flex-direction: column;
					justify-content: center;
				}

				.card-image img {
					width: 50px;
					height: 70px;
				}

				.card-image p {
					font-weight: 700;
					margin-bottom: 0.35em;
					margin: 0;
					font-size: 1rem;
					line-height: 1.5;
					letter-spacing: 0.00938em;
				}

				.card-content {
					flex-grow: 1;
					align-self: center;
					padding: 16px;
				}

				.card-content .comp-description {
					gap: 2%;
					display: flex;
					border-bottom: 1px solid #ccc;
					flex-wrap: inherit;
					margin-left: 1rem;
					padding-bottom: 0px;
				}

				.card-content .comp-description .comp-label {
					max-width: 30%;
					flex-basis: 30%;
					margin-bottom: 0.75rem;
				}

				.card-content .comp-description .comp-label .comp-header {
					overflow: hidden;
					font-weight: 600;
					white-space: nowrap;
					margin-bottom: 0;
					text-overflow: ellipsis;
				}

				.card-content .comp-status {
					gap: 1rem;
					display: flex;
					padding: 0.5rem;
					align-items: center;
					flex-direction: row;
					justify-content: flex-end;
				}

				.card-content .comp-status p {
					color: #ef5350;
					font-weight: 700;
					margin: 0;
				}

				.status-chip {
					color: #fff;
					font-size: 1rem;
					font-weight: 700;
					background-color: #ef5350;
					border: none;
					cursor: default;
					height: 32px;
					display: inline-flex;
					outline: 0;
					padding: 0 10px;
					box-sizing: border-box;
					transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
					align-items: center;
					white-space: nowrap;
					border-radius: 16px;
					vertical-align: middle;
					justify-content: center;
				}

				.comp-reorder {
					display: flex;
					padding: 8px;
					align-items: flex-start;
				}
			`
		];
	}

	applyStylesByViewType () {
		this.componentDescriptionStyleMap = {
			'flex-wrap': (this.viewType === 'listView') ? 'inherit' : 'wrap'
		}
	}

	render() {
    this.applyStylesByViewType();
		return html`
			<paper-card style=${ styleMap({ 'flex-direction': (this.viewType === 'gridView') ? 'column' : 'row' }) }>
				<div class="card-image">
					<img src=${ this.component.imageUrl } />
					<p>Component</p>
				</div>
				<div class="card-content">
					<div class="comp-description" style=${ styleMap(this.componentDescriptionStyleMap) }>
						${
							this.component.projectDescription.map((project) => html`
								<div class="comp-label">
									<paper-tooltip for=${ project.field } position="left" animation-delay="0">${ project.title }</paper-tooltip>
									<p class="comp-header ma-0" id=${ project.field }>${ project.title }</p>
									<p class="ma-0">${ project.value }</p>
								</div>
							`)
						}
					</div>
					<div class="comp-status" style=${ styleMap({ 'flex-direction': (this.viewType === 'gridView') ? 'column' : 'row' }) }>
						<div class="status-chip">In Progress</div>
						<p>Task due 37+ days ago</p>
					</div>
				</div>
				${
					this.viewType === 'listView' ?
					html`
						<div class="comp-reorder">
							<paper-icon-button slot="top" active icon="icons:reorder"></paper-icon-button>
						</div>
					` :
					``
				}
			</paper-card>
		`
	}
}

customElements.define('app-component', AppComponent);