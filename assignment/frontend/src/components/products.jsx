import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../redux/actionCreators/productsActions';
import { addCartItem } from '../redux/actionCreators/cartActions';
import { dataTestIds } from '../tests/constants/components';

import ProductCreator from './ProductCreator';

const UserPanel = ({ product }) => {
	const dispatch = useDispatch();

	const handleAdd = () => {
		const { image, ...cartProduct } = product;
		dispatch(addCartItem(cartProduct));
	};

	return (
		<button
			data-testid={dataTestIds.clickId.add}
			className='rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
			onClick={handleAdd}
		>
			Add to cart
		</button>
	);
};

const AdminPanel = ({ product }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteProduct(product.id));
	};

	return (
		<div className='mt-2 mb-1'>
			<Link to={`/products/${product.id}/modify`}>
				<button
					data-testid={dataTestIds.clickId.modify}
					className='mx-2 mt-2 mb-1 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
				>
					Modify
				</button>
			</Link>
			<button
				data-testid={dataTestIds.clickId.delete}
				onClick={handleDelete}
				className='mx-2 rounded-md bg-rose-400 px-2 py-1 font-semibold text-white hover:bg-sky-400'
			>
				Delete
			</button>
		</div>
	);
};

const Products = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const user = useSelector((state) => state.auth);

	useEffect(() => {
		if (products.length <= 1) {
			console.log('getting all products');
			dispatch(getProducts());
		}
	}, []);

	return (
		<div data-testid={dataTestIds.containerId.main}>
			<div className='flex justify-center text-3xl'>Produts</div>

			{user.role === 'admin' && <ProductCreator />}

			<div className='mx-5 grid grid-cols-4 place-items-center gap-3 pt-3'>
				{products.map((product) => (
					<div
						key={product.id}
						data-testid={`list-item-${product.id}-container`}
						className='my-3.5 w-64 rounded-md bg-sky-200 px-3.5 py-2 shadow-lg ring-1 ring-white/10 transition duration-100 hover:scale-105 hover:bg-sky-300'
					>
						<div data-testid={dataTestIds.valueId.name} className='mx-2 font-semibold'>
							{product.name}
						</div>
						<div data-testid={dataTestIds.valueId.price} className='mx-2'>
							{product.price} euros
						</div>
						<Link
							to={`/products/${product.id}`}
							data-testid={dataTestIds.linkId.inspect}
							className='mx-2 italic'
						>
							inspect
						</Link>
						{user.role === 'admin' ? (
							<AdminPanel product={product} />
						) : (
							<UserPanel product={product} />
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
