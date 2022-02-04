
import { shallowMount } from '@vue/test-utils';
import AddPassword from '@/components/AddPassword.vue';

describe('AddPassword.vue', () => {
  it('Renders component', () => {
    const wrapper = shallowMount(AddPassword, {})
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
