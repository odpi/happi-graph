import {
  relativeTo,
  getNodeAnchorPoint,
  getLinkCoordinates
} from './happi-graph-helpers';

/*
  nodeB(0, 1)
    .
    .
    .
  nodeA(0, 0)
*/
test('nodeB should be above nodeA', () => {
  let nodeA = { x: 0, y: 0, width: 100, height: 100 };
  let nodeB = { x: 0, y: -101, width: 100, height: 100 };

  expect(relativeTo(nodeA, nodeB)).toMatchObject({"a": "TOP", "b": "BOTTOM"});
});

/*
                  . nodeB(1, 1)
                .
  nodeA(0, 0) .
*/
test('nodeB should be above nodeA and on the right', () => {
  let nodeA = { x: 0, y: 0, width: 100, height: 100 };
  let nodeB = { x: 101, y: -101, width: 100, height: 100 };

  expect(relativeTo(nodeA, nodeB)).toMatchObject({"a": "RIGHT", "b": "LEFT"});
});

/*
  nodeA(0, 0) . . . nodeB(1, 0)
*/
test('nodeB should be on the right of nodeA', () => {
  let nodeA = { x: 0, y: 0, width: 100, height: 100 };
  let nodeB = { x: 101, y: 0, width: 100, height: 100 };

  expect(relativeTo(nodeA, nodeB)).toMatchObject({"a": "RIGHT", "b": "LEFT"});
});

/*
  nodeA(0, 0) .
                .
                  . nodeB(1, -1)
*/
test('nodeB should be below nodeA on the right', () => {
  let nodeA = { x: 0, y: 0, width: 100, height: 100 };
  let nodeB = { x: 100, y: -101, width: 100, height: 100 };

  expect(relativeTo(nodeA, nodeB)).toMatchObject({"a": "RIGHT", "b": "LEFT"});
});

/*
  nodeA(0, 0)
    .
    .
    .
  nodeB(0, -1)
*/
test('nodeB should be below nodeA', () => {
  let nodeA = { x: 0, y: 0, width: 100, height: 100 };
  let nodeB = { x: 0, y: 101, width: 100, height: 100 };

  expect(relativeTo(nodeA, nodeB)).toMatchObject({"a": "BOTTOM", "b": "TOP"});
});

/*
                    . nodeA(0, 0)
                  .
  nodeB(-1, -1) .
*/
test('nodeB should be below nodeA on the left', () => {
  let nodeA = { x: 0, y: 0, width: 100, height: 100 };
  let nodeB = { x: -101, y: 101, width: 100, height: 100 };

  expect(relativeTo(nodeA, nodeB)).toMatchObject({"a": "LEFT", "b": "RIGHT"});
});

/*
  nodeB(-1, 0) . . . nodeA(0, 0)
*/
test('nodeB should be on left of nodeA', () => {
  let nodeA = { x: 0, y: 0, width: 100, height: 100 };
  let nodeB = { x: -101, y: 0, width: 100, height: 100 };

  expect(relativeTo(nodeA, nodeB)).toMatchObject({"a": "LEFT", "b": "RIGHT"});
});

/*
  nodeB(-1, 1) .
                 .
                   . nodeA(0, 0)
*/
test('nodeB should be above nodeA on the left', () => {
  let nodeA = { x: 0, y: 0, width: 100, height: 100 };
  let nodeB = { x: -101, y: -101, width: 100, height: 100 };

  expect(relativeTo(nodeA, nodeB)).toMatchObject({"a": "LEFT", "b": "RIGHT"});
});

test('getNodeAnchorPoint', () => {
  let node = {
    width: 100,
    height: 100,
    properties: {},
    x: 0,
    y: 0
  };

  expect(getNodeAnchorPoint(node, 'TOP', 'HORIZONTAL')).toMatchObject({ x: 50, y: 0 });
  expect(getNodeAnchorPoint(node, 'BOTTOM', 'HORIZONTAL')).toMatchObject({ x: 50, y: 100 });
  expect(getNodeAnchorPoint(node, 'LEFT', 'HORIZONTAL')).toMatchObject({ x: 0, y: 50 });
  expect(getNodeAnchorPoint(node, 'RIGHT', 'HORIZONTAL')).toMatchObject({ x: 100, y: 50 });
  expect(getNodeAnchorPoint({ ...node, properties: { a: 1 } }, 'RIGHT', 'HORIZONTAL')).toMatchObject({ x: 100, y: 50 });
});

test('getLinkCoordinates', () => {
  let nodeA = { width: 100, height: 100, properties: { a: 1, b: 2 }, x: 0, y: 0 };

  let nodeB = { width: 100, height: 100, properties: { a: 1 }, x: 0, y: 200 };

  expect(getLinkCoordinates(nodeA, nodeB, 'HORIZONTAL')).toMatchObject({
    from: {x: 50, y: 100},
    to: {x: 50, y: 200}
  });
});