import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { dataTestIds } from '../tests/constants/components.js';
import { getOrder } from '../redux/actionCreators/ordersActions.js';
import { useEffect } from 'react';

/**
 *
 * @returns OrderView component. Displays a specific order with the given id.
 */
const OrderView = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrder(id));
	}, []);

	const orders = useSelector((state) => state.orders);

	if (orders.length !== 1) {
		return null;
	}

	const order = orders[0];

	return (
		<div data-testid={dataTestIds.containerId.inspect}>
			<div className='m-2 font-semibold'>Order {order.id}</div>
			{order.items.map((item) => (
				<div
					key={item.product.id}
					data-testid={`list-item-${item.product.id}-container`}
					className='m-2 border-2'
				>
					<div data-testid={dataTestIds.valueId.name}>Item: {item.product.name}</div>
					<div data-testid={dataTestIds.valueId.quantity}>Quantity {item.quantity}</div>
				</div>
			))}
		</div>
	);
};

export default OrderView;
