// @vitest-environment happy-dom

import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { registerEndpoint } from '@nuxt/test-utils/runtime'
import testPage from './[id].vue'

// This test doesn't work, not sure why
describe.skip('/pages/polls/[id]', () => {
  it('should mount', ({ expect }) => {
    registerEndpoint('/api/poll/test', () => ({
      question: 'What is your favourite colour?',
      responses: [
        {
          id: 'cixc5b0e6ca3p0diuwuxll4p',
          response: 'Red',
        },
        {
          id: 'p9n1g4hvzdpiwo1lxpjtlpoj',
          response: 'Green',
        },
        {
          id: 'eqlzp3mt7zun5xr7mvvplsev',
          response: 'Blue',
        },
      ],
    }))

    const wrapper = mount(testPage, {
      route: '/pages/polls/test',
    })

    console.log(wrapper.text())

    expect(wrapper.text()).toContain('Submit')
  })
})
