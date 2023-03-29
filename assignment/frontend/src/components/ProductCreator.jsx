import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/index.js';
import { addProduct } from '../redux/actionCreators/productsActions.js';
import { dataTestIds } from '../tests/constants/components.js';

/**
 *
 * @param {function} toggleVisibility
 * @returns Button component that toggles the visibility of the form.
 */
const AddProductBtn = ({ toggleVisibility }) => {
	return (
		<div className='flex justify-center' data-testid={dataTestIds.clickId.add}>
			<button
				onClick={toggleVisibility}
				className='my-4 rounded-md bg-sky-500 px-3 py-2 font-semibold text-white hover:bg-sky-400'
			>
				Add new product
			</button>
		</div>
	);
};

/**
 *
 * @param {function} handleSubmit
 * @param {object} name
 * @param {object} price
 * @param {object} description
 * @param {function} toggleVisibility
 * @returns Form component that creates a new product.
 */
const CreatorForm = ({ handleSubmit, name, price, description, toggleVisibility }) => {
	return (
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
				<button data-testid={dataTestIds.clickId.submit} onClick={handleSubmit}>
					submit
				</button>
				<button data-testid={dataTestIds.clickId.cancel} onClick={toggleVisibility}>
					cancel
				</button>
			</form>
		</div>
	);
};

/**
 *
 * @returns ProductCreator component that renders a form to create a new product.
 * Includes functions for adding a new product and toggling the visibility of the form.
 */
const ProductCreator = () => {
	const [visible, setVisible] = useState(false);

	const dispatch = useDispatch();

	const name = useField('text');
	const price = useField('text');
	const description = useField('text');

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newProduct = {
			price: price.value,
			name: name.value,
			image: 'http://example.com/aeiou',
			description: description.value,
		};
		dispatch(addProduct(newProduct));
	};

	return visible ? (
		<CreatorForm
			handleSubmit={handleSubmit}
			toggleVisibility={toggleVisibility}
			name={name}
			price={price}
			description={description}
		/>
	) : (
		<AddProductBtn toggleVisibility={toggleVisibility} />
	);
};

export default ProductCreator;
