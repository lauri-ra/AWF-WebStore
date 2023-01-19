/** @format */

import { mount } from '@vue/test-utils';
import ListPlayers from '../ListPlayers.vue';
import ListPlayer from '../ListPlayer.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ListPlayers', () => {
	let wrapper;

	const players = [
		{ id: 1, name: 'Test Player 1' },
		{ id: 2, name: 'Test Player 2' },
		{ id: 3, name: 'Test Player 3' },
	];

	beforeEach(() => {
		// mount the component
		wrapper = mount(ListPlayers, {
			props: { players, getPlayer: vi.fn() },
			components: { ListPlayer },
		});
	});

	it('renders a ListPlayer for each player in the players prop', () => {
		expect(wrapper.findAllComponents(ListPlayer).length).toBe(players.length);
	});

	it('calls the getPlayer prop when a ListPlayer component is clicked with the id of the clicked player as param.', () => {
		wrapper
			.findAllComponents(ListPlayer)
			.at(0)
			.vm.$emit('player-clicked', { id: 1 });
		expect(wrapper.props().getPlayer).toHaveBeenCalledWith({ id: 1 });
	});
});
