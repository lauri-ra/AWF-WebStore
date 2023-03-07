import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { dataTestIds } from '../tests/constants/components';

const ProductCreator = () => {
	const [visible, setVisible] = useState(false);

	const dispatch = useDispatch();

	const name = useField('text');
	const price = useField('text');
	const description = useField('text');

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return visible ? (
		<div className='flex justify-center'>
			<button
				onClick={toggleVisibility}
				className='my-4 rounded-md bg-sky-500 px-3 py-2 font-semibold text-white hover:bg-sky-400'
			>
				Add new product
			</button>
		</div>
	) : (
		<div className='my-2 flex justify-center border-2'>
			<form className='flex flex-col' data-testid={dataTestIds.containerId.form}>
				<input
					data-testid={dataTestIds.inputId.name}
					placeholder='product name'
					className='my-2 block w-60 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
					{...name}
				/>
				<input
					data-testid={dataTestIds.inputId.price}
					placeholder='price (€)'
					className='my-2 block w-60 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
					{...price}
				/>
				<input
					data-testid={dataTestIds.inputId.description}
					placeholder='product description'
					className='my-2 block w-60 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
					{...description}
				/>
				<button>submit</button>
				<button onClick={toggleVisibility}>cancel</button>
			</form>
		</div>
	);
};

export default ProductCreator;
