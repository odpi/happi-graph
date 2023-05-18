import React, { useState } from 'react';

import {
  HappiGraph,
  HappiGraphActions
} from '../HappiGraph';

import { GraphType } from "../HappiGraph/happi-graph.helpers";

import './index.scss';
import '../HappiGraph/happi-graph.scss';

import { mockData } from '../../mockData';
import { Modal } from '@mantine/core';

const rawData = {
  ...mockData
};


export function App() {
  const [selectedNodeData, setSelectedNodeData] = useState(undefined);
  const [opened, setOpened] = useState(false);

  return <>
    <div className="container">
      <div style={{textAlign: 'center'}}>
        <h1>TEx</h1>
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
        <HappiGraph rawData={{...rawData}}
                    algorithm={"VISJS"}
                    graphType={GraphType.TEX_INHERITANCE}
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