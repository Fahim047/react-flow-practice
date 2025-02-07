import { Background, Controls, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState } from 'react';

const initialNodes = [
	{
		id: 'start',
		type: 'input',
		position: { x: 0, y: 250 },
		data: { label: 'Start' },
	},
	{
		id: 'checkInput',
		position: { x: 200, y: 250 },
		data: { label: 'Check Input' },
	},
	{
		id: 'loop',
		position: { x: 400, y: 250 },
		data: { label: 'Loop i = 2 to √N' },
	},
	{
		id: 'divisible',
		position: { x: 600, y: 250 },
		data: { label: 'Is N divisible by i?' },
	},
	{
		id: 'notPrime',
		position: { x: 800, y: 150 },
		data: { label: 'Not Prime' },
	},
	{
		id: 'increment_i',
		position: { x: 800, y: 350 },
		data: { label: 'Increment i' },
	},
	{ id: 'prime', position: { x: 1000, y: 250 }, data: { label: 'Prime' } },
	{
		id: 'end',
		type: 'output',
		position: { x: 1200, y: 250 },
		data: { label: 'End' },
	},
];

const initialEdges = [
	{ id: 'e1', source: 'start', target: 'checkInput' },
	{ id: 'e2', source: 'checkInput', target: 'loop' },
	{ id: 'e3', source: 'loop', target: 'divisible' },
	{ id: 'e4', source: 'divisible', target: 'notPrime', label: 'Yes' },
	{ id: 'e5', source: 'divisible', target: 'increment_i', label: 'No' },
	{ id: 'e6', source: 'increment_i', target: 'loop', label: 'Next i' },
	{ id: 'e7', source: 'loop', target: 'prime', label: 'Loop Complete' },
	{ id: 'e8', source: 'notPrime', target: 'end' },
	{ id: 'e9', source: 'prime', target: 'end' },
];

const PrimeCheckFlow = () => {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);
	const [inputNumber, setInputNumber] = useState('');
	const [result, setResult] = useState('');
	const [highlightedNodes, setHighlightedNodes] = useState([]);
	const [highlightedEdges, setHighlightedEdges] = useState([]);

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

		const num = parseInt(inputNumber, 10);
		if (isNaN(num) || num < 1) {
			setResult('Please enter a valid number greater than 0');
			return;
		}

		let isPrime = num > 1;
		let path = [
			{ node: 'start', edge: 'e1' },
			{ node: 'checkInput', edge: 'e2' },
			{ node: 'loop', edge: 'e3' },
		];

		if (num === 1) {
			path.push({ node: 'notPrime', edge: 'e8' }, { node: 'end' });
			await highlightPath(path);
			setResult('Not Prime');
			return;
		}

		let foundDivisor = false;
		for (let i = 2; i * i <= num; i++) {
			path.push({ node: 'divisible', edge: 'e3' });
			if (num % i === 0) {
				isPrime = false;
				foundDivisor = true;
				path.push({ node: 'notPrime', edge: 'e4' }, { node: 'end' });
				break;
			}
			path.push(
				{ node: 'increment_i', edge: 'e5' },
				{ node: 'loop', edge: 'e6' }
			);
		}

		if (!foundDivisor) {
			path.push({ node: 'prime', edge: 'e7' }, { node: 'end', edge: 'e9' });
		}

		await highlightPath(path);
		setResult(isPrime ? 'Prime' : 'Not Prime');
	};

	return (
		<div className="h-screen w-full p-4">
			<div className="flex items-center space-x-4 mb-4">
				<input
					type="number"
					value={inputNumber}
					onChange={(e) => setInputNumber(e.target.value)}
					placeholder="Enter a number"
				/>
				<button onClick={handleStartFlow}>Start Flow</button>
				<p>{result}</p>
			</div>
			<ReactFlow
				nodes={nodes.map((node) => ({
					...node,
					style: highlightedNodes.includes(node.id)
						? { backgroundColor: 'lightgreen' }
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

export default PrimeCheckFlow;
