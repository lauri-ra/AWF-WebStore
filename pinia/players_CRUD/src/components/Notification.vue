<!--
Instructions
1. the content is shown conditionally, only if there is a notification to show
2. inside div, there is the second-level header with the text "Alert"
3. show the actual notification inside div, the div has class "notification"
  
-->

<template>
	<div>
		<h2>Alert</h2>
		<div :class="notification">{{ noti }}</div>
	</div>
</template>

<script setup>
import { usePlayerStore } from '../stores/player.store';

const store = usePlayerStore();

const noti = store.alertNotification;
console.log('notification : ', noti);
</script>
