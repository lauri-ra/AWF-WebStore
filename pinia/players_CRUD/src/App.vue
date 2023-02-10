<template>
  <div>
    <h1>{{ title }}</h1>
    <PiniaLogo />
    <Players />
    <Remove />
    <Status />
  </div>
</template>

<script setup>
import { PiniaLogo, Remove, Status, Players } from '@/components'
const title = 'Pinia';
</script>



