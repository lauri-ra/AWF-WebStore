import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';
import { updateProduct, getProduct } from '../redux/actionCreators/productsActions';

const ModifyButtons = ({ product }) => {
	return (
		<div>
			<button
				data-testid={dataTestIds.clickId.submit}
				className='mx-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
				type='submit'
			>
				Update
			</button>
			<button
				data-testid={dataTestIds.clickId.cancel}
				className='mx-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
				onClick={() => navigate(`/products/${product.id}`)}
			>
				Cancel
			</button>
		</div>
	);
};

const ModifyForm = ({ product, handleUpdate }) => {
	return (
		<form
			data-testid={dataTestIds.containerId.form}
			className='flex flex-col items-center justify-start'
			onSubmit={handleUpdate}
		>
			<h1 className='font-semibold'>Modify product {product.name}</h1>
			<input
				readOnly
				data-testid={dataTestIds.valueId.id}
				className='my-2 block w-72 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
				value={product.id}
			/>
			<input
				data-testid={dataTestIds.inputId.name}
				className='my-2 block w-72 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
				type='text'
				id='name'
				defaultValue={product.name}
			/>
			<input
				data-testid={dataTestIds.inputId.description}
				className='my-2 block w-72 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
				type='text'
				id='description'
				defaultValue={product.description}
			/>
			<input
				data-testid={dataTestIds.inputId.price}
				className='my-2 block w-24 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
				type='text'
				id='price'
				defaultValue={product.price}
			/>
			<ModifyButtons product={product} />
		</form>
	);
};

const ProductModify = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getProduct(id));
	}, []);

	const products = useSelector((state) => state.products);

	if (products.length !== 1) {
		return null;
	}

	const product = products[0];

	const handleUpdate = (event) => {
		event.preventDefault();
		const updatedProduct = {
			id: product.id,
			name: event.target.name.value,
			description: event.target.description.value,
			price: event.target.price.value,
		};

		dispatch(updateProduct(updatedProduct));
		navigate(`/products/${product.id}`);
	};

	return <ModifyForm product={product} handleUpdate={handleUpdate} />;
};

export default ProductModify;
