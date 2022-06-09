import React from "react";
interface Props {
    actions: any;
    algorithm?: string;
    selectedNodeId: string;
    rawData: any;
    debug?: boolean;
    graphDirection?: string;
    nodeCountLimit?: number;
    nodeDistanceX?: number;
    nodeDistanceY?: number;
}
interface State {
    algorithm: string;
    rawData: any;
    debug: boolean;
    graphDirection: string;
    happiGraph: any;
    isLoading: boolean;
    links: any;
    nodeCountLimit: number;
    nodeDistanceX: number;
    nodeDistanceY: number;
    nodes: any;
    selectedNodeId: string;
    svg: any;
    zoom: any;
    allGroup: any;
    isFullscreen: boolean;
}
declare class HappiGraph extends React.Component<Props, State> {
    constructor(props: Props);
    selectAlgorithm(callback: Function): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    init(): void;
    setFullscreen(): void;
    render(): JSX.Element;
}
export default HappiGraph;
