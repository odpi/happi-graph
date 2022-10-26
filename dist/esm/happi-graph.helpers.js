import { itemGroupIconMap } from '@lfai/egeria-js-commons';
const getNodeHeight = (length) => {
    let defaultHeight = 70;
    let computedHeight = (length >= 1 ? (length * 30) : 0);
    return defaultHeight + computedHeight;
};
const mapNodes = (nodes, selectedNodeId) => {
    return nodes.map((n) => {
        let keys = Object.keys(n.properties ? n.properties : {});
        let props = keys.map(k => {
            let camelCased = k.charAt(0).toUpperCase() + k.slice(1);
            return {
                value: n.properties[k],
                label: k,
                icon: itemGroupIconMap[camelCased] ? itemGroupIconMap[camelCased].icon : 'simple-square',
                groupName: camelCased
            };
        });
        let result = {
            id: n.id,
            type: itemGroupIconMap[n.group] ? itemGroupIconMap[n.group].icon : 'simple-square',
            value: n.label ? n.label : 'N/A',
            label: n.group ? n.group : 'N/A',
            selected: n.id === selectedNodeId,
            width: 300,
            height: getNodeHeight(props.length),
            properties: [
                ...props
            ]
        };
        return result;
    });
};
const mapLinks = (links, nodes) => {
    return links.map((l) => {
        return {
            id: `${l.from}-${l.to}`,
            label: l.label,
            from: nodes.filter((n) => n.id === l.from).pop(),
            to: nodes.filter((n) => n.id === l.to).pop(),
            source: l.from,
            target: l.to,
            connectionFrom: l.connectionFrom ? l.connectionFrom : false,
            connectionTo: l.connectionTo ? l.connectionTo : true,
            type: l.type
        };
    });
};
export { mapNodes, mapLinks };
