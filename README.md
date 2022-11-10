# happi-graph

Generic graph rendering solution.

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

