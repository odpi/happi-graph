import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Modal, Table, ActionIcon } from '@mantine/core';
import { BsCardChecklist } from 'react-icons/bs';
/**
 *
 * React component used for displaying Action buttons.
 *
 * @since      0.1.0
 * @access     public
 *
 */
class HappiGraphListOfRelationships extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.generateData(props.nodes, props.links),
            opened: false
        };
    }
    generateData(nodes, links) {
        let graphMappings = [];
        if (links.length) {
            graphMappings = [
                ...Object(links).map((e) => {
                    let fromNode = nodes
                        .filter((n) => n.id === e.from)
                        .pop();
                    let toNode = nodes
                        .filter((n) => n.id === e.to)
                        .pop();
                    return {
                        from: fromNode,
                        mapping: e.label,
                        to: toNode
                    };
                })
            ];
        }
        return graphMappings;
    }
    setOpened(value) {
        this.setState({
            opened: value
        });
    }
    render() {
        const { data, opened } = this.state;
        return (_jsxs(_Fragment, { children: [_jsx(ActionIcon, Object.assign({ title: "List of Relationships", variant: "hover", size: 35 }, { children: _jsx(BsCardChecklist, { size: 25, onClick: () => this.setOpened(true) }) })), _jsx(Modal, Object.assign({ opened: opened, onClose: () => this.setOpened(false), centered: true, size: '60%', title: "List of Relationships" }, { children: _jsxs(Table, Object.assign({ striped: true, highlightOnHover: true }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "From" }), _jsx("th", { children: "Mapping" }), _jsx("th", { children: "To" })] }) }), _jsx("tbody", { children: data && data.map((d, i) => (_jsxs("tr", { children: [_jsx("td", { children: d.from.label }), _jsx("td", { children: d.mapping }), _jsx("td", { children: d.to.label })] }, i))) })] })) }))] }));
    }
}
export default HappiGraphListOfRelationships;
