/** @format */
import { expect, it, describe, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import RequestStatus from '../RequestStatus.vue';

describe('RequestStatus component', () => {
	let wrapper;
	const reqStatus = 'Loading...';

	beforeEach(() => {
		wrapper = shallowMount(RequestStatus, {
			props: { reqStatus },
		});
	});

	it('should render request status', () => {
		// Find the element with the id of 'request-status'
		const requestStatus = wrapper.find('#request-status');
		expect(requestStatus.text()).toBe(reqStatus);
	});
});
