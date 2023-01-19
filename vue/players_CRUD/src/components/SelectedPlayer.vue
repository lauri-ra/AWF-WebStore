<!-- 
  Copy paste your code from the SelectedPlayer.vue file here from the previous exercise.

  In addition to the code from the previous exercise, you need to add the following logic:

  - Display the player's id in an element with the class attribute "player-id".

  - Inside the element with the id "player-status", add a label with the text "active" or "inactive" depending on the status of the player. The label should have an id of "checkbox-label", and inside it there should be a checkbox with an id of "checkbox". By default, the checkbox should be checked if the player is active and unchecked if the player is inactive. Unlike in elm exercises, toggling the checkbox should not automatically update the player in the backend, instead it is done by the update button (check next point). For styling purposes, add an empty span with the class attribute "checkmark" inside the label.

  - Add an update button with the class attribute "btn-update". The button should be disabled if the current active state of the checkmark is not different from the players "isActive" state. Add logic to emit the "put-player" event when the button is clickable and the user clicks it. The event should pass the player object as a parameter.

  - Add a delete button with the class attribute "btn-delete". Add logic to emit the "delete-player" event when the user clicks the button. The event should pass the id of the player as a parameter.

 -->


 <template>
  <div>
    <h3>Selected Player</h3>
    TODO: SelectedPlayer
  </div>
</template>

<script>
export default {
};
</script>




<style scoped>
#selected-player {
  margin: var(--main-margin);
  padding: 20px;
  background-color: var(--color-background-soft);
  border: 2px solid var(--color-background-mute);
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}

.btn-delete {
  background-color: var(--color-button-delete);
  color: var(--color-text-button-delete);
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 1em;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: var(--color-button-delete-hover);
}

label {
  display: block;
  position: relative;
  padding-right: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 35px;
}

input[ type="checkbox"]{
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}


.checkmark {
  position: absolute;
  top: 10;
  left: 100%;
  height: 25px;
  width: 25px;
  background-color: var(--color-checkmark);
}

/* On mouse-over */
label:hover input ~ .checkmark {
  background-color: var(--color-checkmark-hover-bg);
}

/* When the checkbox is checked*/
label input:checked ~ .checkmark {
  background-color: var(--color-standard-basic);
}
/* When the user hovers mouse over a checked checkbox */
label:hover input:checked ~ .checkmark {
  background-color: var(--color-checkmark-hover-bg);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
label input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */

label .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid var(--color-checkmark-checked-sign);
  border-width: 0 2px 4px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.btn-update {
  background-color: var(--color-button-update);
  color: var(--color-text-button-update);
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 1em;
  cursor: pointer;
}

.btn-update:hover {
  background-color: var(--color-button-update-hover);
}

/* btn-update when inactive */
.btn-update:disabled {
  background-color: var(--color-button-update-inactive);
  color: var(--color-text-button-update-inactive);
  cursor: not-allowed;
}
</style>