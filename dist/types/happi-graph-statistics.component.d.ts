import React from 'react';
interface Props {
    nodes?: any;
}
interface State {
    data: any;
    opened: any;
}
/**
 *
 * React component used for displaying Action buttons.
 *
 * @since      0.1.0
 * @access     public
 *
 */
declare class HappiGraphStatistics extends React.Component<Props, State> {
    constructor(props: Props);
    generateData(nodes: any): any;
    setOpened(value: boolean): void;
    render(): JSX.Element;
}
export default HappiGraphStatistics;
