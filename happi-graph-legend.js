import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import { pluralize } from '@capaj/pluralize';
import {simpleSquareIcon} from './happi-graph-helpers';

class HappiGraphLegend extends PolymerElement {
  static get properties() {
    return {
      iconsMap: {
        type: Object,
        value: {}
      },
      propertiesMap: {
        type: Object,
        value: {}
      },
      linksTypeIconMap: {
        type: Object,
        value: {}
      },
      legendData: {
        type: Object,
        value: {}
      },
      graphNodes: {
        type: Object,
        value: {},
        observer: '_graphNodesUpdate'
      },
      graphLinks: {
        type: Object,
        value: {},
        observer: '_graphLinksUpdate'
      },
      isMinimized: {
        type: Boolean,
        value: false
      }
    };
  }

  _graphLinksUpdate(newGraphLinks) {
    let _links = newGraphLinks;
    if (_links.length) {
      _links.map(l => {
        if (l.type && this.linksTypeIconMap[l.type]) {
          let group = this.linksTypeIconMap[l.type].group
          if (!this.legendData[group]) {
            this.legendData[group] = [];
          }
          this.legendData[group][this.linksTypeIconMap[l.type].label] = l.type;
        }
      });
    }
  }

  _graphNodesUpdate(newGraphNodes) {
    let _nodes = newGraphNodes;
    if (_nodes.length) {
      _nodes.map(n => {
        let group = this.propertiesMap[n.label].group
        if (!this.legendData[group]) {
          this.legendData[group] = [];
        }
        this.legendData[group][n.label] = n.label;
        n.properties.map(p => {
          if (this.propertiesMap[p.groupName]){
            let propertiesGroup = this.propertiesMap[p.groupName].group
            this.legendData[propertiesGroup][p.groupName] = p.groupName;
          }
        });
      });
    }
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }

  getIcon(type, label) {
    let iconName = this.legendData[type][label];
    if ((this.propertiesMap[iconName] && this.iconsMap[this.propertiesMap[iconName].icon])) {
      return this.iconsMap[this.propertiesMap[iconName].icon];
    } else if (this.linksTypeIconMap[iconName] && this.iconsMap[this.linksTypeIconMap[iconName].icon]) {
      return this.iconsMap[this.linksTypeIconMap[iconName].icon];
    } else {
      return simpleSquareIcon;
    }
  }

  getLabel(group) {
    return pluralize(group);
  }

  getLegendCategories() {
    return Object.keys(this.legendData);
  }

  getLegendLabels(legendKey) {
    return [...new Set(Object.keys(this.legendData[legendKey]))];
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-size:12px;
          font-family: var(--happi-graph-font-family);
        }

        img {
          height:20px;
          vertical-align:middle;
          margin-right:5px;
        }

        .svg-icons {
          color: var(--happi-graph-secondary-color);
          background: rgb(var(--happi-graph-primary-color-rgb), 0.9);
          padding:10px;
          max-width:400px;

          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;

          border-bottom: 1px solid black;
        }

        .icon-title {
          color: var(--happi-graph-secondary-color);
          background: rgb(var(--happi-graph-primary-color-rgb), 0.9);
          padding: 10px;
          max-width: 400px;
          font-weight: bold;
          text-align: center;
        }

        .svg-icon {
          display: flex;
          align-items: center;

          flex-grow: 4;
          margin:5px;
        }

        .svg-icon span {
          margin-top:1px;
          width:120px;
        }

        .dropdown {
          display:flex;
          justify-content:flex-end;
          cursor: pointer;
        }

        paper-button {
          margin: 0;
          padding: 0.2em 0.2em 0.4em 0.57em;
          font-size:15px;
          color: var(--happi-graph-primary-color);
          background-color: #f4f5f7;
          text-transform: none;
          --paper-button: {
            @apply(--layout-vertical);
            @apply(--layout-center-center);
          };
        }

        paper-button.keyboard-focus {
          font-weight: normal;
        }

        .label {
          margin-top:4px;
        }

        .label iron-icon {
          margin-top:-3px;
        }
      </style>

      <paper-button on-click="toggleMinimize" class="dropdown">
        <div class="label">
          Legend

          <template is="dom-if" if="[[ !isMinimized ]]">
            <iron-icon icon="icons:expand-more"></iron-icon>
          </template>

          <template is="dom-if" if="[[ isMinimized ]]">
            <iron-icon icon="icons:chevron-right"></iron-icon>
          </template>
        </div>
      </paper-button>

      <template is="dom-if" if="[[ isMinimized ]]" restamp="true">
        <template is="dom-repeat" items="{{ getLegendCategories() }}" as="legendKey">
          <div class="icon-title">[[getLabel(legendKey)]]</div>
          <div class="svg-icons">
            <template is="dom-repeat" items="{{ getLegendLabels(legendKey) }}" as="label">
              <div class="svg-icon">
                <img src="data:image/svg+xml;utf8,[[ getIcon(legendKey, label) ]]"/>
                <span>[[ label ]]</span>
              </div>
            </template>
          </div>
        </template>
      </template>
    `;
  }
}

window.customElements.define('happi-graph-legend', HappiGraphLegend);
