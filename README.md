# happi-graph component

Happi Graph Component using Polymer 3.0.

## Demo

```html
<button id="zoom-in">+</button>
<button id="zoom-out">-</button>
<button id="center-graph">center-graph</button>
<button id="remove-data">remove-data</button>
<button id="add-data">add-data</button>

<happi-graph id="happi-graph"></happi-graph>
```

```js
let propertiesMap = {
  SimpleSquare: 'simple-square'
};

let iconsMap = {
  'simple-square': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H20V20H0V0Z" fill="white"/></svg>`,
};

let happiGraphInstance = document.querySelector('#happi-graph');

let data = {
  graphDirection: 'VERTICAL',
  selectedNodeId: 0,
  nodes: [
    { id: 0, properties: {} },
    { id: 1, properties: {} },
    { id: 2, properties: {} },
    { id: 3, properties: {} },
    { id: 4, properties: {} },
  ],
  links: []
};

data.links = [
  { from: 0, to: 1, connectionFrom: false, connectionTo: true },
  { from: 0, to: 2, connectionFrom: false, connectionTo: true },
  { from: 0, to: 3, connectionFrom: false, connectionTo: true },
  { from: 3, to: 4, connectionFrom: false, connectionTo: true }
];

happiGraphInstance.data = { ...data };
happiGraphInstance.iconsMap = iconsMap;
happiGraphInstance.propertiesMap = propertiesMap;

zoomIn.addEventListener('click', () => {
  happiGraphInstance.customZoomIn();
});

zoomOut.addEventListener('click', () => {
  happiGraphInstance.customZoomOut();
});

centerGraph.addEventListener('click', () => {
  happiGraphInstance.centerGraph();
});

document.querySelector('#remove-data').addEventListener('click', () => {
  happiGraphInstance.removeData();
});

document.querySelector('#add-data').addEventListener('click', () => {
  happiGraphInstance.data = { ...data };
});
```

## Example

![3 nodes graph example](./docs/print-screen-happi-graph-3-nodes.png?raw=true "3 nodes graph example")

## License
[MIT](https://choosealicense.com/licenses/mit/)
