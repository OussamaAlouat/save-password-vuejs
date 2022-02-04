
import { createLocalVue, shallowMount } from '@vue/test-utils';
import AddPassword from '@/components/AddPassword.vue';
import Vuex from 'vuex';

const localVue = createLocalVue()
localVue.use(Vuex);

describe('AddPassword.vue', () => {
  let store

  let actions =  {
    setPassword: jest.fn(),
    goBack: jest.fn(),
    save: jest.fn(),
    setAllPasswords: jest.fn()
  };

  let getters = {
    getTypes: () => ['Facebook', 'Gmail', 'Instagram'],
    getPasswords: () => []
  }

  beforeEach(() => {
    store = new Vuex.Store({
      getters,
      actions
    })
  })
  it('Renders component', () => {
    const wrapper = shallowMount(AddPassword, {
      localVue,
      store
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  it('On set a password "setPassword" will be called', () => {
    const wrapper = shallowMount(AddPassword, {
      localVue,
      store
    })

    wrapper.setData({
      password: '12222',
      type: 'Facebook'
    });

    wrapper.vm.addPassword();
    wrapper.vm.$nextTick();
    expect(actions.setPassword).toHaveBeenCalled()
  });

});
