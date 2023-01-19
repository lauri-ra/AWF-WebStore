/** @format */

import { expect, describe, beforeEach, it } from 'vitest';
import { mount } from '@vue/test-utils';

import SelectedPlayer from '../SelectedPlayer.vue';

describe('SelectedPlayer component', () => {
	let wrapper;
	const player = { name: 'player 1', isActive: true };

	beforeEach(() => {
		wrapper = mount(SelectedPlayer, {
			props: { player },
		});
	});

	it('should render selected player data', () => {
		expect(wrapper.find('#player-name').text()).toBe('player 1');
		expect(wrapper.find('#player-status').text()).toBe('active');
	});

	it('should not render if selected player is null', async () => {
		await wrapper.setProps({ player: null });
		const selectedPlayer = wrapper.find('#selected-player');
		expect(selectedPlayer.exists()).toBe(false);
	});
});
