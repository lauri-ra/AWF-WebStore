import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '@/App.vue'
import { ListPlayers, AddPlayer, Remove, Notification, PiniaLogo } from '@/components'


describe('App.vue', () => {

  test("mount App component",  () => {
    expect(App).toBeTruthy();
  })

  test("nested components",  () => {
    expect(App).toBeTruthy();

    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia({createSpy: vi.fn})],
      }
    });
    expect(wrapper.findComponent(AddPlayer)).toBeTruthy()
    expect(wrapper.findComponent(ListPlayers)).toBeTruthy()
    expect(wrapper.findComponent(Remove)).toBeTruthy()
    expect(wrapper.findComponent(Notification)).toBeTruthy()
    expect(wrapper.findComponent(PiniaLogo)).toBeTruthy()
  })

})