import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';
import { updateProduct } from '../redux/actionCreators/productsActions';

const ProductModify = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const product = useSelector((state) => state.products.find((item) => item.id === id));

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
			<div>
				<button
					className='mx-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
					type='submit'
				>
					Update
				</button>
				<button
					className='mx-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
					onClick={() => navigate(`/products/${product.id}`)}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default ProductModify;
