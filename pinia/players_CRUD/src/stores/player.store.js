// Instructions
// define a store with proper actions and getters
// actions:    addPlayer(name), removeIndex(index), addNotification(notification),
// removeIndex(index), removeLast(), removeAllWithDelay(), removeNotification()
//
// Note that addPlayer needs to return the created player,
// removeAllWithDelay() the delay of 3 seconds is appropriate,
// tests give more guidance for finalizing the task.
//
// getters: playerLIst, alertNotification, and player with an id <- this needs a bit more stepping

import { defineStore } from 'pinia';

const createID = () => {
	return Math.floor(Math.random() * 1000) + 1;
};

export const usePlayerStore = defineStore({
	id: 'players',

	state: () => ({
		notification: '',
		players: [
			{ id: 1, name: 'Player 1' },
			{ id: 2, name: 'Player 2' },
			{ id: 3, name: 'Player 3' },
		],
	}),

	actions: {
		addPlayer(name) {
			if (name) {
				this.players.push({ id: createID(), name });
			}
		},
		removeIndex(index) {
			this.players.splice(index, 1);
		},
		removeLast() {
			const last = this.players.length - 1;
			this.players.splice(last, 1);
		},
		removeAllWithDelay() {
			setTimeout(() => {
				this.players.splice(0, this.players.length);
			}, 3000);
		},
		addNotification(newNoti) {
			this.notification = newNoti;
		},
		removeNotification() {
			this.notification = '';
		},
	},

	getters: {
		playerList(state) {
			return state.players;
		},
		alertNotification: (state) => {
			return state.notification;
		},
	},
});
