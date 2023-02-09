

import { AddPlayer } from '@/components'
import { mount, shallowMount } from '@vue/test-utils'
import { usePlayerStore } from "@/stores";
import { createTestingPinia } from '@pinia/testing'
import { describe, test, beforeEach, expect, vi, vitest } from 'vitest'

//Check: https://github.com/vuejs/pinia/tree/v2/packages/testing/src



describe('AddPlayer.vue', () => {
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

    wrapper2 = mount(AddPlayer, {
      mounted: vi.fn(), // With this you mock the onMounted
      global: {
        plugins: [pinia]
      }
    })  
  })

  test('addPlayers button click should call store addPlayers', () => {
    const wrapper = shallowMount(AddPlayer, { global: { plugins: [pinia] } })
    wrapper.findAll('button')[0].trigger('click')
    expect(store.addPlayer).toHaveBeenCalled()
  })

  test('addPlayers is called with right param', () => {
    const wrapper = shallowMount(AddPlayer, { global: { plugins: [pinia] } })
    const name = "Nummelin";
    wrapper.findAll('input')[0].setValue(name)
    wrapper.findAll('button')[0].trigger('click')
    expect(store.addPlayer).toHaveBeenCalledWith(name)
    
  })


  test('executes action addPlayer', async () => {

    let wrapper3 = mount(AddPlayer,{
      global:{
        plugins: [createTestingPinia({
          createSpy: vitest.fn
        })]
      }
    })
    const store = usePlayerStore()
    await wrapper3.find("#add_btn").trigger("click");
    expect(store.addPlayer).toHaveBeenCalledOnce();
  })


})

