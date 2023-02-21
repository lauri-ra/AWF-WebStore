<!-- 
  Instructions to create this component:

  1. Create a form to add players
  2. The form consists of two elements
     a. input field with id="input_player", modelled as current_player
     b. button with id "add_btn" 
 -->

<template>
	<div>
		<h3>Add player</h3>
		<input id="input_player" v-model="name" />
		<button id="add-btn" placeholder="name-of-the-player" @click="handleSubmit(name)">
			Add player
		</button>
	</div>
</template>

<script setup>
import { usePlayerStore } from '../stores/player.store.js';

const store = usePlayerStore();

const handleSubmit = (name) => {
	store.addPlayer(name);
};
</script>
