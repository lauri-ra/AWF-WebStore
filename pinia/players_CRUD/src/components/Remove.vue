<!--

  Instructions
  1. The component consists of two buttons
  a. one with the id "rm_last": clicking it removes the last item of the player list
  b. another with the id "rm_delay: when clicked, it sets the notification about removal,
  and after the delay, all players will be removed


-->
<template>
	<div>
		<button id="rm_last" @click="handleRmLast()">Remove last</button>
		<button id="rm_delay" @click="removeAll()">Remove all with delay</button>
	</div>
</template>

<script setup>
import { usePlayerStore } from '../stores/player.store';

const store = usePlayerStore();

const handleRmLast = () => {
	store.removeLast();
};

const removeAll = () => {
	const notification = 'All players are removed with a delay';
	store.addNotification(notification);
	store.removeAllWithDelay();
};
</script>
