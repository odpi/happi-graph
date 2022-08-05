import { iconsMap, linksTypeIconMap, itemGroupIconMap } from "egeria-js-commons";
export declare const simpleSquareIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0H20V20H0V0Z\" fill=\"white\"/></svg>";
export declare const addProperties: (nodeGroup: any) => void;
export declare const addIcon: (nodeGroup: any, iconsMap: any) => void;
declare const addNodes: (nodes: any, nodesGroup: any, graphDirection: string, onNodeClick?: Function) => void;
declare const centerGraph: (allGroup: any, svg: any, zoom: any) => void;
declare const customZoom: (value: number, zoom: any, svg: any) => void;
declare const customZoomIn: (zoom: any, svg: any) => void;
declare const customZoomOut: (zoom: any, svg: any) => void;
export declare const relativeTo: (nodeA: any, nodeB: any, graphDirection: string) => {
    a: string;
    b: string;
};
export declare const getNodeAnchorPoint: (node: any, point: any) => {
    x: any;
    y: any;
};
export declare const getLinkCoordinates: (nodeA: any, nodeB: any, graphDirection: string) => {
    from: {
        x: any;
        y: any;
    };
    to: {
        x: any;
        y: any;
    };
};
declare const addLinks: (links: any, linksGroup: any, graphDirection: string, nodes: any) => void;
export { addNodes, addLinks, centerGraph, customZoom, customZoomIn, customZoomOut, linksTypeIconMap, iconsMap, itemGroupIconMap };
