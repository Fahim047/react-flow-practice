export const initialNodes = [
	{
		id: 'start',
		type: 'input',
		position: { x: 250, y: 0 },
		data: { label: 'Start' },
	},
	{ id: 'input', position: { x: 250, y: 100 }, data: { label: 'Input N' } },
	{ id: 'check1', position: { x: 250, y: 200 }, data: { label: 'Is N ≤ 1?' } },
	{
		id: 'notPrime1',
		position: { x: 100, y: 300 },
		data: { label: 'Not Prime' },
	},
	{
		id: 'loop',
		position: { x: 250, y: 300 },
		data: { label: 'Loop i = 2 to √N' },
	},
	{
		id: 'divisible',
		position: { x: 250, y: 400 },
		data: { label: 'Is N divisible by i?' },
	},
	{
		id: 'notPrime2',
		position: { x: 100, y: 500 },
		data: { label: 'Not Prime' },
	},
	{
		id: 'increment_i',
		position: { x: 400, y: 400 },
		data: { label: 'Increment i' },
	},
	{ id: 'prime', position: { x: 400, y: 500 }, data: { label: 'Prime' } },
	{
		id: 'end',
		type: 'output',
		position: { x: 250, y: 600 },
		data: { label: 'End' },
	},
];

export const initialEdges = [
	{ id: 'e1', source: 'start', target: 'input' },
	{ id: 'e2', source: 'input', target: 'check1' },
	{ id: 'e3', source: 'check1', target: 'notPrime1', label: 'Yes' },
	{ id: 'e4', source: 'check1', target: 'loop', label: 'No' },
	{ id: 'e5', source: 'loop', target: 'divisible', animated: true },
	{ id: 'e6', source: 'divisible', target: 'notPrime2', label: 'Yes' },
	{
		id: 'e7',
		source: 'divisible',
		target: 'increment_i',
		label: 'No',
		animated: true,
		labelStyle: { fill: 'green' },
	},
	{
		id: 'e8',
		source: 'increment_i',
		target: 'loop',
		label: 'Next i',
		animated: true,
	},
	{
		id: 'e9',
		source: 'loop',
		target: 'prime',
		label: 'Loop Complete',
		animated: true,
		labelStyle: { fill: 'green' },
	},
	{ id: 'e10', source: 'notPrime1', target: 'end', animated: true },
	{ id: 'e11', source: 'notPrime2', target: 'end', animated: true },
	{ id: 'e12', source: 'prime', target: 'end', animated: true },
];
