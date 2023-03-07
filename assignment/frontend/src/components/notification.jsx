import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { dataTestIds } from '../tests/constants/components';
import { removeNotification } from '../redux/actionCreators/notificationsActions';

const Notification = () => {
	const [message, setMessage] = useState('');
	const [timer, setTimer] = useState(null);

	const dispatch = useDispatch();
	const notification = useSelector((state) => state.notification);

	useEffect(() => {
		setMessage(notification.message);
		clearTimeout(timer);

		setTimer(
			setTimeout(() => {
				dispatch(removeNotification);
				setMessage('');
			}, 5000)
		);
	}, [notification]);

	return message ? (
		<div data-testid='notification-container' className='flex justify-center font-semibold'>
			{notification.isSuccess ? (
				<div
					data-testid={dataTestIds.valueId.description}
					className='flex w-1/4 justify-center rounded-md bg-lime-300 py-3'
				>
					{message}
				</div>
			) : (
				<div
					data-testid={dataTestIds.valueId.description}
					className='flex w-1/4 justify-center rounded-md bg-rose-300'
				>
					{message}
				</div>
			)}
		</div>
	) : (
		<div data-testid='no-notification-container' />
	);
};

export default Notification;
