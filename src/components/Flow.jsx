import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	Controls,
	ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import CustomEdge from './CustomEdge';
import CustomNode from './CustomNode';

const nodeTypes = {
	customNode: CustomNode,
};
const edgeTypes = {
	customEdge: CustomEdge,
};
const Flow = () => {
	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);

	const onNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[]
	);
	const onEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[]
	);
	const onConnect = useCallback((params) => {
		const edge = { ...params, animated: true, type: 'customEdge' };
		setEdges((eds) => addEdge(edge, eds));
	}, []);
	const addNode = () => {
		const newNodeId = `${nodes.length + 1}`;
		const newNode = {
			id: newNodeId,
			position: { x: 100, y: 150 + nodes.length * 5 },
			data: { label: `Node ${newNodeId}` },
			type: 'customNode',
		};
		setNodes((nds) => nds.concat(newNode));
	};
	return (
		<div className="relative h-screen">
			<div className="absolute top-4 right-4 p-4 z-50">
				<button
					onClick={addNode}
					className="px-3 py-2 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-600 text-white"
				>
					Add Node
				</button>
			</div>
			<ReactFlow
				nodes={nodes}
				onNodesChange={onNodesChange}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				fitView
			>
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
};

export default Flow;
