import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';
import { deleteProduct } from '../redux/actionCreators/productsActions';

const Product = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.auth);
	const product = useSelector((state) => state.products.find((item) => item.id === id));

	const handleDelete = () => {
		dispatch(deleteProduct(id));
		navigate('/products');
	};

	return (
		<div
			data-testid={dataTestIds.linkId.inspect}
			className='flex flex-col items-center justify-start'
		>
			<div data-testid={dataTestIds.valueId.name}>{product.name}</div>
			<div data-testid={dataTestIds.valueId.description}>{product.description}</div>
			<div data-testid={dataTestIds.valueId.price}>{product.price}</div>
			{user.role === 'admin' ? (
				<div>
					<button
						data-testid={dataTestIds.clickId.delete}
						className='mx-2 rounded-md bg-rose-400 px-2 py-1 font-semibold text-white hover:bg-sky-400'
						onClick={handleDelete}
					>
						Delete
					</button>
					<Link to={`/products/${product.id}/modify`}>
						<button
							data-testid={dataTestIds.clickId.modify}
							className='mx-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
						>
							Modify
						</button>
					</Link>
				</div>
			) : (
				<button
					data-testid={dataTestIds.clickId.add}
					className='rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
				>
					Add to cart
				</button>
			)}
		</div>
	);
};

export default Product;
