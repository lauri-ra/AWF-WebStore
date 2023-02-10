import { Notification } from '@/components'
import { mount, shallowMount } from '@vue/test-utils'

import { usePlayerStore } from "@/stores";


import { createTestingPinia } from '@pinia/testing'
import { describe, test, beforeEach, expect, vitest } from 'vitest'

//Check: https://github.com/vuejs/pinia/tree/v2/packages/testing/src

function factory() {
  const wrapper = mount(Notification, {
    global: {
      plugins: [createTestingPinia({
        createSpy: vitest.fn
      })],
    },
  })
  const players = usePlayerStore()
  return { wrapper, players }
}


describe('Notification.vue', () => {
  let pinia
  let store
  beforeEach(() => {
    pinia = createTestingPinia({
      /**
       * using spy function from vitest when `globals: false` (default)
       * to explicitly defining the `spy` function,
       * set `globals: true` in `vite.config.js`, section `test`
       */
      createSpy: vitest.fn,
      initialState: {
        notification: "",
        players: [
          { id: 1, name: 'Player 1' },
          { id: 2, name: 'Player 2' },
          { id: 3, name: 'Player 3' },
        ],
      },
    })
    store = usePlayerStore()
    store.isEven = true // getters are writable only in tests
    store.isOdd = false // getters are writable only in tests
  })

  test('patching notification', ()=>{
    const { players } = factory()
    expect(players.alertNotification).toBe("")
    expect(players.$patch).toHaveBeenCalledTimes(0)
    players.$patch({ notification: "heippa" })
    expect(players.$patch).toHaveBeenCalledTimes(1)
    expect(players.$patch).toHaveBeenLastCalledWith({ notification: "heippa" })
    expect(players.alertNotification).toBe("heippa")
  })


})