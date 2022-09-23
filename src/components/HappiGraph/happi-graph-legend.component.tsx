import React from 'react';

import { Switch as MantineSwitch } from '@mantine/core';

import {
  getIcon,
  getLegendCategories,
  getLegendLabels,
  graphLinksUpdateInLegendData,
  graphNodesUpdateInLegendData
} from './happi-graph-legend.render';

interface Props {
  nodes: any;
  links: any;
  debug?: boolean;
}

interface State {
  nodes: any;
  links: any;
  isMinimised: boolean;
  legendData: any;
  debug: boolean;
}

/**
 *
 * React component used for displaying Action buttons.
 *
 * @since      0.1.0
 * @access     public
 *
 */
class HappiGraphLegend extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      debug: props.debug ? true : false,
      nodes: [...props.nodes],
      links: [...props.links],
      isMinimised: true,
      legendData: null
    };
  }

  toggleMinimise() {
    const { isMinimised } = this.state;
    this.setState({ isMinimised: !isMinimised });
  }

  componentDidMount() {
    const { nodes, links, debug } = this.state;

    let data = {};

    data = {
      ...graphLinksUpdateInLegendData(links),
      ...graphNodesUpdateInLegendData(nodes)
    };

    debug && console.log(data);

    this.setState({
      legendData: { ...data }
    });
  }

  render() {
    const { isMinimised, legendData } = this.state;

    return (<>
      <div className="happi-graph-legend">
        <div className="toggler">
          <MantineSwitch label="Legend" checked={!isMinimised} onChange={() => { this.toggleMinimise() }} />
        </div>

        <div className="contents">
          { legendData && !isMinimised && getLegendCategories(legendData).map((legendKey: any, legendKeyId: number) => {
            return <div key={legendKeyId}><div className="icon-title">
              <b>{ legendKey }</b>
            </div>

            <div className="svg-icons">
              { legendData && legendKey && getLegendLabels(legendData, legendKey).map((label: any, labelId: number) => {
                return <div className="svg-icon" key={`${labelId}`}>
                  <img src={ `data:image/svg+xml;utf8,${ getIcon(legendKey, label, legendData) }` } alt="icon" />

                  <span>{ label }</span>
                </div>
              }) }
            </div>
          </div>}) }
        </div>
      </div>
    </>);
  }
}

export default HappiGraphLegend;