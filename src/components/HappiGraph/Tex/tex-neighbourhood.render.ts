import * as d3 from 'd3';
import {addIcon, getLinkCoordinates, isSelected, addProperties} from "../happi-graph.render"
import { iconsMap, linksTypeIconMap, itemGroupIconMap } from "@lfai/egeria-js-commons";

const addHeader = (nodeGroup: any) => {
  const header = nodeGroup
                .append('g')
                .classed('header', true);

  const textHeader =
    header.append('text')
      .attr('transform', `translate(70, 40)`)
      .attr('data-text-length', (d: any) => { return d.value.length; })
      .attr('data-value', (d: any) => d.value)
      .classed('value', true)
      .text((d: any) => d.value.length > 18 ? `${d.value.substring(0, 18)}...` : d.value)

  textHeader
    .on('mouseover', function (d: any) {
      const currentNode = d3.select(d.currentTarget);

      const textLength = parseInt(currentNode.attr('data-text-length'));

      if(textLength > 18) {
        const value = currentNode.attr('data-value');

        const fullHeaderBackground =
          d3.select(d.currentTarget.parentNode)
            .append('rect')
            .classed('full-header-background', true)
            .attr('transform', `translate(20, -10)`)
            .attr('rx', 10)
            .attr('ry', 10);

        const fullHeader: any =
          d3.select(d.currentTarget.parentNode)
            .append('text')
            .classed('full-header', true)
            .attr('transform', `translate(30, 0)`)
            .text(() => value);

        const localBBox = fullHeader.node().getBBox();

        fullHeaderBackground
          .attr('x', localBBox.x)
          .attr('y', localBBox.y)
          .attr('width', localBBox.width + 20)
          .attr('height', localBBox.height + 20);
      }
    })
    .on('mouseout', function (d: any) {
      const currentNode = d3.select(d.currentTarget);

      const textLength = parseInt(currentNode.attr('data-text-length'));

      if(textLength > 18) {
        d3.select(d.currentTarget.parentNode.getElementsByClassName('full-header-background')[0]).remove();
        d3.select(d.currentTarget.parentNode.getElementsByClassName('full-header')[0]).remove();
      }
    });
};

