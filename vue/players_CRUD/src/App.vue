<!-- 
  COPY AND PASTE YOUR CODE FROM THE PREVIOUS EXERCISE HERE. Also implement the following:

  1. Create a method for adding a new player. This method should handle the logic for adding a new player to the backend and updating the players list. This method should also reset the form only if the request was successful. This method should be called when the add player form is submitted.

  2. Create a method for deleting a player. This method should handle the logic for deleting a player from the backend and updating the players list. This method should be called when the delete button is clicked in the SelectedPlayer component.

  3. Create a method for updating a player. This method should handle the logic for updating a player in the backend and updating the players list. This method should be called when the update button is clicked in the SelectedPlayer component.
 -->


<template>
  <div>
    <RequestStatus/>
    <AddPlayer/>
    <ListPlayers/>
    <SelectedPlayer/>
  </div>
</template>

<script>
import AddPlayer from './components/AddPlayer.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';
import RequestStatus from './components/RequestStatus.vue';

const REQ_STATUS = {
  loading: 'Loading...',
  success: 'Finished!',
  error: 'An error has occurred!!!'
};

export default {
  components: {
    AddPlayer,
    ListPlayers,
    SelectedPlayer,
    RequestStatus
  },
};
</script>
