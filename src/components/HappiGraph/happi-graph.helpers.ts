import { itemGroupIconMap } from "@lfai/egeria-js-commons";

enum GraphType {
  LINEAGE,
  TEX_INHERITANCE,
  TEX_NEIGHBOURHOOD,
}

const getNodeHeight = (length: number) => {
  const defaultHeight = 70;

  const computedHeight = length >= 1 ? length * 30 : 0;

  return defaultHeight + computedHeight;
};

const mapNodes = (nodes: any, selectedNodeId: string) => {
  return nodes.map((n: any) => {
    const keys = Object.keys(n.properties ? n.properties : {});

    const props = keys.map((k) => {
      const camelCased = k.charAt(0).toUpperCase() + k.slice(1);

      return {
        value: n.properties[k],
        label: k,
        icon: itemGroupIconMap[camelCased]
          ? itemGroupIconMap[camelCased].icon
          : "simple-square",
        groupName: camelCased,
      };
    });

    const result = {
      id: n.id,
      type: itemGroupIconMap[n.group]
        ? itemGroupIconMap[n.group].icon
        : "simple-square",
      value: n.label ? n.label : "N/A",
      label: n.group ? n.group : "N/A",
      selected: n.id === selectedNodeId,
      width: 300,
      height: getNodeHeight(props.length),
      properties: [...props],
      ...(n.tex && { tex: n.tex }),
    };

    return result;
  });
};

const mapLinks = (links: any, nodes: any) => {
  return links.map((l: any) => {
    return {
      id: `${l.from}-${l.to}`,
      label: l.label,

      from: nodes.filter((n: any) => n.id === l.from).pop(),
      to: nodes.filter((n: any) => n.id === l.to).pop(),

      source: l.from,
      target: l.to,

      connectionFrom: l.connectionFrom ? l.connectionFrom : false,
      connectionTo: l.connectionTo ? l.connectionTo : true,

      type: l.type,
    };
  });
};

export { GraphType, mapNodes, mapLinks };
