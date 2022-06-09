import { simpleSquareIcon, linksTypeIconMap, iconsMap, itemGroupIconMap } from "./happi-graph.render";
import { pluralize } from '@capaj/pluralize';
export const getIcon = (type, label, legendData) => {
    let iconName = legendData[type][label];
    if ((itemGroupIconMap[iconName] && iconsMap[itemGroupIconMap[iconName].icon])) {
        return iconsMap[itemGroupIconMap[iconName].icon];
    }
    else if (linksTypeIconMap[iconName] && iconsMap[linksTypeIconMap[iconName].icon]) {
        return iconsMap[linksTypeIconMap[iconName].icon];
    }
    else {
        return simpleSquareIcon;
    }
};
export const getLabel = (group) => {
    return pluralize(group);
};
export const getLegendCategories = (legendData) => {
    return Object.keys(legendData); //.map((k: any) => { return pluralize(k); });
};
export const getLegendLabels = (legendData, legendKey) => {
    return [
        // @ts-ignore
        ...new Set(Object.keys(legendData[legendKey]))
    ];
};
export const graphLinksUpdateInLegendData = (newGraphLinks) => {
    let _links = newGraphLinks;
    let legendData = {};
    if (_links.length) {
        _links.forEach((l) => {
            if (l.type && linksTypeIconMap[l.type]) {
                let group = linksTypeIconMap[l.type].group;
                if (!legendData[group]) {
                    legendData[group] = [];
                }
                legendData[group][linksTypeIconMap[l.type].label] = l.type;
            }
        });
    }
    return legendData;
};
export const graphNodesUpdateInLegendData = (newGraphNodes) => {
    let _nodes = newGraphNodes;
    let legendData = {};
    if (_nodes.length) {
        _nodes.forEach((n) => {
            let group = itemGroupIconMap[n.label].group;
            if (!legendData[group]) {
                legendData[group] = [];
            }
            legendData[group][n.label] = n.label;
            n.properties.forEach((p) => {
                if (itemGroupIconMap[p.groupName]) {
                    let propertiesGroup = itemGroupIconMap[p.groupName].group;
                    legendData[propertiesGroup][p.groupName] = p.groupName;
                }
            });
        });
    }
    return legendData;
};
