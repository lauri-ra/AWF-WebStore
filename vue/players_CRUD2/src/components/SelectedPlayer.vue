<!-- 
  Copy paste your code from the SelectedPlayer.vue file here from the previous exercise
 -->

<template>
  <div>
    <h3>Selected Player</h3>
    TODO: SelectedPlayer
  </div>
</template>

<script>
// import { watch } from 'vue';
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