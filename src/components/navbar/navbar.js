import {
  LitElement,
  html,
  css
} from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map';
import {
  _loadNavbarDetails
} from '../../actions/appActions';
import {
  connect
} from 'pwa-helpers';
import {
  store
} from '../../store.js';

import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/notification-icons';
import '@polymer/iron-icons/device-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-tooltip';

class NavBar extends connect(store)(LitElement) {

  static get properties() {
    return {
      drawerOpened: {
        type: Boolean
      },
      drawerWidth: {
        type: String
      },
      drawerClasses: {
        type: Object
      },
      drawerContainerClasses: {
        type: Object
      },
      navbarMetrics: {
        type: Array
      }
    }
  }

  constructor() {
    super();
    this.drawerOpened = true;
    this.drawerWidth = '240px';
    this.drawerClasses = {
      closed: !this.drawerOpened,
      'app-drawer': true
    };
    this.drawerContainerClasses = {
      closed: !this.drawerOpened,
      'app-drawer-container': true
    };
    _loadNavbarDetails();
  }

  stateChanged({
    appReducer
  }) {
    this.navbarMetrics = [...appReducer.navbarMetrics];
  }

  static get styles() {
    return css `
			.app-drawer-container {
				width: 240px;
				height: 100vh;
				transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
			}
			.app-drawer-container.closed {
				width: 72px;
			}
			.app-drawer {
				display: flex;
				flex-direction: column;
				flex: 1 0 auto;
				
				position: fixed;
				top: 0;
				left: 0;
				bottom: 0;
				right: auto;
				
				width: 240px;

				background-color: #263238;
				color: #eceff1;
				border-right: 1px solid rgba(0, 0, 0, 0.12);

				transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
				outline: 0;
				z-index: 1200;
				overflow-y: auto;
				overflow-x: hidden;
				-webkit-overflow-scrolling: touch;
				white-space: nowrap;
			}

			.app-drawer.closed {
				width: 72px;
			}

			.app-drawer .logo-section {
				display: flex;
				padding: 0px 8px;
				min-height: 56px;
				align-items: center;
				justify-content: space-between;
				min-height: 64px;
			}

			.app-drawer .logo-section .logo {
				background-image: url(../../images/company-logo.png);
				width: 150px;
				height: 40px;
				display: block;
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center;
			}

			paper-icon-button.drawer {
				width: 48px;
				height: 48px;
				padding: 12px;
			}

			hr {
				background-color: #455a64;
				border: none;
				height: 1px;
				margin: 0;
				flex-shrink: 0;
      }
      
      a {
        text-decoration: none;
        color: #eceff1;
      }

			.nav-ul-list {
				margin: 0;
				padding: 0;
				position: relative;
				list-style: none;
				padding-top: 8px;
  			padding-bottom: 8px;
			}

			.nav-list-item {
				width: 100%;
				display: flex;
				position: relative;
				box-sizing: border-box;
				text-align: left;
				align-items: center;
				padding-top: 8px;
				padding-bottom: 8px;
				justify-content: flex-start;
				text-decoration: none;
				padding-left: 16px;
				padding-right: 16px;
				transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
				cursor: pointer;
			}

			.nav-link-text-container {
				flex: 1 1 auto;
				min-width: 0;
				margin-top: 4px;
				margin-bottom: 4px;
			}

			.nav-link-text-container .nav-link-text {
				display: block;
				font-size: 1rem;
				font-weight: 400;
				line-height: 1.5;
				letter-spacing: 0.00938em;
				margin: 0;
			}

			.nav-link-icon {
				display: inline-flex;
				min-width: 56px;
				flex-shrink: 0;
			}

			.nav-link-icon paper-icon-button {
				padding: 0;
				width: 24px;
				height: 24px;
			}

			.nav-list-header {
				color: #607d8b;  top: 0;
				z-index: 1;
				position: sticky;
				background-color: inherit;
				padding-left: 16px;
				padding-right: 16px;
				font-size: 0.875rem;
				box-sizing: border-box;
				list-style: none;
				font-weight: 500;
				line-height: 48px;
			}
		`;
  }

  render() {
    return html `
			<div class=${classMap(this.drawerContainerClasses)}>
				<div class=${classMap(this.drawerClasses)}>
					<div class="logo-section">
						${
							this.drawerOpened ?
							html`<a href="/"><div class="logo"></div></a>` :
							``
						}
						<paper-icon-button icon="menu" class="drawer" @click="${ this.toggleDrawer }"></paper-icon-button>
					</div>
					<hr>
	
					${
						this.navbarMetrics.map((navData) => {
							return html`
								<ul class="nav-ul-list">
									${
										navData.title ?
										html`
											${
												navData.to ?
												html`
													<a href="${navData.to}">
														<li class="nav-list-header">
															${
																this.drawerOpened ?
																html`<span>${ navData.title }</span>` :
																html`
																	<span id=${ navData.id }>${ navData.shortName }</span>
																	<paper-tooltip for=${ navData.id } position="top" animation-delay="0">${ navData.title }</paper-tooltip>
																`
															}
														</li>
													</a>
												` :
												html`
													<li class="nav-list-header">
														${
															this.drawerOpened ?
															html`<span>${ navData.title }</span>` :
															html`
																<span id=${ navData.id }>${ navData.shortName }</span>
																<paper-tooltip for=${ navData.id } position="top" animation-delay="0">${ navData.title }</paper-tooltip>
															`
														}
													</li>
												`
											}
										` :
										``
									}
									${
										navData.links.map((navLink) => {
											return html`
												<a href="${navLink.to}">
													<div class="nav-list-item">
														<div class="nav-link-icon">
															${
																this.drawerOpened ?
																html`<paper-icon-button icon="${ navLink.icon }"></paper-icon-button>` :
																html`
																	<paper-icon-button id=${ navLink.id } icon="${ navLink.icon }"></paper-icon-button>
																	<paper-tooltip for=${ navLink.id } position="top" animation-delay="0">${ navLink.name }</paper-tooltip>
																`
															}
														</div>
														<div class="nav-link-text-container">
															<span class="nav-link-text">${ navLink.name }</span>
														</div>
													</div>
												</a>
											`;
										})
									}
								</ul>
								<hr>
							`;
						})
					}
				</div>
			</div>
		`;
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
    this.drawerClasses.closed = !this.drawerOpened;
    this.drawerContainerClasses.closed = !this.drawerOpened;
  }
}

customElements.define('nav-bar', NavBar);