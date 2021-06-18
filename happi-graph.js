import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import * as d3 from 'd3';
import '@polymer/paper-icon-button/paper-icon-button.js';

import './happi-graph-legend';
import { compute } from './happi-graph-algorithms';
import {
  addHeader,
  addIcon,
  addProperties,
  getNodeHeight,
  isSelected
} from './happi-graph-helpers';

import 'elkjs/lib/elk-api';
import 'vis-network/dist/vis-network';

class HappiGraph extends PolymerElement {
  constructor() {
    super();

    this.zooming = this.zooming.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
  }

  static get properties() {
    return {
      debug: {
        type: Boolean,
        value: false
      },
      algorithm: {
        type: String,
        value: 'ELK'
      },
      elkWorkerUrl: {
        type: String,
        value: '../node_modules/elkjs/lib/elk-worker.js'
      },
      iconsMap: {
        type: Object,
        value: null
      },
      propertiesMap: {
        type: Object,
        value: null
      },
      svg: {
        type: Object,
        value: null
      },
      zoom: {
        type: Object,
        value: null
      },
      allGroup: {
        type: Object,
        value: null
      },
      nodesGroup: {
        type: Object,
        value: null
      },
      linksGroup: {
        type: Object,
        value: null
      },
      linksTypeIconMap: {
        type: Array,
        value: []
      },
      graphDirection: {
        type: String,
        value: ''
      },
      nodes: {
        type: Array,
        value: []
      },
      links: {
        type: Array,
        value: []
      },
      graphData: {
        type: Object,
        value: null
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.init();
  }

  init() {
    if(this.graphData) {
      this.updateGraphData(this.graphData);
    } else {
      this.debug ? console.log('NO_GRAPH_DATA') : 0;
    }
  }

  updateGraphData(newGraphData) {
    this.debug ? console.log('updateGraphData(', newGraphData, ')') : 0 ;

    if(newGraphData && newGraphData.nodes.length >= 0 && newGraphData.links.length >= 0) {
      this.removeData();

      this.graphDirection = newGraphData.graphDirection ? newGraphData.graphDirection : this.graphDirection;

      this.nodes = newGraphData.nodes.map(n => {
        let keys = Object.keys(n.properties ? n.properties : {});

        let props = keys.map(k => {
          let camelCased = k.charAt(0).toUpperCase() + k.slice(1);

          return {
            value: n.properties[k],
            label: k,
            icon: this.propertiesMap[camelCased] ? this.propertiesMap[camelCased].icon : 'simple-square',
            groupName: camelCased
          }
        });

        let result = {
          id: n.id,
          type: this.propertiesMap[n.group] ? this.propertiesMap[n.group].icon : 'simple-square',
          value: n.label ? n.label : 'N/A',
          label: n.group ? n.group : 'N/A',
          selected: n.id === newGraphData.selectedNodeId,
          width: 300,
          height: getNodeHeight(props.length),
          properties: [
            ...props
          ]
        };

        return result;
      });

      this.links = [
        ...newGraphData.links.map(e => {
          return {
            id: `${e.from}-${e.to}`,
            label: e.label,

            from: this.nodes.filter(n => n.id === e.from).pop(),
            to: this.nodes.filter(n => n.id === e.to).pop(),

            source: e.from,
            target: e.to,

            connectionFrom: e.connectionFrom ? e.connectionFrom : false,
            connectionTo: e.connectionTo ? e.connectionTo : true,

            type: e.type
          };
        })
      ];

      switch(this.algorithm) {
        case 'ELK':
          this.elkApproach();

          break;
        case 'VISJS':
          this.visApproach();

          break;
        case 'CUSTOM':
          this.initialApproach();

          break;
        default:
          console.log('NO_ALGORITHM_SELECTED');

          break;
      }
    } else {
      console.log('NEW_DATA_EMPTY');
    }
  }

  initialApproach() {
    let selectedNode = this.nodes.filter(n => n.selected === true).pop();

    this.nodes = selectedNode ?
                 [...compute(selectedNode.id, this.nodes, this.links, this.graphDirection) ] :
                 [];

    this.initGraph();
    this.addNodes();
    this.addLinks();
    this.centerGraph();
  }

  visApproach() {
    let nodeMap = {};

    var nodes = new vis.DataSet([
      ...this.nodes.map(n => {
        let _node = {
          ...n,
          value2: n.value
        };

        nodeMap[n.id] = _node;

        return _node;
      })
    ]);

    var edges = new vis.DataSet([
      ...this.links.map(e => {
        return {
          from: e.from.id,
          to: e.to.id
        }
      })
    ]);

   // /*
   var options = {
      autoResize: true,
    	physics:{
      	enabled:false,
      	hierarchicalRepulsion: {
        	avoidOverlap: 1,
      	}
      },
      edges: {
        arrows: {
          to: {
            scaleFactor: 1
          }
        }
      },
      layout: {
        improvedLayout: false,
        hierarchical: {
          enabled:true,
          levelSeparation: 450,
          nodeSpacing: 350,
          treeSpacing: 200,
          direction: this.graphDirection === 'HORIZONTAL' ? 'LR' : 'DU', // UD, DU, LR, RL
          sortMethod: 'directed',  // hubsize, directed
          shakeTowards: 'leaves'  // roots, leaves
         }
      }
    };

    let data = {
      nodes: nodes,
      edges: edges
    }

    let e = document.createElement('div');

    var network = new vis.Network(e, data, options);

    let positions = network.getPositions();

    this.nodes = Object.keys(positions).map(id => {
      return {
        ...nodeMap[id],
        value: nodeMap[id].value2, // VisJS is somehow updating this value
        x: positions[id].x,
        y: positions[id].y
      };
    });

    this.links = this.links.map(l => {
      return {
        ...l,
        from: this.nodes.filter(n => n.id === l.from.id).pop(),
        to: this.nodes.filter(n => n.id === l.to.id).pop()
      }
    });

    console.log(this.nodes, this.links);

    this.initGraph();
    this.addNodes();
    this.addLinks();
    this.centerGraph();
  }

  elkApproach() {
    const elk = new ELK({
      workerUrl: this.elkWorkerUrl
    });

    const graph = {
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.spacing.nodeNode": 200,
        "elk.layered.spacing.baseValue": 150,
        "elk.direction": this.graphDirection === 'HORIZONTAL' ? 'RIGHT' : 'UP'
      },
      children: [
        ...this.nodes
      ],
      edges: [
        ...this.links
      ]
    }

    elk.layout(graph)
      .then((g) => {
        console.log(g)

        this.nodes = [ ...g.children ];
        this.links = [ ...g.edges ];

        this.initGraph();
        this.addNodes();
        this.addLinks();
        this.centerGraph();
      })
      // .catch(console.error)
  }

  removeData() {
    this.nodes = [];
    this.links = [];
    this.graphData = null;

    this.allGroup ? this.allGroup.remove() : (this.debug ? console.log('ALL_GROUP_EMPTY') : 0);
  }

  initGraph() {
    this.svg = d3.select(this.$.svg);

    this.allGroup =
      this.svg
        .append('g')
        .attr('class', 'all-group');

    this.linksGroup = this.allGroup.append('g').attr('class', 'links-group');
    this.nodesGroup = this.allGroup.append('g').attr('class', 'nodes-group');

    let svgWidth = parseInt(this.svg.style('width'));
    let svgHeight = parseInt(this.svg.style('height'));

    this.zoom =
      d3.zoom()
        .extent([[0,0],[svgWidth, svgHeight]])
        .on('zoom', this.zooming)

    this.svg.call(this.zoom);
  }

  addNodes() {
    let self = this;

    let nodesGroup = this.nodesGroup.selectAll()
      .data(this.nodes)
      .enter();

    let nodeGroup =
      nodesGroup
        .append('g')
        .classed('node-group', true)
        .attr('id', (d) => d.id)
        .on('click', this.onNodeClick)
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
        .call(
          d3.drag()
            .on('start', (d) => {
              // console.log('DRAG_START', d);
            })
            .on('drag', function(d) {
              d.x = d3.event.x;
              d.y = d3.event.y;

              d3.select(this)
                .attr('transform', `translate(${d3.event.x}, ${d3.event.y})`);

                let _links =
                  d3.select(
                    d3.select(this)
                      .node()
                      .parentNode
                      .parentNode
                  )
                  .selectAll('.links-group')
                  .selectAll('line');

                _links
                  .filter(function(_d) {
                    return _d.from.id === d.id;
                  })
                  .attr('x1', () => self.graphDirection === 'HORIZONTAL' ? d3.event.x + d.width + 3 : d3.event.x + (d.width/2))
                  .attr('y1', () => self.graphDirection === 'HORIZONTAL' ? d3.event.y + (d.height/2) : d3.event.y - 3);

                _links
                  .filter(function(_d) {
                    return _d.to.id === d.id;
                  })
                  .attr('x2', () => self.graphDirection === 'HORIZONTAL' ? d3.event.x - 5 : d3.event.x + (d.width/2))
                  .attr('y2', () => self.graphDirection === 'HORIZONTAL' ? d3.event.y + (d.height/2) : d3.event.y + (d.height) + 5);
            })
            .on('end', (d) => {
              // console.log('DRAG_END', d);
            })
        );

    nodeGroup
      .append('rect')
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .classed('node', true)
      .classed('is-selected', (d) => d.selected)
      .attr('rx', 20)
      .attr('ry', 20);

    isSelected(nodeGroup);
    addHeader(nodeGroup);
    addIcon(nodeGroup, this.iconsMap);
    addProperties(nodeGroup, this.iconsMap);
  }

  addLinks() {
    let self = this;

    let linksGroup = this.linksGroup.selectAll()
      .data(this.links)
      .enter();

    linksGroup
      .append('line')
      .style('stroke', 'black')
      .style('stroke-width', 2)
      .attr('stroke-dasharray', (d) => {
        return this.linksTypeIconMap[d.type] ? this.linksTypeIconMap[d.type].strokeDashArray : null;
      })
      .attr('marker-start', (d) => (d.connectionFrom) ? 'url(#arrow-start)' : null)
      .attr('marker-end', (d) => (d.connectionTo) ? 'url(#arrow-end)' : null)
      .attr('from', function(d) { return d.from.id; })
      .attr('to', function(d) { return d.to.id; })
      .attr('x1', (d) => self.graphDirection === 'HORIZONTAL' ? d.from.x + d.from.width + 3 : d.from.x + (d.from.width/2))
      .attr('y1', (d) => self.graphDirection === 'HORIZONTAL' ? d.from.y + (d.from.height/2) : d.from.y - 3)
      .attr('x2', (d) => self.graphDirection === 'HORIZONTAL' ? d.to.x - 5 : d.to.x + (d.to.width/2))
      .attr('y2', (d) => self.graphDirection === 'HORIZONTAL' ? d.to.y + (d.to.height/2) : d.to.y + (d.to.height) + 5);
  }

  zooming() {
    this.allGroup.attr('transform', d3.event.transform);
  }

  customZoom(value) {
    if (value > 0) {
      this.zoom.scaleBy(this.svg.transition(), 1.3);
    } else {
      this.zoom.scaleBy(this.svg.transition(), 0.7);
    }
  }

  customZoomIn() {
    this.customZoom(1);
  }

  customZoomOut() {
    this.customZoom(-1);
  }

  centerGraph() {
    let self = this;

    let svgWidth = parseInt(this.svg.style('width'));
    let svgHeight = parseInt(this.svg.style('height'));

    let graphBBox = this.allGroup.node().getBBox();

    let scaledBy = Math.min(
      (svgWidth - 100) / graphBBox.width,
      (svgHeight - 100) / graphBBox.height,
      1
    );

    let svgCenter = {
      x: svgWidth / 2,
      y: svgHeight / 2
    };

    this.svg.transition()
      .call(
        self.zoom.transform,
        d3.zoomIdentity
          .translate(
            svgCenter.x - ((graphBBox.x * scaledBy) + (graphBBox.width * scaledBy) / 2),
            svgCenter.y - ((graphBBox.y * scaledBy) + (graphBBox.height * scaledBy) / 2)
          )
          .scale(scaledBy)
      )
  }

  cachedGraph() {
    this.removeData();

    this.dispatchEvent(
      new CustomEvent('happi-graph-on-cached-graph', {
        bubbles: true,
        detail: {
          id: this.id
        }
      })
    );
  }

  onNodeClick(node) {
    this.dispatchEvent(
      new CustomEvent('happi-graph-on-node-click', {
        bubbles: true,
        detail: {
          nodeId: node.id
        }
      })
    );
  }

  hasSize(a) {
    if(a) {
      return a.length > 0;
    } else {
      return false;
    }
  }

  static get template() {
    return html`
      <style>
        :root {
          --lumo-font-family: var(--happi-graph-font-family);
          --iron-icon-fill-color: var(--happi-graph-primary-color);
        }

        :host {
          display: flex;
          flex-grow: 1;
          width: 100%;
          height: 100%;
          font: var(--happi-graph-font-family);
        }

        .node {
          fill: #ffffff;
          stroke: #cccccc;
        }

        .node.is-selected {
          stroke-width: 4px;
          stroke: var(--happi-graph-primary-color);
        }

        .header {
          fill: #000000;
          white-space: pre;
          font-size: 14px;
          letter-spacing: 0em;
          cursor: default;
          font-family: var(--happi-graph-font-family);
        }

        .header > .value {
          font-size: 17px;
        }

        .header > .full-header {
          font-size: 17px;
        }

        .header > .label {
          fill: var(--happi-graph-gray-color);
        }

        .pin {
          fill: var(--happi-graph-primary-color);
        }

        .header > .full-header-background {
          fill: #ffffff;
          stroke: #cccccc;
          stroke-width: 1px;
        }

        .property-group > .property {
          font-family: var(--happi-graph-font-family);
          font-size: 14px;
          cursor: default;
        }

        .property-group > .full-property-background {
          fill: #ffffff;
          stroke: #cccccc;
          stroke-width: 1px;
        }

        .property-group > .property-icon > svg > path {
          fill: var(--happi-graph-primary-color);
        }

        .happi-graph-container {
          height:100%;
          width:100%;

          position:relative;
        }

        .happi-graph-svg {
          position:absolute;
          top:0;
          left:0;
          width: 100%;
          height: 100%;
        }

        .happi-graph-legend {
          position: absolute;
          top:0;
          right:0;
          margin-right: 5px;
          margin-top: 5px;
        }

        .happi-graph-actions {
          display:flex;
          flex-direction: column;
          position:absolute;
          top:5px;
          left:5px;
        }
      </style>

      <div class="happi-graph-container">
        <div class="happi-graph-svg">
          <svg id="svg" width="100%" height="100%">
            <defs>
              <marker id="arrow-start"
                      markerWidth="10"
                      markerHeight="10"
                      refx="0"
                      refy="3"
                      orient="auto"
                      markerUnits="strokeWidth">
                <path d="M9,0 L9,6 L0,3 z" fill="#000" />
              </marker>

              <marker id="arrow-end"
                      markerWidth="10"
                      markerHeight="10"
                      refx="7"
                      refy="3"
                      orient="auto"
                      markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#000" />
              </marker>
            </defs>
          </svg>
        </div>

        <template is="dom-if" if="[[ hasSize(nodes, graphData) ]]">
          <div class="happi-graph-legend">
            <happi-graph-legend graph-nodes="{{ nodes }}"
                                graph-links="{{ links }}"
                                icons-map="{{ iconsMap }}"
                                properties-map="{{ propertiesMap }}"
                                links-type-icon-map="{{ linksTypeIconMap }}"></happi-graph-legend>
          </div>
        </template>

        <template is="dom-if" if="[[ hasSize(nodes, graphData) ]]">
          <div class="happi-graph-actions">
            <slot name="pre-actions"></slot>

            <paper-icon-button icon="icons:zoom-in" on-click="customZoomIn"></paper-icon-button>
            <paper-icon-button icon="icons:zoom-out" on-click="customZoomOut"></paper-icon-button>
            <paper-icon-button icon="icons:settings-overscan" on-click="centerGraph"></paper-icon-button>
            <paper-icon-button icon="icons:cached" on-click="cachedGraph"></paper-icon-button>

            <slot name="post-actions"></slot>
          </div>
        </template>
      </div>
    `;
  }
}

window.customElements.define('happi-graph', HappiGraph);
