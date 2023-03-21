import { useDispatch, useSelector } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';
import { addOrder } from '../redux/actionCreators/ordersActions';
import {
	incrementCartItem,
	decrementCartItem,
	removeCartItem,
} from '../redux/actionCreators/cartActions';

const CartItem = ({ item, handleDecrease, handleIncrease }) => {
	return (
		<div data-testid={`list-item-${item.product.id}-container`}>
			<div data-testid={dataTestIds.valueId.name}>{item.product.name}</div>
			<div data-testid={dataTestIds.valueId.price}>{item.product.price}</div>
			<div data-testid={dataTestIds.valueId.quantity}>{item.quantity}</div>
			<button
				data-testid={dataTestIds.clickId.reduce}
				onClick={handleDecrease}
				className='w-10 bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700'
			>
				<span className='m-auto text-2xl font-thin'>-</span>
			</button>
			<button
				data-testid={dataTestIds.clickId.add}
				onClick={handleIncrease}
				className='w-10 bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700'
			>
				<span className='m-auto text-2xl font-thin'>+</span>
			</button>
		</div>
	);
};

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const handleDecrease = (item) => {
		if (item.quantity === 0) {
			console.log('asdasdadsad');
			dispatch(removeCartItem(item));
		} else {
			dispatch(decrementCartItem(item.product.id));
		}
	};

	const handleIncrease = (item) => {
		dispatch(incrementCartItem(item.product.id));
	};

	const createOrder = () => {
		const cartItems = { items: cart };
		console.log(cartItems);
		dispatch(addOrder(cartItems));
	};

	return (
		<div data-testid={dataTestIds.containerId.main}>
			{cart.length === 0 ? (
				<div>cart empty</div>
			) : (
				<div>
					{cart.map((item) => (
						<CartItem
							key={item.product.id}
							item={item}
							handleDecrease={() => handleDecrease(item)}
							handleIncrease={() => handleIncrease(item)}
						/>
					))}

					<button
						data-testid={dataTestIds.clickId.add}
						onClick={createOrder}
						className='my-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
					>
						Place an order
					</button>
				</div>
			)}
		</div>
	);
};

export default Cart;
