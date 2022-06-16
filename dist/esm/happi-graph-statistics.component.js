import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Modal, Table, ActionIcon } from '@mantine/core';
import { IoMdStats } from 'react-icons/io';
/**
 *
 * React component used for displaying Action buttons.
 *
 * @since      0.1.0
 * @access     public
 *
 */
class HappiGraphStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.generateData(props.nodes),
            opened: false
        };
    }
    generateData(nodes) {
        let _nodes = nodes;
        let typeMap = {};
        let typeMapData = [];
        if (_nodes.length) {
            _nodes.forEach((n) => {
                if (typeMap[n.group]) {
                    typeMap[n.group]++;
                }
                else {
                    typeMap[n.group] = 1;
                }
            });
            typeMapData = [
                ...Object.keys(typeMap).map(k => {
                    return {
                        key: k,
                        occurrences: typeMap[k]
                    };
                })
            ];
        }
        else {
            typeMapData = [];
        }
        return typeMapData;
    }
    setOpened(value) {
        this.setState({
            opened: value
        });
    }
    render() {
        const { data, opened } = this.state;
        return (_jsxs(_Fragment, { children: [_jsx(ActionIcon, Object.assign({ title: "Statistics", variant: "hover", size: 35 }, { children: _jsx(IoMdStats, { size: 25, onClick: () => this.setOpened(true) }) })), _jsx(Modal, Object.assign({ opened: opened, onClose: () => this.setOpened(false), centered: true, title: "Statistics" }, { children: _jsxs(Table, Object.assign({ striped: true, highlightOnHover: true }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Key" }), _jsx("th", { children: "Occurences" })] }) }), _jsx("tbody", { children: data && data.map((d, i) => (_jsxs("tr", { children: [_jsx("td", { children: d.key }), _jsx("td", { children: d.occurrences })] }, i))) })] })) }))] }));
    }
}
export default HappiGraphStatistics;
