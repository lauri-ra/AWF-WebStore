import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';

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

const Orders = () => {
	const user = useSelector((state) => state.auth);
	const orders = useSelector((state) => state.orders);

	return (
		<div data-testid={dataTestIds.containerId.main}>
			Orders
			{orders.length === 0 ? <div>No orders yet</div> : <AllOrders orders={orders} />}
		</div>
	);
};

export default Orders;
