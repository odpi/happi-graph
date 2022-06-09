import { DataSet, Network } from 'vis-network/standalone/index';
import ELK from 'elkjs';
const visApproach = (nodes, links, graphDirection, nodeDistanceX, nodeDistanceY) => {
    let nodeMap = {};
    const _nodes = new DataSet([
        ...nodes.map((n) => {
            let _node = Object.assign(Object.assign({}, n), { value2: n.value });
            nodeMap[n.id] = _node;
            return _node;
        })
    ]);
    const edges = new DataSet([
        ...links.map((l) => {
            return {
                from: l.from.id,
                to: l.to.id
            };
        })
    ]);
    // /*
    let options = {
        autoResize: true,
        physics: {
            enabled: false,
            hierarchicalRepulsion: {
                avoidOverlap: 1,
            }
        },
        edges: {
            arrows: {
                to: {
                    scaleFactor: 1
                }
            }
        },
        layout: {
            improvedLayout: false,
            hierarchical: {
                enabled: true,
                levelSeparation: nodeDistanceY,
                nodeSpacing: nodeDistanceX,
                treeSpacing: 200,
                direction: graphDirection === 'HORIZONTAL' ? 'LR' : 'DU',
                sortMethod: 'directed',
                shakeTowards: 'leaves' // roots, leaves
            }
        }
    };
    let data = {
        nodes: _nodes,
        edges: edges
    };
    let e = document.createElement('div');
    let network = new Network(e, data, options);
    let positions = network.getPositions();
    const finalNodes = Object.keys(positions).map(id => {
        return Object.assign(Object.assign({}, nodeMap[id]), { value: nodeMap[id].value2, x: positions[id].x, y: positions[id].y });
    });
    const finalLinks = links.map((l) => {
        return Object.assign(Object.assign({}, l), { from: finalNodes.filter(n => n.id === l.from.id).pop(), to: finalNodes.filter(n => n.id === l.to.id).pop() });
    });
    return {
        nodes: [...finalNodes],
        links: [...finalLinks]
    };
};
const elkApproach = (nodes, links, graphDirection, nodeDistanceX, nodeDistanceY, callback) => {
    const elk = new ELK({});
    const graph = {
        id: "root",
        layoutOptions: {
            "elk.algorithm": "layered",
            "elk.spacing.nodeNode": `${nodeDistanceY}`,
            "elk.layered.spacing.baseValue": `${nodeDistanceX}`,
            "elk.direction": graphDirection === 'HORIZONTAL' ? 'RIGHT' : 'UP'
        },
        children: [
            ...nodes
        ],
        edges: [
            ...links
        ]
    };
    elk.layout(graph)
        .then((g) => {
        callback({
            nodes: [...g.children],
            links: [...g.edges]
        });
    });
    // .catch(console.error)
};
export { visApproach, elkApproach };
