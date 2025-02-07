import { Handle, useReactFlow } from '@xyflow/react';
import { useState } from 'react';
import CrossIcon from './icons/CrossIcon';

const CustomNode = ({ data, id, selected }) => {
	const { setNodes } = useReactFlow();
	const [isEditing, setIsEditing] = useState(false);
	const [label, setLabel] = useState(data.label);

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleChange = (event) => {
		setLabel(event.target.value);
	};

	const handleBlur = () => {
		setIsEditing(false);
		setNodes((nds) =>
			nds.map((node) =>
				node.id === id ? { ...node, data: { ...node.data, label } } : node
			)
		);
	};

	return (
		<div
			className={`relative bg-amber-100 max-w-60 p-4 border rounded-md shadow-md ${
				selected ? 'border-blue-500' : 'border-gray-300'
			}`}
			onDoubleClick={handleDoubleClick}
		>
			{isEditing ? (
				<textarea
					value={label}
					onChange={handleChange}
					onBlur={handleBlur}
					autoFocus
					className="w-full h-20 p-1 outline-none bg-transparent resize-none"
				/>
			) : (
				<p className="w-full break-words whitespace-pre-wrap">{label}</p>
			)}
			<button
				className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
				onClick={() =>
					setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
				}
			>
				<CrossIcon className={'!size-4'} />
			</button>
			<Handle type="target" position="left" id={id} />
			<Handle type="source" position="right" id={id} />
		</div>
	);
};

export default CustomNode;
