import { Background, Controls, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState } from 'react';

const initialNodes = [
	{
		id: 'start',
		type: 'input',
		position: { x: 0, y: 150 },
		data: { label: 'Start Payment' },
	},
	{
		id: 'processing',
		position: { x: 200, y: 150 },
		data: { label: 'Processing Payment' },
	},
	{
		id: 'success',
		position: { x: 400, y: 100 },
		data: { label: 'Payment Success' },
	},
	{
		id: 'failed',
		position: { x: 400, y: 200 },
		data: { label: 'Payment Failed' },
	},
	{
		id: 'end',
		type: 'output',
		position: { x: 600, y: 150 },
		data: { label: 'End' },
	},
];

const initialEdges = [
	{ id: 'e1', source: 'start', target: 'processing' },
	{ id: 'e2', source: 'processing', target: 'success', label: 'Success' },
	{ id: 'e3', source: 'processing', target: 'failed', label: 'Failed' },
	{ id: 'e4', source: 'success', target: 'end' },
	{ id: 'e5', source: 'failed', target: 'end' },
];

const PaymentFlow = () => {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);
	const [highlightedNodes, setHighlightedNodes] = useState([]);
	const [highlightedEdges, setHighlightedEdges] = useState([]);
	const [result, setResult] = useState('');

	const highlightPath = async (path) => {
		for (const step of path) {
			setHighlightedNodes((prev) => [...prev, step.node]);
			if (step.edge) {
				setHighlightedEdges((prev) => [...prev, step.edge]);
			}
			await new Promise((resolve) => setTimeout(resolve, 500));
		}
	};

	const handleStartFlow = async () => {
		setHighlightedNodes([]);
		setHighlightedEdges([]);

		let path = [{ node: 'start', edge: 'e1' }, { node: 'processing' }];

		const isSuccess = Math.random() > 0.5;
		if (isSuccess) {
			path.push({ node: 'success', edge: 'e2' }, { node: 'end', edge: 'e4' });
			setResult('Payment Successful');
		} else {
			path.push({ node: 'failed', edge: 'e3' }, { node: 'end', edge: 'e5' });
			setResult('Payment Failed');
		}

		await highlightPath(path);
	};

	const handleResetFlow = () => {
		setHighlightedNodes([]);
		setHighlightedEdges([]);
		setResult('');
	};

	return (
		<div className="h-screen w-full p-4">
			<div className="absolute top-4 left-4 z-50 flex items-center space-x-4 mb-4">
				<button
					className="bg-emerald-300 px-3 py-2 rounded-md cursor-pointer"
					onClick={handleStartFlow}
				>
					Start Flow
				</button>
				<button
					className="bg-gray-600 text-white px-3 py-2 rounded-md cursor-pointer"
					onClick={handleResetFlow}
				>
					Reset
				</button>
				<p>{result}</p>
			</div>
			<ReactFlow
				nodes={nodes.map((node) => ({
					...node,
					style: highlightedNodes.includes(node.id)
						? node.id === 'failed'
							? { backgroundColor: 'tomato' }
							: { backgroundColor: 'lightgreen' }
						: {},
				}))}
				edges={edges.map((edge) => ({
					...edge,
					animated: highlightedEdges.includes(edge.id),
				}))}
				fitView
			>
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
};

export default PaymentFlow;
