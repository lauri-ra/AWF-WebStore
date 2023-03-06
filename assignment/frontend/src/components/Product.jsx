import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';

const Product = () => {
	const { id } = useParams();

	const user = useSelector((state) => state.auth);
	const product = useSelector((state) => state.products.find((item) => item.id === id));

	return (
		<div data-testid={dataTestIds.linkId.inspect}>
			<div data-testid={dataTestIds.valueId.name}>{product.name}</div>
			<div data-testid={dataTestIds.valueId.description}>{product.description}</div>
			<div data-testid={dataTestIds.valueId.price}>{product.price}</div>
			{user.role === 'admin' ? (
				<div>
					<button data-testid={dataTestIds.clickId.delete}>Delete</button>
					<button data-testid={dataTestIds.clickId.modify}>Modify</button>
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
