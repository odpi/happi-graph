import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import HappiGraphListOfRelationships from './happi-graph-list-of-relationships.component';
import HappiGraphStatistics from './happi-graph-statistics.component';
/**
 *
 * React component used for displaying Action buttons.
 *
 * @since      0.1.0
 * @access     public
 *
 */
class HappiGraphActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: props.rawData.nodes,
            links: props.rawData.edges
        };
    }
    render() {
        const { nodes, links } = this.state;
        return (_jsxs(_Fragment, { children: [_jsx(HappiGraphStatistics, { nodes: [...nodes] }), _jsx(HappiGraphListOfRelationships, { nodes: [...nodes], links: [...links] })] }));
    }
}
export default HappiGraphActions;
