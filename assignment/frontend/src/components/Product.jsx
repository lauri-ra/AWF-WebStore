import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';
import { deleteProduct, getProduct } from '../redux/actionCreators/productsActions';
import { addCartItem } from '../redux/actionCreators/cartActions';

const AdminPanel = ({ product }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDelete = () => {
		dispatch(deleteProduct(product.id));
		navigate('/products');
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

const Product = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth);
	const products = useSelector((state) => state.products);

	useEffect(() => {
		if (products.length === 0) {
			console.log('getting single product');
			dispatch(getProduct(id));
		}
	});

	const product = products.find((item) => item.id === id);

	if (!product) return null;

	const handleAdd = () => {
		const { image, ...cartProduct } = product;
		dispatch(addCartItem(cartProduct));
	};

	return (
		<div
			data-testid={dataTestIds.containerId.inspect}
			className='flex flex-col items-center justify-start'
		>
			<div data-testid={dataTestIds.valueId.name}>{product.name}</div>
			<div data-testid={dataTestIds.valueId.description}>{product.description}</div>
			<div data-testid={dataTestIds.valueId.price}>{product.price}</div>
			{user.role === 'admin' ? (
				<AdminPanel product={product} />
			) : (
				<button
					data-testid={dataTestIds.clickId.add}
					className='rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
					onClick={handleAdd}
				>
					Add to cart
				</button>
			)}
		</div>
	);
};

export default Product;
