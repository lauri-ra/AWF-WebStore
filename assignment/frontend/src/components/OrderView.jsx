import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';

const OrderView = () => {
	const { id } = useParams();
	const order = useSelector((state) => state.orders.find((item) => item.id === id));

	return (
		<div data-testid={dataTestIds.containerId.inspect}>
			<div className='m-2 font-semibold'>Order {order.id}</div>
			{order.items.map((item) => (
				<div
					key={item.product.id}
					data-testid={`list-item-${item.id}-container`}
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
