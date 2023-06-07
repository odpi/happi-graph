import React, { useState } from 'react';

import {
  HappiGraph,
  HappiGraphActions
} from '../HappiGraph';

import { GraphType } from "../HappiGraph/happi-graph.helpers";

import './index.scss';
import '../HappiGraph/happi-graph.scss';

import { mockData } from '../../mockData';
import {texMockData} from '../HappiGraph/Tex/dataRender';
import { Modal } from '@mantine/core';

const rawData = {
  ...mockData
};


export function App() {
  const [selectedNodeData, setSelectedNodeData] = useState(undefined);
  const [opened, setOpened] = useState(false);
  const [graphType, selectGraphType] = useState(GraphType.TEX_INHERITANCE);

  const handleChange = (event: any) => {
    selectGraphType(Number(event.target.value));
  };

  const selectGraphData = () => {
    let graphData;
    switch(graphType) {
      case GraphType.LINEAGE: {
        graphData = mockData;
        break;
      }
      case GraphType.TEX_INHERITANCE: {
        graphData = texMockData;
        break;
      }
      case GraphType.TEX_NEIGHBOURHOOD: {
        graphData = texMockData;
        break;
      }
      default:
        graphData = texMockData;
        console.log('GRAPH_TYPE_NOT_SELECTED');
    }
    return graphData;
  } 

  return <>
    <div className="container">
      <div>
      <select value={graphType} onChange={handleChange}>
        <option value={GraphType.LINEAGE}>Lineage</option>
        <option value={GraphType.TEX_INHERITANCE}>Tex Entity Inheritance</option>
        <option value={GraphType.TEX_NEIGHBOURHOOD}>Tex Neighbourhood</option>
      </select>
    </div>

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
                    actions={<HappiGraphActions rawData={{...rawData}}/>}
                    onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }}
                    onGraphRender={() => { console.log('Graph rendered'); }} />
      </div>
    </div>
  </>;
}