import React from 'react';
interface Props {
    zoomIn?: Function;
    rawData?: any;
}
interface State {
    nodes: any;
    links: any;
}
/**
 *
 * React component used for displaying Action buttons.
 *
 * @since      0.1.0
 * @access     public
 *
 */
declare class HappiGraphActions extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
export default HappiGraphActions;
