import React from "react";
import * as d3 from "d3";
// import "./happi-graph.scss";
import { GraphType, mapLinks, mapNodes } from "./happi-graph.helpers";
import { elkApproach, visApproach } from "./happi-graph.algorithms";
import * as LineageRender from "./happi-graph.render";
import * as TexInheritanceRender from "./Tex/tex-inheritance.render";
import * as TexNeighbourhoodRender from "./Tex/tex-inheritance.render";
import HappiGraphLegend from "./happi-graph-legend.component";

import { ActionIcon } from '@mantine/core';

import {
  MdZoomIn,
  MdZoomOut,
  MdOutlineCenterFocusWeak
} from 'react-icons/md';

import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit
} from 'react-icons/ai';

interface Props {
  actions: any;
  algorithm?: string;
  selectedNodeId: string;
  onNodeClick?: any;
  rawData: any;
  debug?: boolean;
  graphDirection?: string;
  nodeCountLimit?: number;
  nodeDistanceX?: number;
  nodeDistanceY?: number;
  printMode?: boolean;
  onGraphRender?: any;
  graphType: number;
}

interface State {
  algorithm: string;
  rawData: any;
  debug: boolean;
  graphDirection: string;
  happiGraph: any;
  isLoading: boolean;
  links: any;
  nodeCountLimit: number;
  nodeDistanceX: number;
  nodeDistanceY: number;
  nodes: any;
  selectedNodeId: string;
  svg: any;
  zoom: any;
  allGroup: any;
  isFullscreen: boolean;
  printMode: boolean;

  addLinks: any;
  addNodes: any; 
  centerGraph: any;
  customZoomIn: any; 
  customZoomOut: any; 
  initCenterGraph: any;
  graphType: number;

}