const addNodes = (nodes: any, nodesGroup: any, graphDirection: string, onNodeClick?: any) => {
  const _nodesGroup: any = nodesGroup
                          .selectAll()
                          .data(nodes)
                          .enter();

  const nodeGroup =
    _nodesGroup
      .append('g')
      .classed('node-group', true)
      .attr('id', (d: any) => d.id)
      .on('click', (d: any) => { onNodeClick ? onNodeClick(d.target.__data__) : console.log('ON_NODE_CLICK_NOT_IMPLEMENTED'); })
      .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`)
      .call(
        d3.drag()
          .on('start', (d: any) => {
            console.log('DRAG_START', d);
          })
          .on('drag', function(event: any, d: any) {
            d.x = event.x;

            if(graphDirection !== 'VERTICAL') {
              d.y = event.y;
            }

            // @ts-ignore
            d3.select(this)
              .attr('transform', `translate(${d.x}, ${d.y})`);

              const _links: any =
                  d3.selectAll('.links-group')
                    .selectAll('line');

            _links
              .filter(function(_d: any) {
                return _d.from.id === d.id;
              })
              .attr('x1', (_d: any) => {
                const { from/*, to*/ } = getLinkCoordinates(_d.from, _d.to, graphDirection);

                return from.x;
              })
              .attr('y1', (_d: any) => {
                const { from/*, to*/ } = getLinkCoordinates(_d.from, _d.to, graphDirection);

                return from.y;
              })
              .attr('x2', (_d: any) => {
                const { /*from,*/ to } = getLinkCoordinates(_d.from, _d.to, graphDirection);

                return to.x;
              })
              .attr('y2', (_d: any) => {
                const { /*from,*/ to } = getLinkCoordinates(_d.from, _d.to, graphDirection);

                return to.y;
              });

            _links
              .filter(function(_d: any) {
                return _d.to.id === d.id;
              })
              .attr('x1', (_d: any) => {
                const { from/*, to*/ } = getLinkCoordinates(_d.from, _d.to, graphDirection);

                return from.x;
              })
              .attr('y1', (_d: any) => {
                const { from/*, to*/ } = getLinkCoordinates(_d.from, _d.to, graphDirection);

                return from.y;
              })
              .attr('x2', (_d: any) => {
                const { /*from,*/ to } = getLinkCoordinates(_d.from, _d.to, graphDirection);

                return to.x;
              })
              .attr('y2', (_d: any) => {
                const { /*from,*/ to } = getLinkCoordinates(_d.from, _d.to, graphDirection);

                return to.y;
              });
          })
          .on('end', (d: any) => {
            console.log('DRAG_END', d);
          })
      );

  nodeGroup
    .append('rect')
    .attr('width', (d: any) => d.width)
    .attr('height', (d: any) => d.height)
    .classed('node', true)
    .classed('is-selected', (d: any) => d.selected)
    .attr('rx', 20)
    .attr('ry', 20);

    isSelected(nodeGroup);
    addHeader(nodeGroup);
    addIcon(nodeGroup, iconsMap);
    addProperties(nodeGroup);
};

const addLinks = (links: any, linksGroup: any, graphDirection: string, nodes: any) => {
  const _linksGroup = linksGroup.selectAll()
    .data(links)
    .enter();

  _linksGroup
    .append('line')
    .classed('link', true)
    .attr('label', (d: any) => {
      return d.label;
    })
    .attr('stroke-dasharray', (d: any) => {
      return linksTypeIconMap[d.type] ? linksTypeIconMap[d.type].strokeDashArray : null;
    })
    .attr('marker-start', (d: any) => (d.connectionFrom) ? 'url(#arrow-start)' : null)
    .attr('marker-end', (d: any) => (d.connectionTo) ? 'url(#arrow-end)' : null)
    .attr('from', function(d: any) { return d.from.id; })
    .attr('to', function(d: any) { return d.to.id; })
    .attr('x1', (d: any) => {
      const { from } = getLinkCoordinates(d.from, d.to, graphDirection);

      return from.x;
    })
    .attr('y1', (d: any) => {
      const { from } = getLinkCoordinates(d.from, d.to, graphDirection);

      return from.y;
    })
    .attr('x2', (d: any) => {
      const { to } = getLinkCoordinates(d.from, d.to, graphDirection);

      return to.x;
    })
    .attr('y2', (d: any) => {
      const { to } = getLinkCoordinates(d.from, d.to, graphDirection);

      return to.y;
    })
    .on('mouseover', function(d: any) {
      let position = d.currentTarget.ownerSVGElement.createSVGPoint();

      position.x = d.x;
      position.y = d.y;

      position = position.matrixTransform(d.currentTarget.getScreenCTM().inverse());

      const linkLabel = d.currentTarget.attributes.label.value;
      const sourceLabel = nodes.filter((n: any) => n.id === d.currentTarget.attributes.from.value ).pop().value;
      const targetLabel = nodes.filter((n: any) => n.id === d.currentTarget.attributes.to.value ).pop().value;

      const textBackground =
          d3.select(d.currentTarget.parentNode)
              .append('rect')
              .classed('link-popup-box', true)
              .attr('transform', `translate(20, -10)`)
              .style("fill", "#ffffff")
              .style("stroke", "#cccccc")
              .attr('rx', 10)
              .attr('ry', 10);

      const text: any =
          d3.select(d.currentTarget.parentNode)
              .append('text')
              .classed('link-popup-text', true)
              .attr('transform', `translate(30, 0)`)
              .attr('x', position.x + 10)
              .attr('y', position.y + 10)
              .text(() => `${sourceLabel} :: ${linkLabel} :: ${targetLabel}`);

      const bBox: any = text.node().getBBox();

      textBackground
          .attr('x', bBox.x)
          .attr('y', bBox.y)
          .attr('height', bBox.height + 20)
          .attr('width', bBox.width + 20);
    })
    .on('mouseout', (d: any) => {
      d.currentTarget.parentNode.getElementsByClassName('link-popup-box')[0].remove();
      d.currentTarget.parentNode.getElementsByClassName('link-popup-text')[0].remove();
    })
    .on('click', (d: any) => {
        const clicked = d3.select(d.currentTarget);

        if (clicked.classed('link-clicked')) {
          clicked
            .attr('marker-start', (d: any) => (d.connectionFrom) ? 'url(#arrow-start)' : null)
            .attr('marker-end', (d: any) => (d.connectionTo) ? 'url(#arrow-end)' : null)
            .classed('link-clicked', false);
        } else {
          clicked
            .attr('marker-start', (d: any) => (d.connectionFrom) ? 'url(#arrow-start-selected)' : null)
            .attr('marker-end', (d: any) => (d.connectionTo) ? 'url(#arrow-end-selected)' : null)
            .classed('link-clicked', true);
        }
    })
}

export {
  addNodes,
  addLinks
}
