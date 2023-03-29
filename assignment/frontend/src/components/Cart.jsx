import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';
import { addOrder } from '../redux/actionCreators/ordersActions';
import {
	incrementCartItem,
	decrementCartItem,
	removeCartItem,
} from '../redux/actionCreators/cartActions';

/**
 *
 * @param {object} item
 * @param {function} handleDecrease
 * @param {function} handleIncrease
 * @returns Component for specific item in cart.
 */
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

/**
 *
 * @param {function} createOrder
 * @returns Button to place an order
 */
const OrderButton = ({ createOrder }) => {
	return (
		<button
			data-testid={dataTestIds.clickId.submit}
			onClick={createOrder}
			className='my-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
		>
			Place an order
		</button>
	);
};

/**
 *
 * @returns Cart component. Displays the items in the cart and allows the user to place an order.
 */
const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth);

	const handleDecrease = (item) => {
		if (item.quantity === 1) {
			dispatch(removeCartItem(item.product));
		} else {
			dispatch(decrementCartItem(item.product.id));
		}
	};

	const handleIncrease = (item) => {
		dispatch(incrementCartItem(item.product.id));
	};

	const createOrder = () => {
		if (user.role === 'guest') {
			navigate('/login');
		} else {
			const cartItems = { items: cart };
			console.log(cartItems);
			dispatch(addOrder(cartItems));
		}
	};

	return (
		<div data-testid={dataTestIds.containerId.main}>
			{cart.length === 0 ? (
				<div data-testid={dataTestIds.containerId.empty}>cart empty</div>
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

					<OrderButton createOrder={createOrder} />
				</div>
			)}
		</div>
	);
};

export default Cart;
