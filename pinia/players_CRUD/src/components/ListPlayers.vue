<!-- 
  Instructions to create this component:

  1. Create an unorderer list whose id is "playerList"
  2. List items include 
    a. index as the key
    b. the name of the player, 
    c. followed by a button (id=rm_btn) to remove the player with an index


 -->

<template>
	<div>
		<ul id="playerList">
			<li v-for="(player, index) in players" :key="index">
				{{ player.name }}
				<button id="rm_btn" @click="handleRemove(index)">remove</button>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { usePlayerStore } from '../stores/player.store.js';

const store = usePlayerStore();

const players = store.playerList;

const handleRemove = (index) => {
	store.removeIndex(index);
};
</script>
