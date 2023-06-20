import React, { useState, useEffect } from 'react';

import {
  HappiGraph,
  HappiGraphActions
} from '../HappiGraph';

import { GraphType } from "../HappiGraph/happi-graph.helpers";

import './index.scss';
import '../HappiGraph/happi-graph.scss';

import { mockData as lineageMockData } from '../../mockData';
import {texMockData} from '../HappiGraph/Tex/dataRender';
import { Modal } from '@mantine/core';



export function App() {
  const [selectedNodeData, setSelectedNodeData] = useState(undefined);
  const [opened, setOpened] = useState(false);
  //To switch the graph types displayed between Lineage/Inheritance/Neighbourhood graphs, change the initial graphType state to your preference
  const [graphType, setGraphType] = useState(GraphType.LINEAGE);

  const selectGraphData = () => {
    let objectGraphData;
    switch(graphType) {
      case GraphType.LINEAGE: {
        objectGraphData = lineageMockData;
        break;
      }
      case GraphType.TEX_INHERITANCE: {
        objectGraphData = texMockData;
        break;
      }
      case GraphType.TEX_NEIGHBOURHOOD: {
        objectGraphData = texMockData;
        break;
      }
      default:
        objectGraphData = texMockData;
        console.log('GRAPH_TYPE_NOT_SELECTED');
    }
    return objectGraphData;
  } 

  return <>
    <div className="container">

      <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          withCloseButton={false}
          centered
          size="50%"
        >
          { selectedNodeData && JSON.stringify(selectedNodeData) }
        </Modal>

      <div style={{width: 1200, height: 800, margin: '0 auto'}}>
        <HappiGraph rawData={{...selectGraphData()}}
                    algorithm={"VISJS"}
                    graphType={graphType}
                    debug={false}
                    printMode={false}
                    graphDirection={"HORIZONTAL"}
                    selectedNodeId={""}
                    actions={<HappiGraphActions rawData={{...selectGraphData()}}/>}
                    onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }}
                    onGraphRender={() => { console.log('Graph rendered'); }} />
      </div>
    </div>
  </>;
}