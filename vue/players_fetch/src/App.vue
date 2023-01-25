<!-- 
  1. 
  Inside the root div element, remember to pass in the appropriate props to the child components.

  2. 
  Create two methods for fetching all players and fetching one specific player. 
  The first method should handle the logic for fetching all the 
  players and displaying them in the players list. The second method should 
  handle the logic for fetching a specific player when that player is clicked in the list. 
  It takes the id of the player as an argument. 

  3.
  When the component is created, fetch players data and handle it appropriately (store and display).
  Hint: Use the provided REQ_STATUS object to update the request status when necessary. 
  "loading" for when the request is in progress, 
  "success" for when the request is successful, 
  and "error" for when the request has failed.
 -->

<template>
	<div>
		<RequestStatus :reqStatus="status" />
		<ListPlayers :getPlayer="getPlayer" />
		<SelectedPlayer />
	</div>
</template>

<script>
import ListPlayers from './components/ListPlayers.vue';
import RequestStatus from './components/RequestStatus.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';
import store from './store';
// Import assets

const REQ_STATUS = {
	loading: 'Loading...',
	success: 'Finished!',
	error: 'An error has occurred!!!',
};

// data() =>  return store here? and then pass stuff as props to the components?
export default {
	components: {
		ListPlayers,
		SelectedPlayer,
		RequestStatus,
	},
	data() {
		return {
			status: REQ_STATUS.loading,
		};
	},
	methods: {
		async getAllPlayers() {
			this.status = REQ_STATUS.loading;
			try {
				const res = await fetch('http://localhost:3001/api/players');
				const data = await res.json();
				store.addPlayers(data);
				this.status = REQ_STATUS.success;
			} catch (error) {
				console.log('error fetching all players');
				this.status = REQ_STATUS.error;
			}
		},
		async getPlayer(id) {
			this.status = REQ_STATUS.loading;
			try {
				const res = await fetch(`http://localhost:3001/api/players/${id}`);
				const player = await res.json();
				store.selectPlayer(player);
				this.status = REQ_STATUS.success;
			} catch (error) {
				console.log('error getting a player');
				this.status = REQ_STATUS.error;
			}
		},
	},
	mounted() {
		this.getAllPlayers();
	},
};
</script>
