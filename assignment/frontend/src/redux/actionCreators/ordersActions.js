/** @format */

// ORDER ACTION CREATORS

import axios from 'axios';

import {
	NEW_NOTIFICATION,
	GET_ORDERS,
	ADD_ORDER,
	GET_ORDER,
	orderMsg,
} from '../../tests/constants/redux.js';
import { emptyCart } from './cartActions';

const instance = axios.create({
	withCredentials: true,
});

/**
 * @description Action creator for getting a single order. Dispatches action with type GET_ORDER
 * and payload of the fetched order if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull message.
 * @param {String} orderId -  The id of the order to get
 * @return {Function} - Thunk -> action
 */
export const getOrder = (orderId) => {
	return async (dispatch) => {
		try {
			const response = await instance.get(`http://localhost:3001/api/orders/${orderId}`);
			const order = await response.data;

			dispatch({
				type: GET_ORDER,
				payload: order,
			});
		} catch (error) {
			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: false, message: error.response.data.error },
			});
		}
	};
};

/**
 * @description Action creator for getting all orders. Dispatches action with type GET_ORDERS
 * and payload of the fetched orders if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull message.
 * @return {Function} - Thunk -> action
 */
export const getOrders = () => {
	return async (dispatch) => {
		try {
			const response = await instance.get('http://localhost:3001/api/orders');
			const orders = await response.data;

			dispatch({
				type: GET_ORDERS,
				payload: orders,
			});
		} catch (error) {
			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: false, message: error.response.data.error },
			});
		}
	};
};

/**
 * @description Action creator for adding a new order. Dispatches actions:
 * - ADD_ORDER-type with payload that has the new order
 * - EMPTY_CART-type with no payload
 * - NEW_NOTIFICATION with orderMsg.newOrder in the payload
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {Object} newOrder -  The new order to post
 * @return {Function} - Thunk -> action
 */
export const addOrder = (newOrder) => {
	return async (dispatch) => {
		try {
			const response = await instance.post(`http://localhost:3001/api/orders/`, newOrder);
			const order = await response.data;

			dispatch(emptyCart());

			dispatch({
				type: ADD_ORDER,
				payload: order,
			});

			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: true, message: orderMsg.newOrder },
			});
		} catch (error) {
			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: false, message: error.response.data.error },
			});
		}
	};
};
