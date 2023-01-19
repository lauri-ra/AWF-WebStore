
<!-- 
  Student instructions to create this component:

  1. Create a form with an id of "submit-player" and a submit event listener that calls the addPlayer function. Hint: Remember to prevent the default behavior of the submit event.

  2. Inside the form: Create an input field with an id of "input-player" where the name of the new player should be added. Optionally Add a placeholder attribute for the input.

  3. Inside the form: Create a button with a class of "btn-add" that will submit the form when clicked.


 -->


 <template>
  <div>
    <h3>
      Add Player
    </h3>
    TODO: AddPlayer
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>

#submit-player {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#input-player {
  flex-grow: 1;
  padding: 0.5em;
  font-size: 1em;
  margin-bottom: 10px;
  border-radius: 0.25em;
  color: var(--color-text-mute);
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-background);
}

#input-player:focus {
  border: 1px solid var(--color-background-mute);
  outline: none;
}


.btn-add {
  padding: 0.5em 1em;
  border: none;
  width: fit-content;
  border-radius: 0.25em;
  background-color: var(--color-button-add);
  color: var(--color-text-button-add);
  cursor: pointer;
}

.btn-add:hover {
  background-color: var(--color-button-add-hover);
}
</style>