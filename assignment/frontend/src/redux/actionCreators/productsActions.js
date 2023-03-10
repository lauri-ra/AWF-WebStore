/** @format */

// PRODUCT ACTION CREATORS

import axios from 'axios';

import {
	ADD_PRODUCT,
	DELETE_PRODUCT,
	GET_PRODUCT,
	GET_PRODUCTS,
	NEW_NOTIFICATION,
	productMsg,
	UPDATE_PRODUCT,
} from '../../tests/constants/redux.js';

const instance = axios.create({
	withCredentials: true,
});

/**
 * @description Asynchronous Action creator for getting a single product.
 * Dispatches an action with type GET_PRODUCT through thunk if succesful
 * or NEW_NOTIFICATION-type and error message from db in the payload
 * @param {String} productId - The id of the product to get
 * @return {Function} - Thunk -> action
 */
export const getProduct = (productId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
			const product = await response.data;

			dispatch({
				type: GET_PRODUCT,
				payload: product,
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
 * @description Asynchronous Action creator that dispatches all the products
 * it receives from DB to the frontends redux-stores product-state.
 * Dispatches GET_PRODUCTS with products as payload if succesfull,
 * or NEW_NOTIFICATION-type and error message from db in the payload
 * @return {Function} - Thunk -> action
 */
export const getProducts = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get('http://localhost:3001/api/products/');
			const products = await response.data;

			dispatch({
				type: GET_PRODUCTS,
				payload: products,
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
 * @description Asynchronous Action creator that adds a new product to the DB,
 * then dispatches an ADD_PRODUCT-type action with product as payload to the
 * frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type
 * action to the frontends notification-state with the productMsg.added as
 * a successful message. If the response is not ok, it only dispatches
 * a NEW_NOTIFICATION-type action to the frontends notification state along
 * with the error message from db as an unsuccessfull message. If the error
 * itself is an object, then it should pass whatever is inside the object.
 *  * @param {Object} productToAdd - The product to add
 * @return {Function} - Thunk -> action
 */
export const addProduct = (productToAdd) => {
	return async (dispatch) => {
		try {
			await instance.post('http://localhost:3001/api/products/', productToAdd);

			dispatch({
				type: ADD_PRODUCT,
				payload: productToAdd,
			});

			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: true, message: productMsg.added },
			});
		} catch (error) {
			if (typeof error.response.data.error === 'object') {
				const errMessage = Object.values(error.response.data.error);

				dispatch({
					type: NEW_NOTIFICATION,
					payload: { isSuccess: false, message: errMessage[0] },
				});
			} else {
				dispatch({
					type: NEW_NOTIFICATION,
					payload: { isSuccess: false, message: error.response.data.error },
				});
			}
		}
	};
};

/**
 * @description Asynchronous Action creator that updates an existing product
 * in the DB, then dispatches an UPDATE_PRODUCT-type action to the frontends
 * redux-stores product-state, as well as a NEW_NOTIFICATION-type action to
 * the frontends notification-state with the productMsg.updated as a successful
 * message. If the response is not ok, it only dispatches a NEW_NOTIFICATION-type
 * action to the frontends notification state along with the error message from db
 * as an unsuccessfull message.
 * @param {Object} productToUpdate - The product with updated values
 * @return {Function} - Thunk -> action
 */
export const updateProduct = (productToUpdate) => {
	return async (dispatch) => {
		try {
			await instance.put(
				`http://localhost:3001/api/products/${productToUpdate.id}`,
				productToUpdate
			);

			dispatch({
				type: UPDATE_PRODUCT,
				payload: productToUpdate,
			});

			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: true, message: productMsg.updated },
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
 * @description Asynchronous Action creator that deletes existing product in the DB,
 * then dispatches a DELETE_PRODUCT-type action along with product as payload to
 * the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type
 * action to the frontends notification-state with the productMsg.deleted(product)
 * as a successful message. If the response is not ok, it only dispatches a
 * NEW_NOTIFICATION-type action to the frontends notification state along with the
 * error message from db as an unsuccessfull message.
 * @param {String} productId - The id of the product to delete
 * @return {Function} redux thunk -> action
 */
export const deleteProduct = (productId) => {
	return async (dispatch) => {
		try {
			const response = await instance.delete(`http://localhost:3001/api/products/${productId}`);
			const product = await response.data;

			dispatch({
				type: DELETE_PRODUCT,
				payload: product,
			});

			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: true, message: productMsg.deleted(product) },
			});
		} catch (error) {
			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: false, message: error.response.data.error },
			});
		}
	};
};
