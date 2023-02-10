import { createPinia, setActivePinia } from 'pinia'
import { usePlayerStore } from "@/stores";
import { describe, test, expect, beforeEach } from 'vitest';

const Player1 = { id: 1, name: 'Player 1' }
const Player2 = { id: 2, name: 'Player 2' }


const delay = (delay, cb = null) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (typeof cb === 'function') return resolve(cb());
      resolve();
    }, delay)
  );
};

const useSubject = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  return usePlayerStore()
}

let playerStore;

describe('getters', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    playerStore = useSubject()

    playerStore.$state = {
      playerList: [
        Player1,
        Player2,
        { id: 3, name: 'Player 3' },
      ]
    }
  })


  test('returns array of players', () => {
    expect(playerStore.$state.playerList).toEqual(usePlayerStore().playerList)
  })
  test('returns one player by id', () => {
    expect(playerStore.player(1)).toStrictEqual(Player1)
  })
  test('returns added player with the next id', () => {
    playerStore.addPlayer("Mölli")
    expect(playerStore.playerList).toContainEqual({id:4, name:"Mölli"})
  })

})

describe('Player Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    playerStore = useSubject()

    playerStore.$state = {
      playerList: [
        Player1,
        { id: 2, name: 'Player 2' },
        { id: 3, name: 'Player 3' },
      ]
    }

  })
  test('does not accept an empty player', () => {
    expect(() => playerStore.addPlayer("")).toThrowError()
  })

  test('addPlayer', () => {
    expect(playerStore.playerList.length).toBe(3)
    playerStore.addPlayer("Player 4");
    expect(playerStore.playerList.length).toBe(4)
  })

  test('addNotification is initially empty', () => {
    expect(playerStore.notification).toBe("")
  })

  test('notification is successfully added', () => {
    const msg = "Sepalus!"
    playerStore.addNotification(msg)
    expect(playerStore.notification).toBe(msg)
  })
  test('notification is successfully removed', () => {
    const msg = "Hinaaja!"
    playerStore.addNotification(msg)
    playerStore.removeNotification()
    expect(playerStore.notification).toBe("")
  })


  test('adds a player with the next id in seq.', () => {
    playerStore.addPlayer("Mölli")
    expect(playerStore.playerList).toContainEqual({id:4, name:"Mölli"})
    playerStore.removeIndex(2)
    playerStore.addPlayer("Kurri")
    expect(playerStore.playerList).toContainEqual({id:5, name:"Kurri"})
    expect(playerStore.player(5)).toStrictEqual({id:5, name:"Kurri"})
  })

  test('adds a player with a unique id', () => {
    const addedPlayer = playerStore.addPlayer("Mölli")
    expect(addedPlayer).toStrictEqual({id:4, name:"Mölli"})
    playerStore.removeIndex(1)
    const addedPlayer2 = playerStore.addPlayer("Mölli")
    expect(addedPlayer2).toStrictEqual({id:5, name:"Mölli"})
    
  })


  test('gets a player by id', () => {
    expect(playerStore.playerList.length).toBe(3)
    expect(playerStore.player(1)).toStrictEqual(Player1);
  })

  test('removeLast', () => {
    expect(playerStore.playerList.length).toBe(3)
    playerStore.removeLast();
    expect(playerStore.playerList.length).toBe(2)
  })

  test('removeLast to have still players 1 and 2 left', () => {
    expect(playerStore.playerList.length).toBe(3)
    playerStore.removeLast();
    expect(playerStore.player(1)).toStrictEqual(Player1)
    expect(playerStore.player(2)).toStrictEqual(Player2)
  })

  test('removeIndex removes them all - eventually', () => {
    expect(playerStore.playerList.length).toBe(3)
    playerStore.removeIndex(1);
    expect(playerStore.playerList.length).toBe(2)
    playerStore.removeIndex(2);
    expect(playerStore.playerList.length).toBe(2)
    playerStore.removeIndex(0);
    expect(playerStore.playerList.length).toBe(1)
    playerStore.removeIndex(0);
    expect(playerStore.playerList.length).toBe(0)
  })


  test('removeIndex does not do anything with non-existent index', ()=>{
    expect(playerStore.playerList.length).toBe(3)
    playerStore.removeIndex(999);
    expect(playerStore.playerList.length).toBe(3)
  })

  test('removeAllWithDelay with notification', async()=>{
    expect(playerStore.playerList.length).toBe(3)
    playerStore.removeAllWithDelay();
    expect(playerStore.notification.length).toBeGreaterThan(0)
    await delay(4000)
    expect(playerStore.notification).toBe("")
  })

  test('removeAllWithDelay with notification that is shown at least 2s but less than 4s', async()=>{
    expect(playerStore.playerList.length).toBe(3)
    playerStore.removeAllWithDelay();
    await delay(2000)
    expect(playerStore.notification.length).toBeGreaterThan(0)
    await delay(2000)
    expect(playerStore.notification.length).toBe(0)
    
  })


  test('removeAllWithDelay till the list is empty', async()=>{
    expect(playerStore.playerList.length).toBe(3)
    playerStore.removeAllWithDelay();
    expect(playerStore.notification.length).toBeGreaterThan(0)
    await delay(4000)
    expect(playerStore.playerList.length).toBe(0)

  })

})
