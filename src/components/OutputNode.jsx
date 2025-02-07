import React from 'react';

const OutputNode = ({ data }) => {
	const { backgroundColor, fontSize, text } = data.style;

	return (
		<div
			className="border border-gray-300 rounded-md p-6 w-64 text-center shadow-lg"
			style={{
				backgroundColor: backgroundColor || '#ffffff',
				fontSize: fontSize || '16px',
				color: '#000',
			}}
		>
			{text || 'Output'}
		</div>
	);
};

export default OutputNode;
