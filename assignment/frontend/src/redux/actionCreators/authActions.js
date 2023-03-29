import axios from 'axios';

import {
	CLEAR_ORDERS,
	CLEAR_USERS,
	INIT_AUTH,
	NEW_NOTIFICATION,
	REMOVE_AUTH,
	authMsg,
	invalidAuthMsg,
} from '../../tests/constants/redux';
import { createNotification } from './notificationsActions';

const instance = axios.create({
	withCredentials: true,
});

//You can use this  regex for email validation, taken from here: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
const validEmailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//AUTH (THUNK) ACTION CREATORS
/**
 *
 * @description Asynchronous thunk that uses backends /api/check-status path to check whether or not
 * there is the correct browser-cookie and whether or not that browser-cookie is valid. If it's succesful,
 * Dispatches
 * 1) INIT_AUTH with user as payload.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull message.
 * @returns {Function} action that initiates authorization
 */
export const initAuth = () => {
	return async (dispatch) => {
		try {
			const response = await instance.get('http://localhost:3001/api/check-status');
			const status = await response.data;

			dispatch({
				type: INIT_AUTH,
				payload: status.user,
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
 * @description When used, creates an action that awaits for a successful login-response from server,
 * before dispatches the received credentials as payload to the reducers.
 * Light validation of the loginCreds is done before sending the request to the server.
 * The light validation checks:
 * 1. Invalid email: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.email
 * 2. Password < 10: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.password
 *
 * If validation succeeds, dispatches
 * 1) INIT_AUTH with user as payload
 * 2) succesfull notification with authMsg.welcomeBack as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull notification.
 * @param {object} logInCreds - The credentials used to login, contains username and password
 * @returns {Function} action for logging in
 */
export const logIn = (logInCreds) => {
	return async (dispatch) => {
		if (!validEmailRegex.test(logInCreds.email)) {
			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: false, message: invalidAuthMsg.email },
			});
			return;
		}

		if (logInCreds.password.length < 10) {
			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: false, message: invalidAuthMsg.password },
			});
			return;
		}

		try {
			const response = await instance.post('http://localhost:3001/api/login', logInCreds);
			const login = await response.data;

			dispatch({
				type: INIT_AUTH,
				payload: login.user,
			});

			dispatch({
				type: NEW_NOTIFICATION,
				payload: { isSuccess: true, message: authMsg.welcomeBack },
			});
		} catch (error) {
			if (typeof error.response.data.error === 'object') {
				const errMessage = Object.values(error.response.data.error);
				dispatch(createNotification({ isSuccess: false, message: errMessage[0] }));
			} else {
				dispatch(createNotification({ isSuccess: false, message: error.response.data.error }));
			}
		}
	};
};

/**
 * @description Asynchronous thunk that awaits for a successful logout-response from server,
 * before dispatches
 * the actions with types of
 * 1) REMOVE_AUTH,
 * 2) CLEAR_ORDERS and
 * 3) CLEAR_USERS as well as
 * 4) NEW_NOTIFICATION with succesfull message from the backend as payload to the reducers.
 * @returns {Function} action that logs the user out
 */
export const logOut = () => {
	return async (dispatch) => {
		const response = await instance.get('http://localhost:3001/api/logout');
		const logout = await response.data;

		dispatch({
			type: REMOVE_AUTH,
		});

		dispatch({
			type: CLEAR_ORDERS,
		});

		dispatch({
			type: CLEAR_USERS,
		});

		dispatch({
			type: NEW_NOTIFICATION,
			payload: { isSuccess: true, message: logout.message },
		});
	};
};

/**
 * @description Asynchronous thunk that handles registeration events. Handles validation for
 * registerCreds (check Login and Registration validation from assignment instructions).
 * Validation checks:
 * 1. Invalid email: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.email
 * 2. Password < 10: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.password
 * 3. name < 3: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.name
 * 4. password missmatch: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.passwordConfirmation
 *
 * If the validation succeeds, the registerCreds are sent to the server. If the response is ok, Dispatches
 * 1) an INIT_AUTH-type action to reducers with the received user as payload.
 * 2) a successful NEW_NOTIFICATION-type action to reducers with validAuth.welcome(name) as message.
 *
 *  If the server responds with an error, it only dispatches a NEW_NOTIFICATION-type action to the
 * frontends notification state along with the error message from db as an unsuccessfull notification.
 * If the error itself is an object, then it should pass whatever is inside the object.
 * @param {object} registerCreds - The data of the user
 * @returns {Function} action that registers a new user
 */
export const register = (registerCreds) => {
	return async (dispatch) => {
		if (!validEmailRegex.test(registerCreds.email)) {
			return dispatch(createNotification({ isSuccess: false, message: invalidAuthMsg.email }));
		}

		if (registerCreds.password.length < 10) {
			return dispatch(createNotification({ isSuccess: false, message: invalidAuthMsg.password }));
		}

		if (registerCreds.name.length < 3) {
			return dispatch(createNotification({ isSuccess: false, message: invalidAuthMsg.name }));
		}

		if (registerCreds.password !== registerCreds.passwordConfirmation) {
			return dispatch(
				createNotification({ isSuccess: false, message: invalidAuthMsg.passwordConfirmation })
			);
		}

		try {
			const newUser = {
				name: registerCreds.name,
				email: registerCreds.email,
				password: registerCreds.password,
			};
			const response = await axios.post('http://localhost:3001/api/register', newUser);
			const data = await response.data;

			dispatch({
				type: INIT_AUTH,
				payload: data.user,
			});

			dispatch(createNotification({ isSuccess: true, message: authMsg.welcome(data.user.name) }));
		} catch (error) {
			if (typeof error.response.data.error === 'object') {
				const errMessage = Object.values(error.response.data.error);
				dispatch(createNotification({ isSuccess: false, message: errMessage[0] }));
			} else {
				dispatch(createNotification({ isSuccess: false, message: error.response.data.error }));
			}
		}
	};
};
