import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Switch as MantineSwitch } from '@mantine/core';
import { getIcon, getLegendCategories, getLegendLabels, graphLinksUpdateInLegendData, graphNodesUpdateInLegendData } from './happi-graph-legend.render';
import { v4 as uuidv4 } from 'uuid';
/**
 *
 * React component used for displaying Action buttons.
 *
 * @since      0.1.0
 * @access     public
 *
 */
class HappiGraphLegend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const { nodes, links } = this.state;
        let data = {};
        data = Object.assign(Object.assign({}, graphLinksUpdateInLegendData(links)), graphNodesUpdateInLegendData(nodes));
        console.log(data);
        this.setState({
            legendData: Object.assign({}, data)
        });
    }
    render() {
        const { isMinimised, legendData } = this.state;
        return (_jsx(_Fragment, { children: _jsxs("div", Object.assign({ className: "happi-graph-legend" }, { children: [_jsx("div", Object.assign({ className: "toggler" }, { children: _jsx(MantineSwitch, { label: "Legend", checked: !isMinimised, onClick: () => { this.toggleMinimise(); } }) })), _jsx("div", Object.assign({ className: "contents" }, { children: legendData && !isMinimised && getLegendCategories(legendData).map((legendKey, legendKeyId) => {
                            return _jsxs(_Fragment, { children: [_jsx("div", Object.assign({ className: "icon-title" }, { children: _jsx("b", { children: legendKey }) }), `${uuidv4()}-${legendKeyId}`), _jsx("div", Object.assign({ className: "svg-icons" }, { children: legendData && legendKey && getLegendLabels(legendData, legendKey).map((label, labelId) => {
                                            return _jsxs("div", Object.assign({ className: "svg-icon" }, { children: [_jsx("img", { src: `data:image/svg+xml;utf8,${getIcon(legendKey, label, legendData)}`, alt: "icon" }), _jsx("span", { children: label })] }), `${uuidv4()}-${labelId}`);
                                        }) }))] });
                        }) }))] })) }));
    }
}
export default HappiGraphLegend;
