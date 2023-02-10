

import { ListPlayers } from '@/components'
import { mount } from '@vue/test-utils'
import { usePlayerStore } from "@/stores";
import { createTestingPinia } from '@pinia/testing'
import { describe, test, beforeEach, expect, vi, vitest } from 'vitest'

//Check: https://github.com/vuejs/pinia/tree/v2/packages/testing/src




describe('ListPlayers.vue', () => {
  let pinia
  let store
  let spy
  let wrapper2
  beforeEach(() => {
    pinia = createTestingPinia({
      /**
       * using spy function from vitest when `globals: false` (default)
       * to explicitly defining the `spy` function,
       * set `globals: true` in `vite.config.js`, section `test`
       */
      createSpy: vi.fn,
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

    wrapper2 = mount(ListPlayers, {
      mounted: vi.fn(), // With this you mock the onMounted
      global: {
        plugins: [pinia]
      }
    })  
  })


  test('executes action removeIndex', async () => {

    let wrapper3 = mount(ListPlayers,{
      global:{
        plugins: [createTestingPinia({
          createSpy: vitest.fn
        })]
      }
    })

    const store = usePlayerStore()
    await wrapper3.find("#rm_btn").trigger("click");
    expect(store.removeIndex).toHaveBeenCalledOnce();

  })

})

