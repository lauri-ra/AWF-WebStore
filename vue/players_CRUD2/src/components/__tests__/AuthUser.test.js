/** @format */

import { mount } from '@vue/test-utils';
import AuthUser from '../AuthUser.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('msg', () => {
	it('returns "Logout" when isLoggedIn is true', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: true,
			},
		});
		expect(wrapper.vm.msg).toBe('Logout');
	});

	it('returns "Go to register" when isLoggedIn is false and isLogin is true', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});
		wrapper.setData({ isLogin: true });
		expect(wrapper.vm.msg).toBe('Go to register');
	});

	it('returns "Go to login" when isLoggedIn is false and isLogin is false', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});
		wrapper.setData({ isLogin: false });
		expect(wrapper.vm.msg).toBe('Go to login');
	});
});

describe('action', () => {
	it('emits "logout" event when isLoggedIn is true', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: true,
			},
		});
		wrapper.vm.action();
		expect(wrapper.emitted('logout')).toBeTruthy();
	});

	it('toggles isLogin when isLoggedIn is false', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});
		wrapper.setData({ isLogin: true });
		wrapper.vm.action();
		expect(wrapper.vm.isLogin).toBe(false);
	});
});

describe('reset', () => {
	it('resets the username and password', () => {
		const wrapper = mount(AuthUser);
		wrapper.setData({ username: 'test', password: 'password' });
		wrapper.vm.reset();
		expect(wrapper.vm.username).toBe('');
		expect(wrapper.vm.password).toBe('');
	});
});

describe('template', () => {
	it('renders the correct text in the link when isLoggedIn is true', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: true,
			},
		});
		expect(wrapper.find('a').text()).toBe('Logout');
	});
	it('renders the correct text in the button when isLoggedIn is false and isLogin is true', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});
		wrapper.setData({ isLogin: true });
		expect(wrapper.find('button').text()).toBe('login');
	});
});

describe('submit', () => {
	it('emits "login" event with username and password when isLogin is true', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});
		wrapper.setData({ username: 'test', password: 'password', isLogin: true });
		wrapper.vm.submit();
		expect(wrapper.emitted('login')).toBeTruthy();
		expect(wrapper.emitted('login')[0][0]).toEqual({
			username: 'test',
			password: 'password',
		});
	});

	it('emits "register" event with username and password when isLogin is false', () => {
		const wrapper = mount(AuthUser, {
			props: {
				isLoggedIn: false,
			},
		});
		wrapper.setData({ username: 'test', password: 'password', isLogin: false });
		wrapper.vm.submit();
		expect(wrapper.emitted('register')).toBeTruthy();
		expect(wrapper.emitted('register')[0][0]).toEqual({
			username: 'test',
			password: 'password',
		});
	});
});