class HappiGraph extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log("HAPPI-GRAPH Init");
    const mappedNodes = mapNodes(props.rawData.nodes, props.selectedNodeId);
    const mappedLinks = mapLinks(props.rawData.edges, mappedNodes);
    let selectedGraphType;
    switch(props.graphType) {
      case GraphType.LINEAGE: {
        selectedGraphType=LineageRender;
        break;
      }
      case GraphType.TEX_INHERITANCE: {
        selectedGraphType=TexInheritanceRender;
        break;
      }
      case GraphType.TEX_NEIGHBOURHOOD: {
        selectedGraphType=TexNeighbourhoodRender;
        break;
      }
      default:
        selectedGraphType=LineageRender
        console.log('GRAPH_TYPE_NOT_SELECTED');
    }
    this.state = {
      algorithm: props.algorithm ? props.algorithm : 'ELK',
      rawData: { ...props.rawData },
      debug: props.debug === true ? true : false,
      graphDirection: props.graphDirection ? props.graphDirection : 'HORIZONTAL',
      happiGraph: React.createRef(),
      isLoading: true,
      links: [...mappedLinks],
      nodeCountLimit: props.nodeCountLimit ? props.nodeCountLimit : 0,
      nodeDistanceX: props.nodeDistanceX ? props.nodeDistanceX : 100,
      nodeDistanceY: props.nodeDistanceY ? props.nodeDistanceY : 400,
      nodes: [...mappedNodes],
      selectedNodeId: props.selectedNodeId,
      svg: null,
      zoom: null,
      allGroup: null,
      isFullscreen: false,
      printMode: props.printMode ? true : false,
      addLinks: selectedGraphType.addLinks,
      addNodes: selectedGraphType.addNodes,
      centerGraph: selectedGraphType.centerGraph,
      customZoomIn: selectedGraphType.customZoomIn,
      customZoomOut: selectedGraphType.customZoomOut,
      initCenterGraph: selectedGraphType.initCenterGraph,
      graphType: props.graphType
    };


  }

  selectAlgorithm(callback: any) {
    const {
      algorithm,
      graphDirection,
      nodes,
      links,
      nodeDistanceX,
      nodeDistanceY
    } = this.state;

    switch(algorithm) {
      case 'ELK': {
        if(graphDirection === 'VERTICAL') {
          const {
            nodes: finalNodes,
            links: finalLinks
          } = visApproach(nodes, links, graphDirection, nodeDistanceX, nodeDistanceY);

          this.setState({
            isLoading: false,
            nodes: finalNodes,
            links: finalLinks
          }, () => {
            callback();
          });
        }

        if(graphDirection === 'HORIZONTAL') {
          elkApproach(nodes, links, graphDirection, nodeDistanceX, nodeDistanceY, (data: any) => {
            this.setState({
              isLoading: false,
              nodes: [...data.nodes],
              links: [...data.links]
            }, () => {
              callback();
            });
          });
        }

        break;
      }
      case 'VISJS': {
        const {
          nodes: finalNodes,
          links: finalLinks
        } = visApproach(nodes, links, graphDirection, nodeDistanceX, nodeDistanceY);
        console.log("habib");
        console.log(nodes);


        this.setState({
          isLoading: false,
          nodes: finalNodes,
          links: finalLinks
        }, () => {
          callback();
        });

        break;
      }
      default: {
        console.log('NO_ALGORITHM_SELECTED');

        break;
      }
    }
  }

  componentDidMount() {
    const { happiGraph, debug } = this.state;
    const { onGraphRender } = this.props;

    debug && console.log("componentDidMount()", this.state);

    this.setState({
      svg: d3.select(happiGraph.current)
    }, () => {
      this.selectAlgorithm(() => {
        debug && console.log('Everything is ready.');
        this.init(onGraphRender || (() => { console.log('READY'); }));
      });
    });
  }

  componentDidUpdate() {
    const { debug } = this.state;

    debug && console.log("componentDidUpdate()", this.state);
  }

  init(callback: any) {
    const { debug } = this.state;

    debug && console.log('init()');
    const { svg, nodes, links, graphDirection, graphType } = this.state;

    const allGroup =
      svg.append('g')
         .attr('class', 'all-group');

    const linksGroup = allGroup.append('g').attr('class', 'links-group');
    const nodesGroup = allGroup.append('g').attr('class', 'nodes-group');

    const svgWidth = parseInt(svg.style('width'));
    const svgHeight = parseInt(svg.style('height'));

    debug && console.log('svgWitdh = ', svgWidth);
    debug && console.log('svgHeight = ', svgHeight);

    this.setState({
      allGroup: allGroup,
      zoom: d3.zoom()
              .extent([[0,0],[svgWidth, svgHeight]])
              .on('zoom', (e: any) => {
                allGroup.attr('transform', e.transform);
              })
    }, () => {
      const { zoom } = this.state;
      const { onNodeClick } = this.props;

      svg 
        .call(zoom)
        .on('dblclick.zoom', null);

        this.state.addNodes(nodes, nodesGroup, graphDirection, onNodeClick);
        TexInheritanceRender.addLinks(links, linksGroup, graphDirection, nodes);

      this.state.initCenterGraph(allGroup, svg, zoom, callback);
    });
  }

  setFullscreen() {
    const {
      isFullscreen
    } = this.state;

    this.setState({isFullscreen: !isFullscreen}, () => {
      const {
        allGroup,
        svg,
        zoom
      } = this.state;
      this.state.centerGraph(allGroup, svg, zoom);
    });

  }

  render() {
    const { actions } = this.props;
    const {
      isLoading,
      happiGraph,
      zoom,
      svg,
      nodes,
      links,
      allGroup,
      isFullscreen,
      debug,
      printMode
    } = this.state;

    return (<>
      <div className={`happi-graph-wrapper ${ isFullscreen ? 'happi-graph-fullscreen' : '' }`}>
        { isLoading && <h1>isLoading</h1>}

        <svg id="happi-graph" ref={ happiGraph }>
          <defs>
            <marker id="arrow-start"
                    markerWidth="10"
                    markerHeight="10"
                    refX="0"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth">
              <path d="M9,0 L9,6 L0,3 z" className="arrow" />
            </marker>

            <marker id="arrow-start-selected"
                    markerWidth="10"
                    markerHeight="10"
                    refX="0"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth">
              <path d="M9,0 L9,6 L0,3 z" className="arrow-selected" />
            </marker>

            <marker id="arrow-end"
                    markerWidth="10"
                    markerHeight="10"
                    refX="7"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" className="arrow" />
            </marker>

            <marker id="arrow-end-selected"
                    markerWidth="10"
                    markerHeight="10"
                    refX="7"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" className="arrow-selected" />
            </marker>
          </defs>
        </svg>

        { !printMode && <>
          <div className="happi-graph-actions">
            <ActionIcon title="Zoom In" variant="subtle" size={35}>
              <MdZoomIn size={25} onClick={() => this.state.customZoomIn(zoom, svg) } />
            </ActionIcon>

            <ActionIcon title="Zoom Out" variant="subtle" size={35}>
              <MdZoomOut size={25} onClick={() => this.state.customZoomOut(zoom, svg) } />
            </ActionIcon>

            <ActionIcon title="Fit to screen" variant="subtle" size={35}>
              <MdOutlineCenterFocusWeak size={25} onClick={() => this.state.centerGraph(allGroup, svg, zoom) } />
            </ActionIcon>

            <ActionIcon title="Fullscreen" variant="subtle" size={35}>
              { !isFullscreen && <AiOutlineFullscreen size={25} onClick={() => this.setFullscreen() } /> }
              { isFullscreen && <AiOutlineFullscreenExit size={25} onClick={() => this.setFullscreen() } /> }
            </ActionIcon>

            { actions }
          </div>

          <div className="happi-graph-legend-wrapper">
            <HappiGraphLegend nodes={nodes} links={links} debug={debug}/>
          </div>
        </> }
      </div>
    </>);
  }
}

export default HappiGraph;