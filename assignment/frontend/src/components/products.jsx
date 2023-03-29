import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../redux/actionCreators/productsActions.js';
import { addCartItem, incrementCartItem } from '../redux/actionCreators/cartActions.js';
import { dataTestIds } from '../tests/constants/components.js';

import ProductCreator from './ProductCreator.jsx';

/**
 *
 * @param {object} product
 * @returns Panel component for the user. Contains the add to cart button and functions for it.
 */
const UserPanel = ({ product }) => {
	const dispatch = useDispatch();

	const handleAdd = () => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		const { image, ...cartProduct } = product;

		if (cart.length === 0) {
			console.log('added to cart because cart was empty');
			dispatch(addCartItem(cartProduct));
			return;
		}

		const existingItem = cart.find((item) => item.product.id === product.id);
		if (existingItem) {
			console.log('incremented item since it already existed');
			dispatch(incrementCartItem(existingItem.product.id));
		} else {
			console.log('added to cart because it did not exist');
			dispatch(addCartItem(cartProduct));
		}
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

/**
 *
 * @param {object} product
 * @returns Panel component for the admin. Contains modify and delete buttons and functions for them.
 */
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

/**
 *
 * @returns Products component. Gets all the products and lists them.
 * Depending on the user's role, it will show the admin panel & ProductCreator or the user panel.
 */
const Products = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const user = useSelector((state) => state.auth);

	useEffect(() => {
		if (products.length <= 1) {
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
