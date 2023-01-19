/** @format */

import { mount } from '@vue/test-utils';
import SelectedPlayer from '../SelectedPlayer.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SelectedPlayer', () => {
	const player = { id: 1, name: 'Test Player', isActive: true };
	let wrapper;
	beforeEach(async () => {
		wrapper = mount(SelectedPlayer, { props: { player: null } });
		await wrapper.setProps({ player });
	});

	it('displays the selected player information when a player is passed as a prop with correct ui', async () => {
		expect(wrapper.find('.player-id').text()).toBe('1');
		expect(wrapper.find('#player-name').text()).toBe('Test Player');
		expect(wrapper.find('#player-status').text()).toBe('active');
		// expect the checkbox to be checked
		expect(wrapper.find('#checkbox').element.checked).toBe(true);
		// expect the submit button to be disabled
		expect(wrapper.find('.btn-update').element.disabled).toBe(true);

		// Toggle the checkbox
		const checkbox = wrapper.find('#checkbox');
		checkbox.trigger('change');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('#player-status').text()).toBe('inactive');
		// expect the checkbox to be unchecked
		expect(wrapper.find('#checkbox').element.checked).toBe(false);
		// expect the submit button to be enabled
		expect(wrapper.find('.btn-update').element.disabled).toBe(false);
	});

	it('should not render if selected player is null', async () => {
		await wrapper.setProps({ player: null });
		const selectedPlayer = wrapper.find('#selected-player');
		expect(selectedPlayer.exists()).toBe(false);
	});

	it('emits a "delete-player" event with the player id when the delete button is clicked', async () => {
		wrapper.find('.btn-delete').trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('delete-player')).toEqual([[1]]);
	});

	it('emits a "put-player" event with the updated player when the update button is clicked', async () => {
		// Toggle the checkbox
		const checkbox = wrapper.find('#checkbox');
		checkbox.trigger('change');

		const changedPlayer = { ...player, isActive: false };
		await wrapper.vm.$nextTick();

		// Click the update button
		const updateBtn = wrapper.find('.btn-update');
		updateBtn.trigger('click');

		// Show wrapper data in console
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('put-player')).toEqual([[changedPlayer]]);
	});
});
