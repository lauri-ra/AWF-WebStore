/** @format */

import { shallowMount } from '@vue/test-utils';
import ListPlayer from '../ListPlayer.vue';
import { describe, test, expect, beforeEach } from 'vitest';

describe('ListPlayer', () => {
	let wrapper;

	const player = { id: 1, name: 'Test Player' };
	beforeEach(() => {
		// mount the component
		wrapper = shallowMount(ListPlayer, {
			props: { player },
		});
	});

	test('emits a "player-clicked" event with the player id when the player is clicked', async () => {
		wrapper.find('a').trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('player-clicked')).toEqual([[1]]);
	});

	test('displays the player name', () => {
		expect(wrapper.text()).toContain('Test Player');
	});
});
