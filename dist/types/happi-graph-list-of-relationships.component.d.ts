import React from 'react';
interface Props {
    nodes?: any;
    links?: any;
}
interface State {
    data: any;
    opened: boolean;
}
/**
 *
 * React component used for displaying Action buttons.
 *
 * @since      0.1.0
 * @access     public
 *
 */
declare class HappiGraphListOfRelationships extends React.Component<Props, State> {
    constructor(props: Props);
    generateData(nodes: any, links: any): any;
    setOpened(value: boolean): void;
    render(): JSX.Element;
}
export default HappiGraphListOfRelationships;
