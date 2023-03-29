
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
 * @returns {object} action that initiates the cart 
 */
export const initCart = () => {
	const cart = localStorage.getItem('cart');
	const payload = cart ? JSON.parse(cart) : [];

	if (!cart) {
		localStorage.setItem('cart', JSON.stringify([]));
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
 * @param {string} product - The product item to add
 * @returns {Function} thunk that adds an item to the cart
 */
export const addCartItem = (product) => {
	return (dispatch) => {
		const productObj = {
			product: product,
			quantity: 1,
		};

		const cart = JSON.parse(localStorage.getItem('cart'));

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
 * @param {string} product - The product item to remove from cart
 * @returns {object} Action that removes an item from the cart
 */
export const removeCartItem = (product) => {
	const cart = JSON.parse(localStorage.getItem('cart'));

	const updatedCart = cart.filter((item) => item.product.id !== product.id);

	localStorage.setItem('cart', JSON.stringify(updatedCart));

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
 * @param {string} productId - The cart item id to increment
 * @returns {Function} thunk that increments an item quantity
 */
export const incrementCartItem = (productId) => {
	const cart = JSON.parse(localStorage.getItem('cart'));

	const updatedCart = cart.map((item) => {
		if (item.product.id === productId) {
			return { ...item, quantity: item.quantity + 1 };
		}
		return item;
	});

	localStorage.setItem('cart', JSON.stringify(updatedCart));

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
 * @param {string} productId - The cart item id to decrement
 * @returns {Function} thunk that decrements the item quantity
 */
export const decrementCartItem = (productId) => {
	const cart = JSON.parse(localStorage.getItem('cart'));

	const updatedCart = cart.map((item) => {
		if (item.product.id === productId) {
			const updatedQuantity = Math.max(item.quantity - 1, 0);
			return { ...item, quantity: updatedQuantity };
		}
		return item;
	});

	localStorage.setItem('cart', JSON.stringify(updatedCart));

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
 * @returns {object} the action for clearing the cart
 */
export const emptyCart = () => {
	localStorage.setItem('cart', []);

	return {
		type: EMPTY_CART,
	};
};
