import { Remove } from '@/components'
import { mount } from '@vue/test-utils'
import { usePlayerStore } from "@/stores";
import { createTestingPinia } from '@pinia/testing'
import { describe, test, beforeEach, expect, vi, vitest } from 'vitest'

//Check: https://github.com/vuejs/pinia/tree/v2/packages/testing/src


describe('Remove.vue', () => {
  let wrapper
  let store
  beforeEach(()=>{
    wrapper = mount(Remove,{
      global:{
        plugins: [createTestingPinia({
          createSpy: vitest.fn
        })]
      }
    })

    store = usePlayerStore()
  })


  test('executes action removeLast', async () => {    
     await wrapper.find("#rm_last").trigger('click');
     expect(store.removeLast).toHaveBeenCalledOnce();
   })


  test('executes action removeAllWithDelay', async () => {
    await wrapper.find("#rm_delay").trigger('click');
    expect(store.removeAllWithDelay).toHaveBeenCalledOnce();
  })


})

