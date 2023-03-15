/** @format */

// CART ACTION CREATORS

import {
	ADD_CART_ITEM,
	cartMsg,
	EMPTY_CART,
	INIT_CART,
	NEW_NOTIFICATION,
	REMOVE_CART_ITEM,
	UPDATE_CART_ITEM_AMOUNT,
} from '../../tests/constants/redux.js';

/**
 * @description Action creator that initiates the cart after page is refreshed.
 * Sends an INIT_CART-type action along with pre-existing cart-items stored locally as
 * payload to the frontends redux-stores product-state.
 * @return {Object} action
 */
export const initCart = () => {
	const cart = localStorage.getItem('cart');
	const payload = cart ? JSON.parse(cart) : [];

	if (!cart) {
		localStorage.setItem('cart', []);
	}

	return {
		type: INIT_CART,
		payload: payload,
	};
};

/**
 * @description Action creator that adds a new cart item to local storage.
 * Dispatches an ADD_CART_ITEM-type action along with product as payload to the
 * frontends redux-stores product-state, as well as a NEW_NOTIFICATION action to the
 * frontends notification-state with a succesful message using cartMsg.add
 * @param {String} product - The product item to add
 * @return {Function} thunk
 */
export const addCartItem = (product) => {
	return (dispatch) => {
		const productObj = {
			product: product,
			quantity: 1,
		};

		// Cart shouldnt be empty here? if initCart is called correctly?
		let cart = localStorage.getItem('cart');

		if (!cart) {
			cart = [];
		}

		cart.push(productObj);
		localStorage.setItem('cart', JSON.stringify(cart));

		dispatch({
			type: ADD_CART_ITEM,
			payload: { product, quantity: 1 },
		});

		dispatch({
			type: NEW_NOTIFICATION,
			payload: { isSuccess: true, message: cartMsg.add },
		});
	};
};

/**
 * @description Action creator that removes a cart item from local storage.
 * Sends a REMOVE_CART_ITEM-type action along with product as payload to the
 * frontends redux-stores product-state.
 * @param {String} product - The product item to remove from cart
 * @return {Object} Action
 */
export const removeCartItem = (product) => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	const updatedCart = cart.map((item) => item !== product);
	localStorage.setItem('cart', updatedCart);

	return {
		type: REMOVE_CART_ITEM,
		payload: product,
	};
};

/**
 * @description Thunk action creator that increments a cart items quantity in local store.
 * Dispatches a UPDATE_CART_ITEM_AMOUNT-type action along with the update details
 * { productId, amount: 1 } as payload to the frontends redux-stores product-state.
 * Also sends NEW_NOTIFICATION-type action with payload of a message informing the items
 * amount is updated (use cartMsg.update).
 * @param {String} productId - The cart item id to increment
 * @return {Function} thunk
 */
export const incrementCartItem = (productId) => {
	const cart = JSON.parse(localStorage.getItem('cart'));

	const updatedCart = cart.map((product) => {
		if (product.id === productId) {
			return { ...product, quantity: product.quantity + 1 };
		}
		return product;
	});

	localStorage.setItem('cart', updatedCart);

	return (dispatch) => {
		dispatch({
			type: UPDATE_CART_ITEM_AMOUNT,
			payload: { productId, amount: 1 },
		});

		dispatch({
			type: NEW_NOTIFICATION,
			payload: { isSuccess: true, message: cartMsg.update },
		});
	};
};

/**
 * @description Thunk action creator that decrements (reduces) a cart items quantity in
 * local store.  Dispatches a UPDATE_CART_ITEM_AMOUNT-type action along with the
 * update details  { productId, amount: -1 } as payload to the frontends
 * redux-stores product-state. Also sends NEW_NOTIFICATION-type action with payload of
 * a message informing the items amount is updated (use cartMsg.update)
 *
 * @param {String} productId - The cart item id to decrement
 * @return {Function} thunk
 */
export const decrementCartItem = (productId) => {
	const cart = JSON.parse(localStorage.getItem('cart'));

	const updatedCart = cart.map((product) => {
		if (product.id === productId) {
			const updatedQuantity = Math.max(product.quantity - 1, 0);
			return { ...product, quantity: updatedQuantity };
		}
		return product;
	});

	localStorage.setItem('cart', updatedCart);

	return (dispatch) => {
		dispatch({
			type: UPDATE_CART_ITEM_AMOUNT,
			payload: { productId, amount: -1 },
		});

		dispatch({
			type: NEW_NOTIFICATION,
			payload: { isSuccess: true, message: cartMsg.update },
		});
	};
};

/**
 * @description An action creator which removes the entire cart-item from local store.
 * Returns an action with EMPTY_CART-type to remove cart all items.
 * @returns {Object} the action
 */
export const emptyCart = () => {
	localStorage.setItem('cart', []);

	return {
		type: EMPTY_CART,
	};
};
