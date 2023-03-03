/** @format */

// USERS ACTION CREATORS

import axios from 'axios';

import {
	GET_USER,
	GET_USERS,
	NEW_NOTIFICATION,
	REMOVE_USER,
	UPDATE_USER,
	userMsg,
} from '../../tests/constants/redux.js';

/**
 * @description Asynchronous action creator that gets a single user from the backend (if possible)
 * and sends that through thunk to the reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {String} userId - The users id that is to be fetched.
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUser = (userId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
			const user = await response.data;

			dispatch({
				type: GET_USER,
				payload: user,
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
 * @description Asynchronous action creator that gets all the users from the backend (if possible)
 * and sends that Array through thunk to the reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull message.
 *
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUsers = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get('http://localhost:3001/api/users/');
			const users = await response.data;

			dispatch({
				type: GET_USERS,
				payload: users,
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
 * @description Asynchronous action creator that updates the given user (if possible) and sends
 * the user received from the backend through thunk to reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {object} updatedUser - contains the updated user data
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const updateUser = (updatedUser) => {
	return async (dispatch) => {
		try {
			const response = await axios.put(
				`http://localhost:3001/api/users/${updatedUser.id}`,
				updatedUser
			);
			const user = await response.data;
			dispatch({
				type: UPDATE_USER,
				payload: user,
			});

			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: true, message: userMsg.update },
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
 * @description Removes the user (if possible) from the backend, then dispatches an action to remove
 * it from the redux-store, as well as another action to notify the current user that the deletion
 * was succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {String} - The users id that is to be fetched
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const removeUser = (userId) => {
	return async (dispatch) => {
		try {
			const response = await axios.delete(`http://localhost:3001/api/users/${userId}`);
			const user = await response.data;

			dispatch({
				type: REMOVE_USER,
				payload: user,
			});

			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: true, message: userMsg.delete(user) },
			});
		} catch (error) {
			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: false, message: error.response.data.error },
			});
		}
	};
};
