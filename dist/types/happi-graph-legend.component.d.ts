import React from 'react';
interface Props {
    nodes: any;
    links: any;
}
interface State {
    nodes: any;
    links: any;
    isMinimised: boolean;
    legendData: any;
}
/**
 *
 * React component used for displaying Action buttons.
 *
 * @since      0.1.0
 * @access     public
 *
 */
declare class HappiGraphLegend extends React.Component<Props, State> {
    constructor(props: Props);
    toggleMinimise(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default HappiGraphLegend;
