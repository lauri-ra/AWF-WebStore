import { useSelector } from 'react-redux';

const Notification = () => {
	const message = useSelector((state) => state.notification);

	return <div className='flex justify-center'>test notification</div>;
};

export default Notification;
