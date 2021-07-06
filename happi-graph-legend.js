import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';

import { simpleSquareIcon } from './happi-graph-helpers';

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
        value: {
          labels: {
            entities : []
          },
          linkLabels: {
            entities : []
          }
        }
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
    let labelsMap = {};
    let _links = newGraphLinks;
    let linkLabels = [];
    if(_links.length) {
      _links.map(l => {
          if (l.type && this.linksTypeIconMap[l.type]) {
              labelsMap[l.type] = {
                  label: this.linksTypeIconMap[l.type].label,
                  iconName: l.type
              }
          }
      });

      if (this.legendData.linkLabels) {
        linkLabels = [
          ...this.legendData.linkLabels.entities,
          ...Object.values(labelsMap)
        ]
      } else {
        linkLabels = [
          ...Object.values(labelsMap)
        ]
      }
      // makes it unique array
      linkLabels = [...new Set(linkLabels.map(item => item))];

      this.legendData = {
        ...this.legendData,
        linkLabels: {
          entities: linkLabels,
          group: this.linksTypeIconMap.group
        }
      };

    }
  }

  _graphNodesUpdate(newGraphNodes) {
    let _nodes = newGraphNodes;
    let propertiesMap = {};
    let labels = [];
    if(_nodes.length) {

      _nodes.map(n => {
        propertiesMap[n.label] = n.icon;

        n.properties.map(p => {
          propertiesMap[p.groupName] = p.icon;
        });
      });
      labels = [
        ...this.legendData.labels.entities,
        ...Object.keys(propertiesMap)
      ];

      labels = [...new Set(labels.map(item => item))];
    } else {
      labels = [];
    }
    this.legendData = {
      labels: {
        entities: labels,
        group: this.propertiesMap.group
      }
    }
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }

  getIcon(key) {
    if((this.propertiesMap[key] && this.iconsMap[this.propertiesMap[key].icon])) {
      return this.iconsMap[this.propertiesMap[key].icon];
    } else if (this.linksTypeIconMap[key] && this.iconsMap[this.linksTypeIconMap[key].icon]) {
      return this.iconsMap[this.linksTypeIconMap[key].icon];
    } else {
      return simpleSquareIcon;
    }
  }

  getLabel(group) {
    return group;
  }

  hasLinkLabels() {
    return this.legendData.linkLabels.entities.length > 0
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
        <div class="icon-title">[[getLabel(legendData.labels.group)]]</div>
        <div class="svg-icons">
          <template is="dom-repeat" items="{{ legendData.labels.entities }}">
            <div class="svg-icon">
              <img src="data:image/svg+xml;utf8,[[ getIcon(item) ]]"/>

              <span>[[ item ]]</span>
            </div>
          </template>
         
        </div>

        <template is="dom-if" if="[[hasLinkLabels()]]">
          <div class="icon-title">[[getLabel(legendData.linkLabels.group)]]</div>
          
          <div class="svg-icons">
            <template is="dom-repeat" items="{{ legendData.linkLabels.entities }}">
              <div class="svg-icon">
                <img src="data:image/svg+xml;utf8,[[ getIcon(item.iconName) ]]"/>
                <span>[[ item.label ]]</span>
              </div>
            </template>
  
          </div>
        </template
      </template>
    `;
  }
}

window.customElements.define('happi-graph-legend', HappiGraphLegend);
