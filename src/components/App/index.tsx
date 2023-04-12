import React from 'react';

import {
  HappiGraph,
  HappiGraphActions
} from '../HappiGraph';

import './index.scss';
import '../HappiGraph/happi-graph.scss';

import { mockData } from '../../mockData';

const rawData = {
  ...mockData
};


export function App() {
  return <>
    <div className="container">
      <HappiGraph rawData={{...rawData}}
                  algorithm={""}
                  debug={false}
                  printMode={false}
                  graphDirection={"VERTICAL"}
                  selectedNodeId={"term@68e36496-7167-4af7-abdd-a0cd36e24084:6662c0f2.e1b1ec6c.66k78i6du.uchsna1.rn2epa.rfn2fjqf7h4qvmt5lflm8"}
                  actions={<HappiGraphActions rawData={{...rawData}}/>}
                  onNodeClick={(d: any) => console.log(d)}
                  onGraphRender={() => { console.log('Graph rendered');}} />
    </div>
  </>;
}
