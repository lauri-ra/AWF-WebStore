<!-- 
  Student instructions: 
  
  1. Create a li element with a dynamic id attribute set to "player-" concatenated with the player's id. Example: "player-2", where 2 is the id. Inside the li element, add an anchor tag <a>.

  2. In the a tag, bind an event that calls a function or emits the player-clicked event with the player's id as an argument. Add the href attribute with "#". The link text should display the player's name using the provided player object prop. 
 -->

<template>
  <li>
    TODO: ListPlayer
  </li>
</template>

<script>
export default {
};
</script>

<style scoped>
  li {
  background-color: var(--color-background-mute);
  margin: 5px;
  display: flex;
  width: 100%;
}

a {
  border: 2px solid var(--color-background-mute);
  padding: 15px;
  font-size: 1.2rem;
  display: blox;
  text-decoration: none;
  color: var(--color-standard-dark);
  flex: 1 1 0;
  transition: 0.4s;
}

a:hover {
  background-color: var(--color-background-soft);
  border: 2px solid;
}
</style>