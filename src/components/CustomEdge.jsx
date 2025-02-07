import {
	BezierEdge,
	EdgeLabelRenderer,
	getBezierPath,
	useReactFlow,
} from '@xyflow/react';

const CustomEdge = (props) => {
	const { setEdges } = useReactFlow();
	const {
		id,
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
	} = props;

	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
	});

	return (
		<>
			<BezierEdge {...props} />
			<EdgeLabelRenderer>
				<div
					onClick={() =>
						setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id))
					}
					style={{
						position: 'absolute',
						left: labelX,
						top: labelY,
						transform: 'translate(-50%, -50%)',
						pointerEvents: 'all',
					}}
					className="bg-white rounded-full px-2 py-1 text-xs font-bold text-red-500 border border-red-500 shadow-md cursor-pointer"
				>
					X
				</div>
			</EdgeLabelRenderer>
		</>
	);
};

export default CustomEdge;
