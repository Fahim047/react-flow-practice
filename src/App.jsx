import { useState } from 'react';
import Flow from './components/Flow';
import PaymentFlow from './components/PaymentFlow';

const App = () => {
	const [isPractice, setIsPractice] = useState(false);

	return (
		<div className="text-end py-4 relative z-[999]">
			<button
				className="bg-yellow-600 cursor-pointer text-white px-4 py-2 rounded-md"
				onClick={() => setIsPractice((prev) => !prev)}
			>
				{isPractice ? 'Switch to Payment Flow' : 'Switch to Practice'}
			</button>
			{isPractice ? <Flow /> : <PaymentFlow />}
		</div>
	);
};

export default App;
