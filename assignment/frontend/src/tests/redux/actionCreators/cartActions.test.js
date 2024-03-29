/** @format */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
	addCartItem,
	decrementCartItem,
	emptyCart,
	incrementCartItem,
	removeCartItem,
} from '../../../redux/actionCreators/cartActions';
import {
	ADD_CART_ITEM,
	EMPTY_CART,
	NEW_NOTIFICATION,
	REMOVE_CART_ITEM,
	UPDATE_CART_ITEM_AMOUNT,
} from '../../constants/redux.js';
import state from '../../utils/testStoreState';
const { cart } = state;
const product = cart[0].product;
const newCartItem = { product: { ...product }, quantity: 1 };

let store;
beforeEach(() => {
	store = mockStore({});
	localStorage.setItem('cart', JSON.stringify(cart));
});

afterAll(() => {
	localStorage.removeItem('cart');
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing thunk action creators', () => {
	describe('addCartItem:', () => {
		describe('expected actions should be dispatched on successful requests', () => {
			it('Case 1: ADD_CART_ITEM, NEW_NOTIFICATION', async () => {
				const expectedActions = [
					{
						type: ADD_CART_ITEM,
						payload: newCartItem,
					},
					{
						type: NEW_NOTIFICATION,
						payload: { message: 'New cart item added.', isSuccess: true },
					},
				];

				window.localStorage.__proto__.setItem = vi.fn();

				// assertions as usual:
				store.dispatch(addCartItem(product));
<<<<<<< HEAD
				try {
					expect(localStorage.setItem).toHaveBeenCalled();
				} catch (error) {
					throw new Error('FAILURE: Did you remember to add the cart item in local storage?');
				}
=======
				expect(localStorage.setItem).toHaveBeenCalledTimes(1);
>>>>>>> f2dfe04e4828fd832871dde04c94e610f7dae33b
				const actualActions = store.getActions();
				expect(actualActions).toEqual(expectedActions);
			});
		});
	});
	describe('removeCartItem:', () => {
		describe('expected actions should be dispatched on successful requests', () => {
			it('Case 1: REMOVE_CART_ITEM', async () => {
				const expectedActions = [
					{
						type: REMOVE_CART_ITEM,
						payload: product,
					},
				];
				window.localStorage.__proto__.setItem = vi.fn();

				store.dispatch(removeCartItem(product));
<<<<<<< HEAD
				try {
					expect(localStorage.setItem).toHaveBeenCalled();
				} catch (error) {
					throw new Error('FAILURE: Did you remember to remove the cart item from local storage?');
				}
=======
				expect(localStorage.setItem).toHaveBeenCalledTimes(1);
>>>>>>> f2dfe04e4828fd832871dde04c94e610f7dae33b
				const actualActions = store.getActions();
				expect(actualActions).toEqual(expectedActions);
			});
		});
	});
	describe('incrementCartItem:', () => {
		describe('expected actions should be dispatched on successful requests', () => {
			it('Case 1: UPDATE_CART_ITEM_AMOUNT, NEW_NOTIFICATION', async () => {
				const expectedActions = [
					{
						type: UPDATE_CART_ITEM_AMOUNT,
						payload: { productId: product.id, amount: 1 },
					},
					{
						type: NEW_NOTIFICATION,
						payload: { message: 'Cart item amount updated.', isSuccess: true },
					},
				];
				window.localStorage.__proto__.setItem = vi.fn();

				store.dispatch(incrementCartItem(product.id));
<<<<<<< HEAD
				try {
					expect(localStorage.setItem).toHaveBeenCalled();
				} catch (error) {
					throw new Error('FAILURE: Did you remember to update the cart item at local storage?');
				}
=======
				expect(localStorage.setItem).toHaveBeenCalledTimes(1);
>>>>>>> f2dfe04e4828fd832871dde04c94e610f7dae33b
				const actualActions = store.getActions();
				expect(actualActions).toEqual(expectedActions);
			});
		});
	});
	describe('decrementCartItem:', () => {
		describe('expected actions should be dispatched on successful requests', () => {
			it('Case 1: UPDATE_CART_ITEM_AMOUNT, NEW_NOTIFICATION', async () => {
				const expectedActions = [
					{
						type: UPDATE_CART_ITEM_AMOUNT,
						payload: { productId: product.id, amount: -1 },
					},
					{
						type: NEW_NOTIFICATION,
						payload: { message: 'Cart item amount updated.', isSuccess: true },
					},
				];
				window.localStorage.__proto__.setItem = vi.fn();

				store.dispatch(decrementCartItem(product.id));
<<<<<<< HEAD
				try {
					expect(localStorage.setItem).toHaveBeenCalled();
				} catch (error) {
					throw new Error('FAILURE: Did you remember to update the cart item at local storage?');
				}
=======

				expect(localStorage.setItem).toHaveBeenCalledTimes(1);

>>>>>>> f2dfe04e4828fd832871dde04c94e610f7dae33b
				const actualActions = store.getActions();
				expect(actualActions).toEqual(expectedActions);
			});
		});
	});
	describe('emptyCart:', () => {
		describe('expected actions should be dispatched on successful requests', () => {
			it('Case 1: EMPTY_CART', async () => {
				const expectedActions = [
					{
						type: EMPTY_CART,
					},
				];
				window.localStorage.__proto__.removeItem = vi.fn();
				store.dispatch(emptyCart());
				expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
				const actualActions = store.getActions();
				expect(actualActions).toEqual(expectedActions);
			});
		});
	});
});
