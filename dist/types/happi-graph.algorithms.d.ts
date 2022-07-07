declare const visApproach: (nodes: any, links: any, graphDirection: string, nodeDistanceX: number, nodeDistanceY: number) => {
    nodes: any[];
    links: any[];
};
declare const elkApproach: (nodes: any, links: any, graphDirection: string, nodeDistanceX: number, nodeDistanceY: number, callback: Function) => void;
export { visApproach, elkApproach };
