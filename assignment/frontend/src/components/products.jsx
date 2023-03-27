import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actionCreators/productsActions';
import { dataTestIds } from '../tests/constants/components';

import ProductCreator from './ProductCreator';

const Products = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const user = useSelector((state) => state.auth);

	useEffect(() => {
		if (products.length === 0 || products.length === 1) {
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
							View
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
