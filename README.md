# happi-graph

Generic graph rendering solution.

### `props`
* `actions` (type: `any`, `required`, default: `<></>`)\
  A collection of action buttons that can be implemented outside of the component.
* `algorithm` (`string`, default: `ELK`)\
  There are two algorithm used: ELK and VISJS. These are used to draw separately horizontal and/or vertical graphs.
* `debug` (`boolean`, default: `false`)\
  Flag used to log different information for debugging.        
* `graphDirection` (`string`, default: `HORIZONTAL`)\
  Type of graph, horizontal or vertical. It determines the direction of the graph.
* `nodeCountLimit` (`number`, default: `0`)\
  Property used to determine the zoom level.
* `nodeDistanceX` (`number`, default: `350`)\
  Distance measured on X axis between nodes. Measured in pixels.
* `nodeDistanceY` (`number`, default: `350`)\
  Distance measured on Y axis between nodes. Measured in pixels.
* `onGraphRender` (`Function`, default: `empty function`)\
  Handler used to execute a callback after the initial render of the graph.
* `onNodeClick` (`Function`, default: `empty function`)\
  Callback function used to handle click events on nodes.
* `printMode` (`boolean`, default: `false`)\
  Flag that prepares the component to be printed.
* `rawData` (`any`, `required`, value: `{ nodes: [], edges: [] }`)\
  Actual nodes and links data that will be displayed.
* `selectedNodeId` (`string`, `required`, value: `id`)\
  Id of the main node around which the graph is constructed.

## Print mode for lineage
This mode enables to display only the lineage graph, without the action buttons and legend. 

It can be activated by setting _printMode_, by default it is **false**.

### Example
```ts
<HappiGraph rawData={{...rawData}}
            algorithm={""}
            debug={false}
            printMode={true}
            graphDirection={"VERTICAL"}
            selectedNodeId={"term@68e36496-7167-4af7-abdd-a0cd36e24084:6662c0f2.e1b1ec6c.66k78i6du.uchsna1.rn2epa.rfn2fjqf7h4qvmt5lflm8"}
            actions={<HappiGraphActions rawData={{...rawData}}/>}
            onNodeClick={(d: any) => console.log(d)}
            onGraphRender={() => { console.log('Graph rendered');}} />/>
```