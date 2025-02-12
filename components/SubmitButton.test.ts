// @vitest-environment happy-dom

import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SubmitButton from './SubmitButton.vue'

describe('SubmitButton', () => {
  it('should mount', async ({ expect }) => {
    const wrapper = mount(SubmitButton, {
      props: {},
    })

    expect(wrapper.text()).toContain('Submit')
  })
})
