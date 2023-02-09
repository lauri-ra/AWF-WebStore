
// Instructions
// define a store with proper actions and getters
// actions:    addPlayer(name), removeIndex(index), addNotification(notification),
// removeIndex(index), removeLast(), removeAllWithDelay(), removeNotification()
//
// Note that addPlayer needs to return the created player,
// removeAllWithDelay() the delay of 3 seconds is appropriate,
// tests give more guidance for finalizing the task.
// 
// getters: playerLIst, alertNotification, and player with an id <- this needs a bit more stepping


export const usePlayerStore = defineStore({
  id: 'players',

  state: () => ({
    notification: "",
    players: [
      { id: 1, name: 'Player 1' },
      { id: 2, name: 'Player 2' },
      { id: 3, name: 'Player 3' },
    ],
  }),

  actions:{},

  getters:{}

})