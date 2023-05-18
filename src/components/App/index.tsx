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
    {/* <div className="container">
      <HappiGraph rawData={{...rawData}}
                  algorithm={""}
                  debug={false}
                  printMode={false}
                  graphDirection={"VERTICAL"}
                  selectedNodeId={"term@68e36496-7167-4af7-abdd-a0cd36e24084:6662c0f2.e1b1ec6c.66k78i6du.uchsna1.rn2epa.rfn2fjqf7h4qvmt5lflm8"}
                  actions={<HappiGraphActions rawData={{...rawData}}/>}
                  onNodeClick={(d: any) => console.log(d)}
                  onGraphRender={() => { console.log('Graph rendered');}} />
    </div> */}

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