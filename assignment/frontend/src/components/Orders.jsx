import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../redux/actionCreators/ordersActions';
import { dataTestIds } from '../tests/constants/components';

/**
 *
 * @param {object} orders
 * @returns Lists all orders and links to inspect each order.
 */
const AllOrders = ({ orders }) => {
	return (
		<div className='mx-5 grid grid-cols-4 place-items-center gap-3 pt-3'>
			{orders.map((order) => (
				<div
					key={order.id}
					data-testid={`list-item-${order.id}-container`}
					className='my-3.5 w-64 rounded-md bg-sky-200 px-3.5 py-2 shadow-lg ring-1 ring-white/10 transition duration-100 hover:scale-105 hover:bg-sky-300'
				>
					<div data-testid={dataTestIds.valueId.id} className='mx-2 font-semibold'>
						{order.id}
					</div>
					<Link
						to={`/orders/${order.id}`}
						data-testid={dataTestIds.linkId.inspect}
						className='mx-2 underline'
					>
						inspect order
					</Link>
				</div>
			))}
		</div>
	);
};

/**
 *
 * @returns Fetches all orders from the backend or the state and displays them.
 */
const Orders = () => {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.orders);

	useEffect(() => {
		if (orders.length === 0 || orders.length === 1) {
			dispatch(getOrders());
		}
	}, []);

	return (
		<div data-testid={dataTestIds.containerId.main}>
			Orders
			{orders.length === 0 ? (
				<div data-testid={dataTestIds.containerId.empty}>No orders yet</div>
			) : (
				<AllOrders orders={orders} />
			)}
		</div>
	);
};

export default Orders;
