<template>
  <div>
    <h1>{{ title }}</h1>
    <PiniaLogo />
    <AddPlayer />
    <ListPlayers />
    <Remove />
    <Notification />
  </div>
</template>

<script setup>
import { PiniaLogo, AddPlayer, ListPlayers, Remove, Notification } from '@/components'
const title = 'Pinia';
</script>



