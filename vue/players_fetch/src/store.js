import { reactive } from 'vue';
const store = reactive({
	players: [],
	addPlayers(list) {
		this.players = list;
	},
	selectedPlayer: null,
	selectPlayer(player) {
		this.selectedPlayer = player;
	},
});

export default store;
