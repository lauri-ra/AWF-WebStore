<!-- 
  Student instructions to create this component:

  The functionality of this component is two fold: 
  1. Display a link that toggles between "Go to login", "Go to register", and "Logout" depending on the value of the isLoggedIn prop: By default, it is "Go to register", when the user is not logged in.  
  - User logged in: display "Logout". The link should emit a logout event when clicked.
  - User not logged in and in login: display "Go to register". 
  - User not logged in and in register: display "Go to login".
  
  2. When user is trying to log in or register, the component should display a form with two input fields and a submit button. The form should submit the username and password to the submit function when submitted. The input fields should be required.

  - One input field for username with an id of "auth-username", name of "auth-username" and type of "text".
  - One input field for password with an id of "auth-password", name of "auth-password" and type of "password".
  - A submit button with a class of "btn-auth" with the text "login" or "register" depending on the current state of the component. If the user is trying to login, the button should say "login" and emit a "login" event with the username and password. If the user is trying to register, the button should say "register" and emit a "register" event with the username and password.

  Once user is logged in or registered, the form should be hidden and the link should change to "Logout".

 -->

<template>
  <div>
    TODO: AuthUser
  </div>
</template>
<script>
export default {
};
</script>

<!-- style -->
<style scoped>
/* Create styles for anchor element */
a {
  color: var(--color-accent);
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

/* Create styles for the form */
#auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
}

#auth-form input {
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  margin-bottom: 10px;
  border-radius: 0.25em;
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-background);
}

#auth-form input:focus {
  border-color: var(--color-accent);
  border: 1px solid var(--color-accent);
  outline: none;
}

.btn-auth{
  padding: 0.5em 1em;
  border: none;
  width: fit-content;
  border-radius: 0.25em;
  background-color: var(--color-button-add);
  color: var(--color-text-button-add);
  cursor: pointer;
}

#auth-form button:hover {
  background-color: var(--color-button-add-hover);
}
</style>