/** @format */

import { mount } from '@vue/test-utils';
import AuthUser from '../AuthUser.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Link and button text', () => {
	it('Link text is "Logout", when isLoggedIn is true', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: true,
			},
		});
		// expect(wrapper.vm.msg).toBe('Logout');
		// expect the msg to be inside the link
		expect(wrapper.find('a').text()).toBe('Logout');
	});

	it(' "Go to register" by default in link, "login" by default in button', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});

		expect(wrapper.find('a').text()).toBe('Go to register');
		expect(wrapper.find('button').text()).toMatch(/[Ll]ogin/);
	});

	it('Text is "Go to login" when isLoggedIn is false and Link is clicked once, "register" in button', async () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});
		await wrapper.find('a').trigger('click');

		expect(wrapper.find('a').text()).toBe('Go to login');
		expect(wrapper.find('button').text()).toMatch(/[Rr]egister/);
	});
});

describe('Logout: Emited events', () => {
	it('emits "logout" event when isLoggedIn is true and the logout link is clicked', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: true,
			},
		});
		// click the link

		wrapper.find('a').trigger('click');
		expect(wrapper.emitted('logout')).toBeTruthy();
	});
});

describe('submit', () => {
	it('emits "login" event with username and password when isLogin is true', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});

		const userDetails = {
			username: 'test',
			password: 'password',
		};
		// Fill inputs with ids auth-username and auth-password
		wrapper.find('#auth-username').setValue(userDetails.username);
		wrapper.find('#auth-password').setValue(userDetails.password);
		// Trigger submit event in the form
		wrapper.find('form').trigger('submit');
		expect(wrapper.emitted('login')).toBeTruthy();
		expect(wrapper.emitted('login')[0][0]).toEqual({ ...userDetails });
	});

	it('emits "register" event with username and password when isLogin is false', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});
		// click the link
		wrapper.find('a').trigger('click');
		const userDetails = {
			username: 'test',
			password: 'password',
		};
		// Fill inputs with ids auth-username and auth-password
		wrapper.find('#auth-username').setValue(userDetails.username);
		wrapper.find('#auth-password').setValue(userDetails.password);
		// Trigger submit event in the form
		wrapper.find('form').trigger('submit');
		expect(wrapper.emitted('register')).toBeTruthy();
		expect(wrapper.emitted('register')[0][0]).toEqual({ ...userDetails });
	});
});
