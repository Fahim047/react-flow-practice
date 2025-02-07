import { Handle } from '@xyflow/react';
import React, { useState } from 'react';

const InputNode = ({ id, data }) => {
	const [value, setValue] = useState(data.value);

	const handleChange = (e) => {
		const newValue = e.target.value;
		setValue(newValue);
		console.log(`Updating ${id} with value: ${newValue}`); // Debugging log
		data.onChange(id, newValue);
	};

	return (
		<div className="bg-gray-100 border border-gray-300 rounded-md p-4 w-48 text-center shadow-sm">
			<div className="text-sm font-medium text-gray-700 mb-2">{data.label}</div>
			{id === 'bg-color' ? (
				<input
					type="color"
					value={value}
					onChange={handleChange}
					className="w-full h-8 rounded-md cursor-pointer"
				/>
			) : (
				<input
					type="text"
					value={value}
					onChange={handleChange}
					className="w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
				/>
			)}
			<Handle
				type="source"
				position="right"
				className="bg-gray-600 w-3 h-3 rounded-full"
			/>
		</div>
	);
};

export default InputNode;
