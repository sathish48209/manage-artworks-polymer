import {
  LitElement,
  html,
  css
} from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map';
import {
  styleMap
} from 'lit-html/directives/style-map';
import {
  connect
} from 'pwa-helpers';
import {
  store
} from '../../store.js';
import '@polymer/paper-toolbar';
import '@polymer/iron-icons/editor-icons';
import '@polymer/iron-input';
import {
  utilityClasses
} from '../../styles/styles';
import './app-component';
import {
  _loadComponentDetails
} from '../../actions/appActions';

export class AppComponents extends connect(store)(LitElement) {

  static get styles() {
    return [
      utilityClasses,
      css `
        :host {
          --paper-toolbar-height: 50px;
          --paper-toolbar-background: #ccc;
          --paper-toolbar-color: #000;
          --iron-icon-width: 40px;
        }

        .components-container {
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                      0 1px 5px 0 rgba(0, 0, 0, 0.12),
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        .title {
          font-weight: 700;
          margin-left: 1rem;
          overflow: inherit;
        }

        .input-container {
          position: relative;
          border-radius: 5px;
          background-color: #fff;
          margin-right: 1rem;
        }

        .search-input {
          width: 12ch;
          padding: 8px 8px 8px 0px;
          transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          padding-left: calc(1em + 32px);
          font: inherit;
          border: 0;
          height: 1.1876em;
          display: block;
          min-width: 0;
          background: none;
          box-sizing: content-box;
          animation-name: mui-auto-fill-cancel;
          letter-spacing: inherit;
          animation-duration: 10ms;
          -webkit-tap-highlight-color: transparent;
        }

        .search-input:focus {
          width: 20ch;
          outline: 0;
        }

        .search-icon {
          color: rgb(136, 136, 136);
          height: 70%;
          display: flex;
          padding: 0px 7px;
          z-index: 1;
          margin-top: 6px;
          position: absolute;
          align-items: center;
          pointer-events: none;
          justify-content: center;
        }

        .active {
          background-color: #424242;
          color: #fff;
        }

        .component {
          width: 100%;
          flex-direction: row;
        }
      `
    ];
  }

  static get properties() {
    return {
      viewType: {
        type: String
      },
      componentsContainerStyles: {
        type: Object
      },
      componentsContainerClasses: {
        type: Object
      },
      styleByViewMap: {
        type: Object
      },
      allProjects: {
        type: Array
      },
      searchTerm: {
        type: String
      }
    }
  }

  constructor() {
    super();
    this.allProjects = [];
    this.viewType = 'listView';
    this.componentsContainerClasses = {
      'pa-1r': true,
      'flex': true
    };
    this.componentsContainerStyles = {
      'flex-wrap': 'wrap'
    };

    this.componentStyles = {
      'flex-basis': '100%'
    }

    this.flexDirectionMap = {
      listView: 'column',
      columnView: 'row',
      gridView: 'row'
    }

    this.styleByViewMap = {
      listView: {
        'flex-basis': '100%',
        'gap': 'inherit'
      },
      columnView: {
        'flex-basis': '49%',
        'gap': '2%'
      },
      gridView: {
        'flex-basis': '32%',
        'gap': '2%'
      }
    }
    _loadComponentDetails();
  }

  stateChanged({
    appReducer
  }) {
    this.allProjects = [...appReducer.allProjects];
    this.clonedProjects = [...this.allProjects];
  }

  handleComponentSearch(e) {
    this.searchTerm = e.target.value.toLowerCase();
    this.allProjects = this.clonedProjects.filter((project) => {
      if (!this.searchTerm) return true;

      let concatenatedString = project.projectDescription.reduce((str, description) => str + `${ description.title }${ description.value }`, '').toLowerCase();
      return concatenatedString.includes(this.searchTerm);
    })
  }

  handleViewTypeChange(viewType) {
    if (this.viewType !== viewType) {
      this.viewType = viewType;
      this.componentStyles['flex-basis'] = this.styleByViewMap[viewType]['flex-basis'];
      this.componentsContainerStyles['gap'] = this.styleByViewMap[viewType]['gap'];
    }
  }

  render() {
    return html `
        <!-- Components Section -->
        <div class="components-container">
          <!-- Toolbar Section -->
          <paper-toolbar>
            <span slot="top" class="title">${ this.title }</span>
            <div slot="top" class="input-container">
              <iron-icon class="search-icon" icon="search"></iron-icon>
              <input class="search-input" placeholder="Filter Items..." value="" @input="${ this.handleComponentSearch }">
            </div>
            <paper-icon-button slot="top" class=${ classMap({ active: this.viewType === 'listView' }) } icon="icons:view-list" @click=${ () => this.handleViewTypeChange('listView') }>
            </paper-icon-button>
            <paper-icon-button slot="top" class=${ classMap({ active: this.viewType === 'columnView' }) } icon="editor:border-all" @click="${ () => this.handleViewTypeChange('columnView') }"></paper-icon-button>
            <paper-icon-button slot="top" class=${ classMap({ active: this.viewType === 'gridView' }) } icon="icons:apps" @click="${ () => this.handleViewTypeChange('gridView') }">+</paper-icon-button>
          </paper-toolbar>

          <!-- Components Section -->
          <div class=${classMap(this.componentsContainerClasses)} style=${ styleMap(this.componentsContainerStyles) }>
            ${
              this.allProjects
                .map((component) => html`
                  <app-component class="component" style=${ styleMap(this.componentStyles) } .viewType=${ this.viewType } .component=${ component }></app-component>
                `)
            }
            ${
              this.allProjects.length <= 0 ?
              html`
                <h2 class="text-center w-100p">No Components Found</h2>
              ` :
              ``
            }
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-components', AppComponents);